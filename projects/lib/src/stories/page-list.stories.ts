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
  template: `<div style="height:100vh"><cms-page-list
    [requiredSlugs]="requiredSlugs"
    [lockedSlugs]="lockedSlugs"
    [renderSiteUrl]="renderSiteUrl"
    [resourceType]="resourceType"
    [resourceID]="resourceID"
    [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    requiredSlugs: [''],
    lockedSlugs: ['', 'about-us'],
    editorOptions: {},
  },
});

export const MusicGoRoundStyles = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh">
  <ng-template #additionalAssetFilters>
    <fieldset id="customFilters" class="form-group">
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="corporate_assets"
          [checked]="defaultListOptions == {filters: {ID: 'mgrdev-*'}}"
          (change)="defaultListOptions = {filters: {ID: 'mgrdev-*'}}"
        />
        <label class="custom-control-label" for="corporate_assets">
          Corporate Assets
        </label>
      </div>
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          [checked]="defaultListOptions == {filters: {ID: '40009-*'}}"
          (change)="defaultListOptions = {filters: {ID: '40009-*'}}"
          id="store_assets"
        />
        <label class="custom-control-label" for="store_assets">
          Store Assets
        </label>
      </div>
    </fieldset>
  </ng-template>
  <cms-page-list
    [defaultListOptions]="defaultListOptions"
    [additionalAssetFilters]="additionalAssetFilters"
    [requiredSlugs]="requiredSlugs"
    [lockedSlugs]="lockedSlugs"
    [renderSiteUrl]="renderSiteUrl"
    [resourceType]="resourceType"
    [resourceID]="resourceID"
    [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    defaultListOptions: { filters: { ID: 'mgrdev-*|40009-*' } },
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '40015',
    requiredSlugs: ['', 'about', 'in-store-pickpup'],
    lockedSlugs: [
      '',
      'about',
      'community',
      'jobs',
      'lessons',
      'most-wanted',
      'promotions',
      'repairs',
      'faq',
      'in-store-pickup',
    ],

    editorOptions: {
      resize: false,
      height: 'calc(100vh - 114px)',
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
  template: `<div style="height:100vh"><cms-page-list
    [requiredSlugs]="requiredSlugs"
    [lockedSlugs]="lockedSlugs"
    [renderSiteUrl]="renderSiteUrl"
    [resourceType]="resourceType"
    [resourceID]="resourceID"
    [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '400015',
    requiredSlugs: [''],
    lockedSlugs: ['', 'about', 'community'],

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

export const WithTranscludedToolbarAdditions = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh">
      <cms-page-list
        [requiredSlugs]="requiredSlugs"
        [lockedSlugs]="lockedSlugs"
        [renderSiteUrl]="renderSiteUrl"
        [resourceType]="resourceType"
        [resourceID]="resourceID"
        [editorOptions]="editorOptions"
        >
        <button class="btn btn-secondary cms-toolbar-additions">Custom Button</button>
        </cms-page-list>
    </div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    requiredSlugs: [''],
    lockedSlugs: ['', 'about-us'],
    editorOptions: {},
  },
});

export const WithBeforeAssetUpload = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh">
      <cms-page-list
        [lockedSlugs]="lockedSlugs"
        [renderSiteUrl]="renderSiteUrl"
        [resourceType]="resourceType"
        [resourceID]="resourceID"
        [editorOptions]="editorOptions"
        [beforeAssetUpload]="beforeAssetUpload"
        >
        </cms-page-list>
    </div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    lockedSlugs: ['', 'about-us'],
    editorOptions: {},
    beforeAssetUpload: (asset) => {
      console.log('before asset upload was hit');
      return Promise.resolve(asset);
    },
  },
});
