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
      <cms-asset-management
        [multiple]="multiple"
        [selectable]="selectable"
        [tagOptions]="tagOptions">
      </cms-asset-management>
    </div>
  `,
  props: {
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
        [multiple]="multiple"
        [selectable]="selectable"
        [tagOptions]="tagOptions">
      </cms-asset-management>
    </div>
  `,
  props: {
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
