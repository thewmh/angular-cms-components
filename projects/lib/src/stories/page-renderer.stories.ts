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
        </script>
        <script src="https://mgrstoragetest.azureedge.net/sellerweb/scripts.dcd3ae993464d9df675a.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,700"></link>
        `,
        Content:
          '<p><a name="top" href="#bottom">Go To Bottom</a></p>\n<p>&nbsp;</p>\n<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1 contenteditable="true">Lorem ipsum dolor</h1>\n<p contenteditable="true">Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" contenteditable="true" href="#">Start Now</a> <a class="btn btn-link" contenteditable="true" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1 contenteditable="true">Lorem ipsum dolor</h1>\n<p contenteditable="true">Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" contenteditable="true" href="#">Start Now</a> <a class="btn btn-link" contenteditable="true" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1 contenteditable="true">Lorem ipsum dolor</h1>\n<p contenteditable="true">Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" contenteditable="true" href="#">Start Now</a> <a class="btn btn-link" contenteditable="true" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1 contenteditable="true">Lorem ipsum dolor</h1>\n<p contenteditable="true">Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" contenteditable="true" href="#">Start Now</a> <a class="btn btn-link" contenteditable="true" href="#">Read More</a></div>\n</div>\n</div>\n<p><a name="bottom" href="#top">Go To Top</a></p>',
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
    dynamicTextReplacements: {
      '[[REWARDS_URL]]': 'testingtestingtesting',
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
