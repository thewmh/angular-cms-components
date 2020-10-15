import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetManagementComponent } from '../admin/components/asset-management/asset-management.component';

export default {
  title: 'Admin/Asset Management',
  component: AssetManagementComponent,
  parameters: {
    component: AssetManagementComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const Management = () => ({
  component: AssetManagementComponent,
  template: `
    <div style="height:100vh">
      <cms-asset-management
        [multiple]="multiple"
        [selectable]="selectable"
        [tagOptions]="tagOptions">
      </cms-asset-management>
    </div>
  `,
  props: {
    selectable: false,
    multiple: true,
    tagOptions: [
      'Blog',
      'Promotion',
      'People',
      'Instruments',
      'Backgrounds',
      'Icons',
      'Graphics',
    ],
  },
});

export const SingleSelect = () => ({
  component: AssetManagementComponent,
  template: `
    <div style="height:100vh">
      <ng-template #additionalFilters>
        <div class="btn btn-outline-primary" (click)="defaultListOptions = {filters: {ID: '40009-*'}}">Test</div>
      </ng-template>
      <cms-asset-management
        [additionalFilters]="additionalFilters"
        [multiple]="multiple"
        [selectable]="selectable"
        [defaultListOptions]="defaultListOptions"
        [tagOptions]="tagOptions">

      </cms-asset-management>
    </div>
  `,
  props: {
    defaultListOptions: { filters: { ID: 'mgrdev-*|40009-*' } },
    selectable: true,
    multiple: false,
    tagOptions: [
      'Blog',
      'Promotion',
      'People',
      'Instruments',
      'Backgrounds',
      'Icons',
      'Graphics',
    ],
  },
});

export const MultipleSelect = () => ({
  component: AssetManagementComponent,
  template: `
    <div style="height:100vh">
      <cms-asset-management
        [defaultListOptions]="defaultListOptions"
        [multiple]="multiple"
        [selectable]="selectable"
        [tagOptions]="tagOptions">
      </cms-asset-management>
    </div>
  `,
  props: {
    defaultListOptions: {
      Active: true,
    },
    selectable: true,
    multiple: true,
    tagOptions: [
      'Blog',
      'Promotion',
      'People',
      'Instruments',
      'Backgrounds',
      'Icons',
      'Graphics',
    ],
  },
});

export const OneAssetType = () => ({
  component: AssetManagementComponent,
  template: `
    <div style="height:100vh">
      <cms-asset-management
        [assetTypes]="assetTypes"
        [multiple]="multiple"
        [selectable]="selectable"
        [tagOptions]="tagOptions">
      </cms-asset-management>
    </div>
  `,
  props: {
    selectable: true,
    multiple: true,
    assetTypes: ['Image'],
    tagOptions: [
      'Blog',
      'Promotion',
      'People',
      'Instruments',
      'Backgrounds',
      'Icons',
      'Graphics',
    ],
  },
});

export const OneAssetTypeNoTags = () => ({
  component: AssetManagementComponent,
  template: `
    <div style="height:100vh">
      <cms-asset-management
        [assetTypes]="assetTypes"
        [multiple]="multiple"
        [selectable]="selectable">
      </cms-asset-management>
    </div>
  `,
  props: {
    selectable: true,
    multiple: true,
    assetTypes: ['Image'],
  },
});
