import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageEditorComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetListComponent } from '../admin/components/asset-list/asset-list.component';

import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';

HeadStartSDKInstance.Configuration.Set({
  baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net',
});
HeadStartSDK.Tokens.SetAccessToken(
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTAwNSIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJCdXllclJlYWRlciIsIk1lQWRtaW4iLCJPcmRlckFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlByaWNlU2NoZWR1bGVSZWFkZXIiLCJQcm9kdWN0QWRtaW4iLCJQcm9kdWN0UmVhZGVyIiwiUHJvbW90aW9uQWRtaW4iLCJQcm9tb3Rpb25SZWFkZXIiLCJTaGlwbWVudEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzUmVhZGVyIiwiU3VwcGxpZXJSZWFkZXIiLCJTdXBwbGllclVzZXJSZWFkZXIiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTk2MDU4OTYxLCJuYmYiOjE1OTYwMzAxNjF9.4YRMolYvyvpKheYfLqmMW8uU4ze01-iT9_cziyHIBao'
);

export default {
  title: 'Asset List',
  component: AssetListComponent,
  parameters: {
    component: AssetListComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CmsAdminModule.forRoot(),
      ],
    }),
  ],
};

export const FullExample = () => ({
  component: AssetListComponent,
  template: `<cms-asset-list></cms-asset-list>`,
  props: {},
});
