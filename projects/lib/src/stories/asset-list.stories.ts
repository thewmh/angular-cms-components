import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetListComponent } from '../admin/components/asset-list/asset-list.component';

export default {
  title: 'Admin/Asset List',
  component: AssetListComponent,
  parameters: {
    component: AssetListComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const AssetList = () => ({
  component: AssetListComponent,
  template: `
    <div style="height:100vh">
      <cms-asset-list
        [multiple]="multiple"
        [selectable]="selectable"
        [items]="items"
        [meta]="meta"
        [downloadableFileTypes]="downloadableFileTypes">
      </cms-asset-list>
    </div>
  `,
  props: {
    selectable: false,
    multiple: true,
    items: [
        {ID: 'mgrdev-0000000', Title: 'diamond', Active: true, Url: 'https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/b88408ae-0b3b-421d-b8fe-2bc37a73d73e', Type: 'Image', Tags: [], FileName: '5137AkUbf+L._SX342_.jpg', Metadata: {IsUrlOverridden: false, ContentType: 'image/jpeg', SizeBytes: 14084, ImageHeight: 342, ImageWidth: 342, ImageVerticalResolution: 96.0, ImageHorizontalResolution: 96.0}, History: {DateCreated: '2020-08-31T14:23:38.7809297+00:00', CreatedByUserID: 'ararick-admin', DateUpdated: '2020-10-05T20:47:13.370196+00:00', UpdatedByUserID: 'Ug7EhLhVa0eWzB9zT8W3ZQ'}},
        {ID: 'mgrdev-0000001', Title: 'diamond', Active: false, Url: 'https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/fd1a0e51-174a-440b-b33d-927621019239', Type: 'Image', Tags: ['Instruments', 'Guitars'], FileName: '6975953_preview.png', Metadata: {IsUrlOverridden: false, ContentType: 'image/png', SizeBytes: 80833, ImageHeight: 953, ImageWidth: 1300, ImageVerticalResolution: 300.0, ImageHorizontalResolution: 300.0}, History: {DateCreated: '2020-08-31T14:24:12.0264271+00:00', CreatedByUserID: 'ararick-admin', DateUpdated: '2020-09-23T14:09:47.7644335+00:00', UpdatedByUserID: 'ararick-admin'} },
        {
            ID: 'guide-c9c87637-fb79-43f5-aab7-5f640ad4570f',
            Title: 'Winmark CMS Reference.pdf',
            Active: true,
            Url: 'https://marktplacetest.blob.core.windows.net/assets-90cc2a02-513a-4fc4-98d9-f93788d97cad/02643b61-51f0-4496-8a2d-d048a1534bbe',
            Type: 'PDF',
            Tags: [],
            FileName: 'Winmark CMS Reference.pdf',
            Metadata: {
                IsUrlOverridden: false,
                ContentType: 'application/pdf',
                SizeBytes: 107037,
                ImageHeight: null,
                ImageWidth: null,
                ImageVerticalResolution: null,
                ImageHorizontalResolution: null
            },
            History: {
                DateCreated: '2020-10-22T19:06:34.5936389+00:00',
                CreatedByUserID: 'Kahn_admin',
                DateUpdated: '2020-10-22T19:24:48.9587185+00:00',
                UpdatedByUserID: 'ararick-admin'
            }
        }
    ],
    meta: {Page: 2, PageSize: 24, TotalCount: 2, TotalPages: 1, ItemRange: [1, 2]},
    downloadableFileTypes: ['application/pdf']
  },
});
