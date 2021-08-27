import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {
  ContentManagementClient,
  JDocument,
  ListArgs,
  Asset,
  AssetUpload,
} from '@ordercloud/cms-sdk';
import {
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResourceType } from '../../../shared/models/resource-type.interface';
import { PAGE_SCHEMA } from '../../constants/page-schema.constants';
import DEFAULT_ASSET_TYPES, {
  ASSET_TYPES,
} from '../../constants/asset-types.constants';
import { PageContentDoc } from '../../models/page-content-doc.interface';

@Component({
  selector: 'cms-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnChanges {
  @Input() resourceType: ResourceType; // required
  @Input() resourceID: string; // required
  @Input() schemaID?: string;
  @Input() parentResourceID?: string = null;
  @Input() editorOptions?: any;
  @Input() renderSiteUrl?: string;
  @Input() lockedSlugs?: string[];
  @Input() requiredSlugs?: string[];
  @Input() tagOptions?: string[];
  @Input() assetTypes: ASSET_TYPES[] = DEFAULT_ASSET_TYPES;
  @Input() additionalAssetFilters?: TemplateRef<any>;
  @Input() defaultListOptions?: ListArgs<Asset> = { filters: { Active: true } };
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Input() beforeDocumentSave?: (page: Partial<PageContentDoc>) => Promise<Partial<PageContentDoc>>;
  @Output() selectedAssetChange = new EventEmitter<Asset | Asset[]>();
  @Output() backClicked = new EventEmitter<MouseEvent>();
  @Output() pageSaved = new EventEmitter<JDocument>();
  @Output() pageCreated = new EventEmitter<JDocument>();
  @Output() pageDeleted = new EventEmitter<string>();
  pageSchemaID: string;
  searchTerm = '';
  searchTermChanged = new Subject<string>();
  loading = true;
  list: JDocument[];
  selected?: JDocument;
  sortBy: string;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  pageIsSaving = false;
  
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pageSchemaID = this.schemaID || PAGE_SCHEMA.ID;
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
    if (
      this.valueChanged(changes, 'resourceID') ||
      this.valueChanged(changes, 'resourceType') ||
      this.valueChanged(changes, 'schemaID')
    ) {
      this.ngOnInit();
    }
  }

  valueChanged(changes: SimpleChanges, propertyName: string): boolean {
    return changes[propertyName] &&
      !changes[propertyName].firstChange &&
      changes[propertyName].previousValue !== changes[propertyName].currentValue;
  }

  changeSortStrategy(sortBy: string): JDocument[] {
    if (this.sortBy && this.sortBy === sortBy) {
      sortBy = '!' + this.sortBy;
    }
    this.sortBy = sortBy;
    const compareFn = (a: JDocument, b: JDocument): 1 | -1 => {
      const sort = sortBy.includes('!')
        ? a.Doc[sortBy.replace('!', '')] > b.Doc[sortBy.replace('!', '')]
        : a.Doc[sortBy] < b.Doc[sortBy];
      return sort ? 1 : -1;
    };
    return this.list.sort((a, b) => compareFn(a, b));
  }

  listDocs(): Promise<void> {
    this.spinner.show();
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-page-list missing required props resourceType and resourceID for '
      );
    }
    const isWinmarkAndCmsPageSchema =
      this.isWinmarkApp && this.pageSchemaID == 'cms-page-schema';
    const ListPages = isWinmarkAndCmsPageSchema
      ? ContentManagementClient['WinmarkPages']['ListWinmarkPages']
      : ContentManagementClient['Documents']['ListDocuments'];
    return ListPages(
      isWinmarkAndCmsPageSchema ? this.marketplaceID : this.pageSchemaID,
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
          ex.response.data.Data.ObjectID === this.pageSchemaID
        ) {
          const schema = {
            ...PAGE_SCHEMA,
            ID: this.pageSchemaID
          } as any;

          return ContentManagementClient.Schemas.Create(schema).then(() =>
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

  isPageSaving(isSaving: boolean) {
    this.pageIsSaving = isSaving;
  }

  goToList(e: MouseEvent): void {
    this.selected = undefined;
    this.ngOnInit();
    this.backClicked.emit(e);
  }

  async selectPage(page): Promise<void> {
    // if a page is in the process of saving, do not allow users to select another page
    // this is to avoid pages from getting overwritten with the other pages content
    if (this.selected && this.pageIsSaving) {
      return;
    }

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
      const selectedPage = await ContentManagementClient.Documents.Get(
        this.pageSchemaID,
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
