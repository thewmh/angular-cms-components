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
      ID: 'he2ZJA2nJEe93c-996pH1g',
      Doc: {
         Title: 'test page1',
         Url: 'test-page1',
         Description: '',
         HeaderEmbeds: '',
         Content: `<div class="card__translucent p-5 m-3 m-sm-0">
         <img src="https://marktplacetest.blob.core.windows.net/assets-6c4f4c59-0581-4c23-a0df-5905acf5869a/eca21e9e-452f-4fe1-987f-7e778ebe2f42" alt="fivestars.png" width="100" height="20" />
             <h2 class="text-uppercase short-underline short-underline--double">Get
                 Rewarded </h2>
             <p> We all love points. Get rewarded every time you shop for or sell,
                 classic and trendy, secondhand styles by signing up for our rewards
                 program, where you’ll get access to exclusive discounts, special
                 promotions, store events, and more. <br />Never miss a beat! </p>
             <div class="mt-2">
                 <a class="btn btn-sm btn-outline-primary mb-2"
                     href="[[REWARDS_URL]]">
                     Sign up online
                 </a>
             </div>
             [[DUMMY_TEXT]]
         </div>`,
         FooterEmbeds: '',
         Active: false,
         NavigationTitle: 'test page1',
         MetaTitle: 'test page',
         Author: 'Alexa Snyder',
         DateCreated: '2020-10-16T18:53:34.272Z',
         DateLastUpdated: '2020-10-16T18:53:34.272Z',
         LastUpdatedBy: 'Alexa Snyder'
      },
      SchemaSpecUrl: 'https://marketplace-middleware-test.azurewebsites.net/schema-specs/953ae2db-659d-4754-a53e-967927547b46',
      History: {
         DateCreated: '2020-10-16T18:53:34.1615401+00:00',
         CreatedByUserID: 'asnyder',
         DateUpdated: '2020-10-16T18:53:34.1615422+00:00',
         UpdatedByUserID: 'asnyder'
      }
    },
    dynamicTextReplacements: {
      '[[REWARDS_URL]]': 'testingtestingtesting',
      '[[DUMMY_TEXT]]': 'hello!'
    }
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
        Content: '<h1>Page 1 content</h1>',
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
        Content: '<h2>Page 2 content</h2>',
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
