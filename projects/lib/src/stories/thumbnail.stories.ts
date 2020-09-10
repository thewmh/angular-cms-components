import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThumbnailComponent } from '../admin/components/thumbnail/thumbnail.component';

export default {
  title: 'Admin/Thumbnail',
  component: ThumbnailComponent,
  parameters: {
    component: ThumbnailComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

const createDemo = (props: any) => {
  return () => ({
    component: ThumbnailComponent,
    template: `<div class="p-5">
          <cms-thumbnail [size]="size" [asset]="asset"></cms-thumbnail>
        </div>`,
    props: {
      asset: {
        ID: 'cp2bXAKM80WvYj2KHRiBtg',
        Title: 'Black Guitar Front Facing',
        Active: true,
        Url:
          'https://marktplacetest.blob.core.windows.net/assets-c7902848-9b45-4caf-8be5-373b150301fa/efa2822f-5765-4b9b-bfd7-9f1920cf02e2',
        Type: 'Image',
        Tags: ['Instruments'],
        FileName: '6Y5A6000.jpg',
        Metadata: {
          IsUrlOverridden: false,
          ContentType: 'image/jpeg',
          SizeBytes: 4110998,
          ImageHeight: 3840,
          ImageWidth: 5760,
          ImageVerticalResolution: 96,
          ImageHorizontalResolution: 96,
        },
        History: {
          DateCreated: '2020-08-27T00:25:27.423307+00:00',
          CreatedByUserID: 'rwatt41106',
          DateUpdated: '2020-08-31T18:28:37.2748594+00:00',
          UpdatedByUserID: 'rwatt41106',
        },
      },
      ...props,
    },
  });
};

export const Small = createDemo({ size: 100 });
export const Medium = createDemo({ size: 300 });
export const Large = createDemo({ size: 500 });
