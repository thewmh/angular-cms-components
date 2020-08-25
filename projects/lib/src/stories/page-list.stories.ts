import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageListComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import mgrSectionTemplates from './mock/mgr-section-templates.constants';
import piasSectionTemplates from './mock/pias-section-templates.constants';

export default {
  title: 'Admin/Page List',
  component: PageListComponent,
  parameters: {
    component: PageListComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const DefaultStyles = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh"><cms-page-list [lockedSlugs]="lockedSlugs" [renderSiteUrl]="renderSiteUrl" [resourceType]="resourceType" [resourceID]="resourceID" [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    lockedSlugs: ['', 'about-us'],
    editorOptions: {},
  },
});

export const MusicGoRoundStyles = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh"><cms-page-list [lockedSlugs]="lockedSlugs" [renderSiteUrl]="renderSiteUrl" [resourceType]="resourceType" [resourceID]="resourceID" [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    lockedSlugs: ['', 'about-us'],

    editorOptions: {
      ordercloud: {
        get_section_templates_callback: () =>
          Promise.resolve(mgrSectionTemplates),
      },
      content_css: [
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});

export const PlayItAgainSportsStyles = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh"><cms-page-list [lockedSlugs]="lockedSlugs" [renderSiteUrl]="renderSiteUrl" [resourceType]="resourceType" [resourceID]="resourceID" [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    lockedSlugs: ['', 'about-us'],

    editorOptions: {
      ordercloud: {
        get_section_templates_callback: () =>
          Promise.resolve(piasSectionTemplates),
      },
      content_css: [
        'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});
