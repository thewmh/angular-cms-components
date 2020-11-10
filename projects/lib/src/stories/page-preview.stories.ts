import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PagePreviewRendererComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagePreviewComponent } from '../admin/public_api';

export default {
  title: 'Admin/Page Preview',
  component: PagePreviewComponent,
  parameters: {
    component: PagePreviewComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const DefaultExample = () => ({
  component: PagePreviewComponent,
  props: {
    html: '<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Many Sections</h1>\n<p>This page is made up of many sections</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="container text-center">\n<h2>This is another section!</h2>\n<div class="row justify-content-center">\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Quisque</h4>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ante purus. Integer vitae dignissim lectus, at pharetra.</p>\n<a class="btn btn-primary" href="#">Watch Now</a></div>\n</div>\n</div>\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Vivamus</h4>\n<p>Aliquam massa tellus, efficitur id vehicula vitae, sagittis nec orci. Etiam in sapien eget nibh consectetur semper vitae.</p>\n<a class="btn btn-primary" href="#">Read Now</a></div>\n</div>\n</div>\n</div>\n</div>\n</div>',
    remoteCss: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css'
  },
});


export const AlternateInitialDevice = () => ({
  component: PagePreviewComponent,
  props: {
    initialPreview: 'tablet',
    html: '<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Many Sections</h1>\n<p>This page is made up of many sections</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="container text-center">\n<h2>This is another section!</h2>\n<div class="row justify-content-center">\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Quisque</h4>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ante purus. Integer vitae dignissim lectus, at pharetra.</p>\n<a class="btn btn-primary" href="#">Watch Now</a></div>\n</div>\n</div>\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Vivamus</h4>\n<p>Aliquam massa tellus, efficitur id vehicula vitae, sagittis nec orci. Etiam in sapien eget nibh consectetur semper vitae.</p>\n<a class="btn btn-primary" href="#">Read Now</a></div>\n</div>\n</div>\n</div>\n</div>\n</div>',
    remoteCss: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css'
  },
});

export const AlternateDimensionsForDevices = () => ({
  component: PagePreviewComponent,
  props: {
    deviceDimensions: {
      phone: {
        height: 1080,
        width: 1920
      },
      tablet: {
        height: 800,
        width: 800
      },
      desktop: {
        height: 667,
        width: 375,
      }
    },
    html: '<div data-oc-widget="oc-section">\n<div class="jumbotron border-0">\n<div class="container text-center">\n<h1>Many Sections</h1>\n<p>This page is made up of many sections</p>\n<a class="btn btn-primary" href="#">Start Now</a> <a class="btn btn-link" href="#">Read More</a></div>\n</div>\n</div>\n<div data-oc-widget="oc-section">\n<div class="container text-center">\n<h2>This is another section!</h2>\n<div class="row justify-content-center">\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Quisque</h4>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ante purus. Integer vitae dignissim lectus, at pharetra.</p>\n<a class="btn btn-primary" href="#">Watch Now</a></div>\n</div>\n</div>\n<div class="col-xs-12 col-sm-6 col-md-5">\n<div class="card">\n<div class="card-body">\n<h4>Vivamus</h4>\n<p>Aliquam massa tellus, efficitur id vehicula vitae, sagittis nec orci. Etiam in sapien eget nibh consectetur semper vitae.</p>\n<a class="btn btn-primary" href="#">Read Now</a></div>\n</div>\n</div>\n</div>\n</div>\n</div>',
    remoteCss: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css'
  },
});

export const WithImages = () => ({
  component: PagePreviewComponent,
  props: {
    html: '<div data-oc-widget=\"oc-section\">\n<div class=\"container\">\n<h2 class=\"h1 special-heading text-center border-bottom\" contenteditable=\"true\">3 COLUMN WITH HEADER</h2>\n<div class=\"row mt-4\">\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/b6cade2d-e09f-4c6d-a48a-c0d5ba20debc\" alt=\"senior-woman-electric-bass-guitar-smiling-camera-full-length-portrait-senior-woman-electric-bass-153660023.jpg\" width=\"600\" height=\"900\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 1</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/7ed01eeb-b574-4c8c-a092-7fb494c2e5a2\" alt=\"senior-woman-electric-bass-guitar-smiling-camera-full-length-portrait-senior-woman-electric-bass-153660023.jpg\" width=\"600\" height=\"900\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 2</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n<div class=\"col-md-4\">\n<div class=\"card border-0 bg-transparent\">\n<div class=\"card-img-top\" contenteditable=\"true\"><img class=\"img-fluid\" src=\"https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/b6cade2d-e09f-4c6d-a48a-c0d5ba20debc\" alt=\"senior-woman-electric-bass-guitar-smiling-camera-full-length-portrait-senior-woman-electric-bass-153660023.jpg\" width=\"600\" height=\"900\" /></div>\n<div class=\"card-body\">\n<h3 class=\"h5 card-title font-weight-bold\" contenteditable=\"true\">Column 2</h3>\n<p class=\"card-text\" contenteditable=\"true\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>',
    remoteCss: 'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css'
  },
});


