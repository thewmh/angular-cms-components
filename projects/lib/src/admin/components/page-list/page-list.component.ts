import { Component, Input, OnInit } from '@angular/core';
import {
  HeadStartSDK,
  JDocument,
  ListArgs,
  ListPage,
} from '@ordercloud/headstart-sdk';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { PAGE_SCHEMA } from '../../constants/page-schema.constants';

@Component({
  selector: 'cms-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  @Input() listOptions: ListArgs<JDocument> = {};
  @Input() editorOptions: any;
  @Input() renderSiteUrl: string;
  searchTerm = '';
  searchTermChanged = new Subject<string>();
  loading = true;
  list: ListPage<JDocument>;
  selected?: JDocument;

  constructor(private spinner: NgxSpinnerService) {}

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.list = await HeadStartSDK.Documents.List(
      PAGE_SCHEMA.ID,
      this.listOptions
    )
      .catch((ex) => {
        if (
          ex &&
          ex.response &&
          ex.response.data &&
          ex.response.data.Data &&
          ex.response.data.Data.ObjectID === PAGE_SCHEMA.ID
        ) {
          return HeadStartSDK.Schemas.Create(PAGE_SCHEMA as any).then(() =>
            HeadStartSDK.Documents.List(PAGE_SCHEMA.ID, this.listOptions)
          );
        }
        return ex;
      })
      .finally(() => {
        this.loading = false;
        this.spinner.hide();
      });

    // debounce search for 300ms
    this.searchTermChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        console.log(`Searched for ${searchTerm}`);
        // uncomment below once Oliver has fixed bug: https://four51.atlassian.net/browse/SEB-872
        // if(!this.listOptions.filters) {
        //   this.listOptions.filters = {};
        // }
        // this.listOptions.filters['Doc.Title'] = searchTerm;
        // this.ngOnInit();
      });
  }

  onSearchFieldChange(searchTerm): void {
    this.searchTermChanged.next(searchTerm);
  }

  onPageSaved(updated: JDocument): void {
    const documentIndex = this.list.Items.findIndex((d) => d.ID === updated.ID);
    this.selected = updated;
    if (documentIndex >= 0) {
      this.list.Items[documentIndex] = updated;
    } else {
      this.list = {
        Items: [...this.list.Items, updated],
        Meta: {
          ...this.list.Meta,
          TotalCount: this.list.Meta.TotalCount++,
          ItemRange: [
            this.list.Meta.ItemRange[0],
            this.list.Meta.ItemRange[1]++,
          ],
        },
      };
    }
  }

  onPageDeleted(deletedId: string): void {
    const filteredList = this.list.Items.filter((d) => d.ID !== deletedId);
    this.selected = undefined;
    this.list = {
      Items: filteredList,
      Meta: {
        ...this.list.Meta,
        TotalCount: filteredList.length,
        ItemRange: [this.list.Meta.ItemRange[0], filteredList.length],
      },
    };
  }

  goToList(e: MouseEvent): void {
    this.selected = undefined;
  }

  selectPage(page): void {
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
  }
}
