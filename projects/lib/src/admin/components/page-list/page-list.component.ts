import { Component, OnInit, Input } from '@angular/core';
import { HeadStartSDK, ListPage, Document, ListArgs } from '@ordercloud/headstart-sdk'
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';
import { NgxSpinnerService } from 'ngx-spinner';
import { v4 as guid } from 'uuid';
import axios from 'axios';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";
import { PageContentDoc } from '../../models/page-content-doc.interface';

const PAGE_SCHEMA_ID = 'cms-page-schema';

@Component({
  selector: 'cms-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  @Input() listOptions: ListArgs<Document> = {};
  @Input() editorOptions: any;
  @Input() renderSiteUrl: string;
  searchTerm: string = '';
  searchTermChanged = new Subject<string>();
  loading: boolean = true;
  list: ListPage<Document>;
  page: Document[];
  confirmModal: NgbModalRef

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.list = await HeadStartSDK.Documents.List(PAGE_SCHEMA_ID, this.listOptions).finally(() => {
      this.loading = false;
      this.spinner.hide();
    })

    // debounce search for 300ms
    this.searchTermChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => {
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

  onSearchFieldChange(searchTerm) {
    this.searchTermChanged.next(searchTerm);
  }

  async savePage(contentDoc: Document) {
    this.spinner.show();
    const me = await OrderCloudSDK.Me.Get();
    const nowDate = new Date().toISOString();

    if (!contentDoc.ID) {
      contentDoc.ID = guid();
      contentDoc.Doc.Author = `${me.FirstName} ${me.LastName}`;
      contentDoc.Doc.DateCreated = nowDate;
      contentDoc.Doc.DateLastUpdated = nowDate;
      await this.createNewDoc(contentDoc).finally(() => this.spinner.hide());
    } else {
      contentDoc.Doc.DateLastUpdated = nowDate;
      HeadStartSDK.Documents.Update(PAGE_SCHEMA_ID, contentDoc.ID, contentDoc).finally(() => this.spinner.hide())
    }

    await this.ngOnInit();
  }

  confirmDeletePage(confirmModalTemplate) {
    this.confirmModal = this.modalService.open(confirmModalTemplate);
  }

  async deletePage(page) {
    this.spinner.show();
    await HeadStartSDK.Documents.Delete(PAGE_SCHEMA_ID, page.ID).finally(() => this.spinner.hide());
    this.confirmModal.close();
    this.page = [];
    await this.ngOnInit();
  }

  createNewDoc(doc: Document): Promise<Document> {
    // There's a bug in marketplace where Update is more of a replace 
    // unlike in OrderCloud it doesn't create if the entity doesn't already exist
    // additionally (another bug) the SDK doesn't have a create method
    // for now we are manually calling create, in the near future we'll just use Update for both create/update
    // https://four51.atlassian.net/browse/SEB-873
    const config = HeadStartSDKInstance.Configuration.Get();
    return axios.post(`${config.baseApiUrl}/schemas/cms-page-schema/documents`, doc, {
      headers: {
        Authorization: `Bearer ${HeadStartSDK.Tokens.GetAccessToken()}`
      }
    })
  }

  goToList() {
    this.page = [];
  }

  onEditorChange(pageDoc: PageContentDoc) {
    this.page[0].Doc = pageDoc;
  }

  selectPage(page) {
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
          DateLastUpdated: '',
          HeaderEmbeds: '',
          Content: '',
          FooterEmbeds: '',
          Active: true,
          NavigationTitle: ''
        }
      }
    }
    this.page = [page];
  }

}
