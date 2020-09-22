import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageRendererComponent } from '../buyer/components/page-renderer/page-renderer.component';
import { CmsBuyerModule } from '../buyer/public_api';

export default {
  title: 'Buyer/Page Renderer',
  component: PageRendererComponent,
  parameters: {
    component: PageRendererComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsBuyerModule],
    }),
  ],
};

export const FullExample = () => ({
  component: PageRendererComponent,
  props: {
    pageDoc: {
      ID: '4ad8bd98-3fe8-4caa-9402-0c8f2769d156',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Locations',
        Url: 'locations',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        DateLastUpdated: '2020-07-30T21:48:54.957Z',
        HeaderEmbeds: `
        <script>
          console.log('logged from header');
        </script>`,
        Content:
          '<div data-oc-widget=\"oc-section\">\n<div class=\"container\">\n<h2 class=\"h1 special-heading text-center border-bottom\" contenteditable=\"true\">Homepage with example images</h2>\n<div class=\"row mt-4\">\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-c7902848-9b45-4caf-8be5-373b150301fa/6f478868-1e97-4259-bd23-84562e2e5a93\" alt=\"Four Guitars Black, White, Blue, Brown\" width=\"352\" height=\"278\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 1</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-c7902848-9b45-4caf-8be5-373b150301fa/e24046ac-139e-4b95-b04d-300bd266e089\" alt=\"Microphone on Table\" width=\"399\" height=\"300\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 2</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-c7902848-9b45-4caf-8be5-373b150301fa/43166970-6a89-4f83-869c-437002fd0b0e\" alt=\"6Y5A6556.jpg\" width=\"483\" height=\"337\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 2</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>',
        FooterEmbeds: `
        <script>
          console.log('logged from footer');
        </script>`,
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
      },
    },
  },
});

export const WithContentChanging = () => ({
  component: PageRendererComponent,
  template: `
  <button class="btn btn-primary" (click)="pageDoc = pageDoc1">Page 1</button>
  <button class="btn btn-secondary" (click)="pageDoc = pageDoc2">Page 2</button>
  <cms-page-renderer *ngIf="pageDoc" [pageDoc]="pageDoc"></cms-page-renderer>
  `,
  props: {
    pageDoc: null,
    pageDoc1: {
      ID: '4ad8bd98-3fe8-4caa-9402-0c8f2769d156',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Page1',
        Url: 'page1',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        DateLastUpdated: '2020-07-30T21:48:54.957Z',
        HeaderEmbeds: `
        <script>
          console.log('logged from header');
        </script>`,
        Content:
          '<h1>Page 1 content</h1>',
        FooterEmbeds: `
          <script>
            console.log('logged from footer');
          </script>`,
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
      },
    },
    pageDoc2: {
      ID: '4ad82348-3fe8-4c234202-0c8f27692342',
      $schema:
        'https://marketplace-middleware-test.azurewebsites.net/schema-specs/5539d88d-2787-476c-9b61-cdadd181f12d',
      Doc: {
        Title: 'Page2',
        Url: 'page2',
        SiteUrl: 'https://www.my-awesome-website.com',
        Description: '',
        MetaImageUrl: '',
        DateLastUpdated: '2020-07-30T21:48:54.957Z',
        HeaderEmbeds: `<script>
        console.log('logged from header');
      </script>`,
        Content:
          '<h2>Page 2 content</h2>',
          FooterEmbeds: `
          <script>
            console.log('logged from footer');
          </script>`,
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
      },
    },
  },
});
