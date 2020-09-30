import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetInputComponent } from '../admin/components/asset-input/asset-input.component';

export default {
  title: 'Admin/Asset Input',
  component: AssetInputComponent,
  parameters: {
    component: AssetInputComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const SingleAsset = () => ({
  component: AssetInputComponent,
  template: `<div class="p-5">
    <ng-template #additionalFilters>
      <div class="btn btn-outline-primary" (click)="defaultListOptions = {filters: {ID: '40009-*'}}">Test</div>
    </ng-template>
    <cms-asset-input [(selectedAsset)]="selectedAsset" [tagOptions]="tagOptions" [defaultListOptions]="defaultListOptions" [additionalFilters]="additionalFilters"></cms-asset-input>
  </div>`,
  props: {
    defaultListOptions: {
      filters: {
        Active: false,
      },
    },
    selectedAsset: undefined,
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
export const MultipleAssets = () => ({
  component: AssetInputComponent,
  template: `<div class="p-5">
  <cms-asset-input [(selectedAsset)]="selectedAsset" [multiple]="true" [tagOptions]="tagOptions"></cms-asset-input>
  </div>`,
  props: {
    selectedAsset: undefined,
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
