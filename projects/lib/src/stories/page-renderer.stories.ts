import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageRendererComponent } from '../buyer/components/page-renderer/page-renderer.component';

export default {
  title: 'Page Renderer',
  component: PageRendererComponent,
  parameters: {
    component: PageRendererComponent
  },
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CmsAdminModule.forRoot()
      ],
    })
  ]
};

export const FullExample = () => ({
  component: PageRendererComponent,
  props: {
      page: `<div data-oc-widget=\"oc-section\" data-oc-start-date=\"2020-08-12\" data-oc-end-date=\"2020-08-13\">\n<div class=\"container\">\n<div class=\"row align-items-center\">\n<div class=\"col-xs-12 col-sm-12 col-md-6\">\n<h4>SHOW: 08/12 to 08/13</h4>\n<p>Cras consequat faucibus purus, nec viverra elit molestie dictum. Nunc at tempor purus.</p>\n<a class=\"btn btn-primary\" href=\"#\">Start Now</a> <a class=\"btn btn-secondary\" href=\"#\">Read More</a></div>\n<div class=\"col-xs-12 col-sm-12 col-md-6\">\n<figure style=\"max-width: 100%;\"><img style=\"max-width: 100%;\" src=\"https://via.placeholder.com/600x250.png\" /></figure>\n</div>\n</div>\n</div>\n</div>\n<div data-oc-widget=\"oc-section\" data-oc-start-date=\"2020-07-27\" data-oc-end-date=\"2020-08-07\">\n<div class=\"jumbotron border-0\">\n<div class=\"container text-center\">\n<h1>Show: 07/27 to 08/07</h1>\n<p>Donec fermentum magna at ex pulvinar, sit amet viverra ex suscipit. Integer fringilla mauris vitae eleifend dictum.</p>\n<a class=\"btn btn-primary\" href=\"#\">Start Now</a> <a class=\"btn btn-link\" href=\"#\">Read More</a></div>\n</div>\n</div>`
  },

});
