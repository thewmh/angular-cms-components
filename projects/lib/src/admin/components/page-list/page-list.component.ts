import { Component, OnInit, Input } from '@angular/core';
import { HeadStartSDK, ListPage, Document, ListArgs } from '@ordercloud/headstart-sdk'
import { NgxSpinnerService } from 'ngx-spinner';
import { PageContentDoc } from '../../models/page-content-doc.interface';
import { v4 as guid } from 'uuid';

const PAGE_SCHEMA_ID = 'cms-page-schema';

@Component({
  selector: 'cms-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  loading: boolean = true;
  @Input() listOptions: ListArgs<Document> = {};
  @Input() editorOptions: any;
  @Input() renderSiteUrl: string;
  list: ListPage<Document>;
  page: Document[];

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.list = await HeadStartSDK.Documents.List(PAGE_SCHEMA_ID, this.listOptions).finally(() => {
      this.loading = false;
      this.spinner.hide();
    })
  }

  async onSavePage(page: PageContentDoc) {
    this.spinner.show();
    await HeadStartSDK.Documents.Update(PAGE_SCHEMA_ID, guid(), page ).finally(() => this.spinner.hide())
    await this.ngOnInit();
  }

  onSelectPage(page) {
    if(!page) {
      // create new page
      page = {
        Title: '',
        Url: '',
        SiteUrl: this.renderSiteUrl,
        Description: '',
        MetaImageUrl: '',
        DateLastUpdated: '',
        HeaderEmbeds: '',
        Content: '',
        FooterEmbeds: '',
        Active: true,
        NavigationTitle: ''
      }
    }
    this.page = [page];
  }

}
