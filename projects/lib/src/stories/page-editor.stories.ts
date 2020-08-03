import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageEditorComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Admin/Page Editor',
  component: PageEditorComponent,
  parameters: {
    component: PageEditorComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const FullExample = () => ({
  component: PageEditorComponent,
  template: `
  <cms-page-editor
    [renderSiteUrl]="buyerSiteUrl"
    [editorOptions]="editorOptions"
    [document]="pageContentDoc"
  ></cms-page-editor>
`,
  props: {
    pageContentDoc: {
      ID: '',
      Doc: {
        Title: '',
        Url: '',
        Description: '',
        HeaderEmbeds: '',
        Content: ``,
        FooterEmbeds: '',
        Active: false,
        NavigationTitle: '',
      },
    },
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});
