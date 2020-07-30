import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageEditorComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export default {
  title: 'Admin/Page Editor',
  component: PageEditorComponent,
  parameters: {
    component: PageEditorComponent
  },
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CmsAdminModule
      ],
    })
  ]
};

export const FullExample = () => ({
  component: PageEditorComponent,
  template: `<div class="jumbotron">
  <div class="container">
    <h1>Page Editor Demonstration</h1>
  </div>
</div>
<div class="container">
  <cms-page-editor
    [renderSiteUrl]="buyerSiteUrl"
    [editorOptions]="editorOptions"
  ></cms-page-editor>
</div>
`,
  props: {
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css'
      ]
    }
  }
});
