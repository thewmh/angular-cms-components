import {
  Component,
  Input,
  Renderer2,
  Inject,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { WidgetService } from '../../../shared/services/widget.service';
import { JDocument } from '@ordercloud/cms-sdk'
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PageContentDoc } from '../../../admin/models/page-content-doc.interface';
import * as $ from 'jquery';

/** @dynamic */
@Component({
  selector: 'cms-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss'],
})
export class PageRendererComponent implements OnChanges, AfterViewInit {
  @Input() pageDoc: JDocument;

  // optional set of additional meta tags
  // will overwrite existing tags
  @Input() additionalMetaTags?: MetaDefinition[] = [];
  @Input() dynamicTextReplacements?: any = {};

  content: string;

  constructor(
    private widgetService: WidgetService,
    private metaService: Meta,
    private titleService: Title,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {}

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    const anchorLinks = this.document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor) =>
      anchor.addEventListener('click', this.scrollTagIntoView)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.pageDoc &&
      changes.pageDoc.previousValue !== changes.pageDoc.currentValue
    ) {
      const page: PageContentDoc = this.pageDoc.Doc;
      const content = this.widgetService.applyDateRules(page.Content);
      this.content = this.widgetService.stripEditableAttributes(content);
      this.setMetaData(page);
      this.loadScripts(page.HeaderEmbeds, page.FooterEmbeds);
      if (this.dynamicTextReplacements && Object.keys(this.dynamicTextReplacements).length) {
        this.content = this.replaceText(this.content);
      }
    }
  }

  private replaceText(pageContent): string {
    Object.keys(this.dynamicTextReplacements).forEach(key => {
      pageContent = pageContent.replaceAll(key, this.dynamicTextReplacements[key]);
    });
    return pageContent;
  }

  private scrollTagIntoView(e: any): void {
    e.preventDefault();
    const linkTarget = e.target.getAttribute('href').split('#')[1];
    if (!linkTarget) {
      return;
    }
    const linkTargetEl = document.querySelector(`[name="${linkTarget}"]`) !== null ? document.querySelector(`[name="${linkTarget}"]`) : document.querySelector(`[id="${linkTarget}"]`);
    if (!linkTargetEl) {
      return;
    }
    linkTargetEl.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }

  private setMetaData(page: PageContentDoc): void {
    // addTag results in dupes, so we use updateTag instead

    // normal metadata
    if (page.NoRobotsIndexing || !page.Active) {
      this.metaService.updateTag({ property: 'robots', content: 'noindex' });
    } else {
      this.metaService.removeTag('property = "robots"');
    }
    this.titleService.setTitle(page.MetaTitle);
    this.metaService.updateTag({
      property: 'application-name',
      content: page.SiteUrl,
    });
    this.metaService.updateTag({
      name: 'description',
      content: page.Description,
    });

    // open graph meta data
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({
      property: 'og:title',
      content: page.MetaTitle,
    });
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
      content: page.MetaTitle,
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: page.Description,
    });
    this.metaService.updateTag({
      property: 'twitter:image',
      content: page.MetaImage ? page.MetaImage.Url : undefined,
    });

    // additional custom meta tags provided by implemeuploadAssetnt
    if (this.additionalMetaTags.length) {
      this.additionalMetaTags.forEach(tag => this.metaService.updateTag(tag));
    }
  }

  private loadScripts(headerEmbeds: string, footerEmbeds: string): void {
    this.buildContent(headerEmbeds, 'head');
    this.buildContent(footerEmbeds, 'body');
  }

  private buildContent(content: string, appendTo: string): void {
    const component = this;
    const target = component.document.getElementsByTagName(appendTo)[0];

    if (content) {
      let element;
      try {
        element = $(content);
      } catch (e) {
        // catch syntax err
        console.error(e);
        return;
      }

      const scripts = element.filter(function () {
        return this.tagName === 'SCRIPT';
      });
      const nonScripts = element.filter(function () {
        return this.tagName !== 'SCRIPT';
      });
      scripts.each(function () {
        // in order to run javascript after first page loads we need to append it as an html element

        // create script
        const script = component.renderer.createElement('script');
        script.type = 'text/javascript';
        
        if ((this as any).id) {
          script.id = (this as any).id
        }
        if ((this as any).src) {
          script.src = (this as any).src;
        } else {
          script.textContent = this.innerText;
        }

        // append to target element
        component.renderer.appendChild(target, script);
      });

      nonScripts.each(function () {
        if (appendTo === 'body' && this.tagName) {
          console.error(
            `ERROR: Footer embeds did not execute because <${this.tagName.toLocaleLowerCase()}> is not supported in the footer. Please review what is supported in the footer embeds in the CMS to prevent this error.`
          );
          return;
        }

        // non scripts like html/css can just be added to dom
        // unlike javascript they will still be applied even after first page load
        if (this.outerHTML) {
          target.innerHTML += this.outerHTML;
        }
      });
    }
  }
}
