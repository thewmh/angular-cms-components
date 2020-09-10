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

export const FullExample = () => ({
  component: AssetInputComponent,
  template: `<div class="p-5">
    <cms-asset-input></cms-asset-input>
  </div>`,
  props: {},
});
