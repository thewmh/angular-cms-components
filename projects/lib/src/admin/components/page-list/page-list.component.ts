import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HeadStartSDK, JDocument, ListArgs, Asset, AssetUpload } from '@ordercloud/headstart-sdk';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { ResourceType } from '../../../shared/models/resource-type.interface';
import { PAGE_SCHEMA } from '../../constants/page-schema.constants';
import { ASSET_TYPES } from '../../constants/asset-types.constants';

@Component({
  selector: 'cms-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnChanges {
  @Input() resourceType: ResourceType; // required
  @Input() resourceID: string; // required
  @Input() parentResourceID?: string = null;
  @Input() editorOptions?: any;
  @Input() renderSiteUrl?: string;
  @Input() lockedSlugs?: string[];
  @Input() tagOptions?: string[];
  @Input() assetTypes?: ASSET_TYPES[];
  @Input() defaultListOptions?: ListArgs<Asset> = { filters: { Active: true } };
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Output() selectedAssetChange = new EventEmitter<Asset | Asset[]>();
  @Output() backClicked = new EventEmitter<MouseEvent>();
  @Output() pageSaved = new EventEmitter<JDocument>();
  @Output() pageCreated = new EventEmitter<JDocument>();
  @Output() pageDeleted = new EventEmitter<string>();
  searchTerm = '';
  searchTermChanged = new Subject<string>();
  loading = true;
  list: JDocument[];
  selected?: JDocument;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-page-list is missing required props resourceType or resourceID'
      );
    }
    this.listDocs();

    // debounce search for 300ms
    this.searchTermChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        // uncomment below once Oliver has fixed bug: https://four51.atlassian.net/browse/SEB-872
        // if(!this.listOptions.filters) {
        //   this.listOptions.filters = {};
        // }
        // this.listOptions.filters['Doc.Title'] = searchTerm;
        // this.ngOnInit();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const resourceIDChanged =
      changes.resourceID &&
      !changes.resourceID.firstChange &&
      changes.resourceID.previousValue !== changes.resourceID.currentValue;
    const resourceTypeChanged =
      changes.resourceType &&
      !changes.resourceType.firstChange &&
      changes.resourceType.previousValue !== changes.resourceType.currentValue;
    if (resourceIDChanged || resourceTypeChanged) {
      this.ngOnInit();
    }
  }

  listDocs(): Promise<void> {
    this.spinner.show();
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-page-list missing required props resourceType and resourceID for '
      );
    }
    return HeadStartSDK.Documents.ListDocuments(
      PAGE_SCHEMA.ID,
      this.resourceType,
      this.resourceID
    )
      .then((response) => (this.list = response.Items))
      .catch((ex) => {
        if (
          ex &&
          ex.response &&
          ex.response.data &&
          ex.response.data.Data &&
          ex.response.data.Data.ObjectID === PAGE_SCHEMA.ID
        ) {
          return HeadStartSDK.Schemas.Create(PAGE_SCHEMA as any).then(() =>
            this.listDocs()
          );
        }
        return ex;
      })
      .finally(() => {
        this.loading = false;
        this.spinner.hide();
      });
  }

  get usedSlugs(): string[] {
    return this.list && this.list.length
      ? this.list
          .map((i) => i.Doc.Url)
          .filter((s) => this.selected && this.selected.Doc.Url !== s)
      : [];
  }

  onSearchFieldChange(searchTerm): void {
    this.searchTermChanged.next(searchTerm);
  }

  onPageSaved(updated: JDocument): void {
    const documentIndex = this.list.findIndex((d) => d.ID === updated.ID);
    this.selected = updated;
    if (documentIndex >= 0) {
      this.list[documentIndex] = updated;
      this.pageSaved.emit(updated);
    } else {
      this.list = [...this.list, updated];
      this.pageCreated.emit(updated);
    }
  }

  onPageDeleted(deletedId: string): void {
    this.selected = undefined;
    this.list = this.list.filter((d) => d.ID !== deletedId);
    this.pageDeleted.emit(deletedId);
  }

  goToList(e: MouseEvent): void {
    this.selected = undefined;
    this.ngOnInit();
    this.backClicked.emit(e);
  }

  async selectPage(page): Promise<void> {
    if (!page) {
      // create new page
      page = {
        ID: null,
        Doc: {
          Title: '',
          Url: '',
          SiteUrl: this.renderSiteUrl,
          Description: '',
          MetaImageUrl: '',
          DateCreated: '',
          Author: '',
          DateLastUpdated: '',
          LastUpdatedBy: '',
          HeaderEmbeds: '',
          Content: '',
          FooterEmbeds: '',
          Active: false,
          NavigationTitle: '',
        },
      };
    }
    this.selected = page;

    /**
     * When selected page is previously existing, check the current value of
     * selected.Doc.DateLastUpdated to determine if the selected item in the
     * list needs to be refreshed. This will also update the selected page so
     * that CmsPageEditor receives the most recent version of the page.
     */

    if (this.selected.ID) {
      const selectedIndex = this.list.findIndex(
        (d) => d.ID === this.selected.ID
      );
      const selectedPage = await HeadStartSDK.Documents.Get(
        PAGE_SCHEMA.ID,
        this.selected.ID
      );
      if (
        this.selected.Doc.DateLastUpdated !== selectedPage.Doc.DateLastUpdated
      ) {
        this.list[selectedIndex] = selectedPage;
        this.selected = selectedPage;
      }
    }
  }
}
