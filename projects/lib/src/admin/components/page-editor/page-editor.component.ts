import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { kebab } from 'case';
import { PageContentDoc } from '../../models/page-content-doc.interface';

const EMPTY_PAGE_CONTENT_DOC: Partial<PageContentDoc> = {
  Title: '',
  Url: '',
  Description: '',
  HeaderEmbeds: '',
  Content: ``,
  FooterEmbeds: '',
  Active: false,
  NavigationTitle: '',
};

@Component({
  selector: 'cms-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit {
  @Input() renderSiteUrl: string;
  @Input() editorOptions: any;
  @Input() pageContentDoc?: PageContentDoc;
  @Input() htmlEditorOnly?: boolean;
  @Output() savePage = new EventEmitter<PageContentDoc>();

  page: Partial<PageContentDoc>;
  automaticUrl: boolean;
  pageNavigation: boolean;

  constructor() {}

  ngOnInit(): void {
    if (this.pageContentDoc) {
      this.page = this.pageContentDoc;
      this.automaticUrl =
        this.pageContentDoc.Url === kebab(this.pageContentDoc.Title);
      this.pageNavigation = Boolean(this.pageContentDoc.NavigationTitle);
    } else {
      this.page = EMPTY_PAGE_CONTENT_DOC;
      this.automaticUrl = true;
      this.pageNavigation = false;
    }
  }

  onPageContentChange(html: string) {
    this.page = { ...this.page, Content: html };
  }

  onPageTitleKeyUp(value: string) {
    if (this.automaticUrl) {
      this.page.Url = kebab(value);
    }
  }

  onAutomaticUrlChange() {
    if (this.automaticUrl && this.page.Title) {
      this.page.Url = kebab(this.page.Title);
    }
  }

  onPageNavigationChange() {
    if (this.pageNavigation && !this.page.NavigationTitle) {
      this.page.NavigationTitle = this.page.Title;
    }
  }

  onPageStatusChange() {
    this.page.Active = !this.page.Active;
  }

  onSubmit() {
    // TODO: validate required fields
    this.savePage.emit(this.page as PageContentDoc);
  }
}
