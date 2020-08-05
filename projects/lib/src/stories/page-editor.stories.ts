import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageEditorComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Admin/Page Editor',
  component: PageEditorComponent,
  parameters: {
    component: PageEditorComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const NewPageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
      ID: '',
      Doc: {
        Title: '',
        Url: '',
        Description: '',
        HeaderEmbeds: '',
        Content: ``,
        FooterEmbeds: '',
        Active: false,
        NavigationTitle: '',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const EditPageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
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
        HeaderEmbeds: 'console.log(\'logged from header\');',
        Content:
          '<h1>&nbsp;</h1>\n<h1><span style="color: #f1c40f;">LOCATIONS</span></h1>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-08-12" data-oc-end-date="2020-08-13">\n<div class="container">\n<div class="row align-items-center">\n<div class="col-xs-12 col-sm-12 col-md-6">\n<h4>Show row on: 08/12 to 08/13</h4>\n<p>Cras consequat faucibus purus, nec viverra elit molestie dictum. Nunc at tempor purus.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-secondary" href="#">Read More</a></div>\n<div class="col-xs-12 col-sm-12 col-md-6">\n<figure style="max-width: 100%;"><img style="max-width: 100%;" src="https://via.placeholder.com/600x250.png" /></figure>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-07-27" data-oc-end-date="2020-08-07">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Show on: 07/27 to 08/07&nbsp;</h1>\n<p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>',
        FooterEmbeds: 'console.log(\'logged from footer\');',
        Active: true,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const DeletePageExample = () => ({
  component: PageEditorComponent,
  props: {
    document: {
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
        HeaderEmbeds: 'console.log(\'logged from header\');',
        Content:
          '<h1>&nbsp;</h1>\n<h1><span style="color: #f1c40f;">LOCATIONS</span></h1>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-08-12" data-oc-end-date="2020-08-13">\n<div class="container">\n<div class="row align-items-center">\n<div class="col-xs-12 col-sm-12 col-md-6">\n<h4>Show row on: 08/12 to 08/13</h4>\n<p>Cras consequat faucibus purus, nec viverra elit molestie dictum. Nunc at tempor purus.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-secondary" href="#">Read More</a></div>\n<div class="col-xs-12 col-sm-12 col-md-6">\n<figure style="max-width: 100%;"><img style="max-width: 100%;" src="https://via.placeholder.com/600x250.png" /></figure>\n</div>\n</div>\n</div>\n</div>\n<p>&nbsp;</p>\n<div data-oc-widget="oc-section" data-oc-start-date="2020-07-27" data-oc-end-date="2020-08-07">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Show on: 07/27 to 08/07&nbsp;</h1>\n<p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>',
        FooterEmbeds: 'console.log(\'logged from footer\');',
        Active: false,
        NavigationTitle: 'Locations',
        Author: 'Crhistian Ramirez',
        DateCreated: '2020-07-29T02:28:01.114Z',
      },
    },
    resourceType: 'Suppliers',
    resourceID: '41106',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});
