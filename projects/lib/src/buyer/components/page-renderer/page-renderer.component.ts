import { Component, Input, Renderer2, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { WidgetService } from '../../../shared/services/widget.service';
import { JDocument } from '@ordercloud/headstart-sdk';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PageContentDoc } from '../../../admin/models/page-content-doc.interface';

/** @dynamic */
@Component({
  selector: 'cms-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
})
export class PageRendererComponent implements OnChanges {
  @Input() pageDoc: JDocument;
  content: string;

  constructor(
    private widgetService: WidgetService,
    private metaService: Meta,
    private titleService: Title,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageDoc && (changes.pageDoc.previousValue !== changes.pageDoc.currentValue)) {
      const page: PageContentDoc = this.pageDoc.Doc;
      const content = this.widgetService.applyDateRules(page.Content);
      this.content = this.widgetService.stripEditableAttributes(content);
      this.setMetaData(page);
      this.loadScripts(page.HeaderEmbeds, page.FooterEmbeds);
    }
  }

  private setMetaData(page: PageContentDoc): void {
    // addTag results in dupes, so we use updateTag instead

    // normal metadata
    if (page.NoRobotsIndexing) {
      this.metaService.updateTag({ property: 'robots', content: 'noindex' });
    } else {
      this.metaService.removeTag('property = "robots"');
    }
    this.titleService.setTitle(page.Title);
    this.metaService.updateTag({
      property: 'application-name',
      content: page.SiteUrl,
    });
    this.metaService.updateTag({
      property: 'description',
      content: page.Description,
    });

    // open graph meta data
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:title', content: page.Title });
    this.metaService.updateTag({
      property: 'og:description',
      content: page.Description,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: page.MetaImage ? page.MetaImage.Url : undefined,
    });

    // twitter metadata
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary',
    });
    this.metaService.updateTag({
      property: 'twitter:site',
      content: page.SiteUrl,
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: page.Title,
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: page.Description,
    });
    this.metaService.updateTag({
      property: 'twitter:image',
      content: page.MetaImage ? page.MetaImage.Url : undefined,
    });
  }

  private loadScripts(headerEmbeds: string, footerEmbeds: string): void {
    this.createScriptTag(headerEmbeds, 'head');
    this.createScriptTag(footerEmbeds, 'body');
  }

  private createScriptTag(content: string, appendTo: string): void {
    // create script
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.textContent = content;

    // append to target element
    const target = this.document.getElementsByTagName(appendTo)[0];
    this.renderer.appendChild(target, script);
  }
}
