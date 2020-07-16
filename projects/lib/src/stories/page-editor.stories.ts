import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, CmsPageEditorComponent } from '../public-api';

export default {
  title: 'Page Editor',
  component: CmsPageEditorComponent,
  parameters: {
    component: CmsPageEditorComponent
  },
  decorators: [
    moduleMetadata({
      declarations: [
      ],
      imports: [
        CmsAdminModule.forRoot()
      ],
    })
  ]
};

export const FullExample = () => ({
  component: CmsPageEditorComponent,
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
    ocToken: '',
    editorOptions: {
      ordercloud: {
        marketplaceUrl: 'https://marketplace-middleware-test.azurewebsites.net',
        access_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjcmhpc3RpYW5zdXBwbGllcjQxMTA2IiwiY2lkIjoiN2UwZmQ2MmItOWRkOS00OTM5LTllMGItMjZkODgyZmMzNTA4IiwiaW1wIjoiMTE3NyIsInUiOiIxODEyNjMwIiwidXNydHlwZSI6InN1cHBsaWVyIiwicm9sZSI6WyJCdXllclJlYWRlciIsIk1lQWRtaW4iLCJPcmRlckFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlByaWNlU2NoZWR1bGVSZWFkZXIiLCJQcm9kdWN0QWRtaW4iLCJQcm9kdWN0UmVhZGVyIiwiUHJvbW90aW9uQWRtaW4iLCJQcm9tb3Rpb25SZWFkZXIiLCJTaGlwbWVudEFkbWluIiwiU3VwcGxpZXJBZGRyZXNzUmVhZGVyIiwiU3VwcGxpZXJSZWFkZXIiLCJTdXBwbGllclVzZXJSZWFkZXIiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9yZGVyY2xvdWQuaW8iLCJhdWQiOiJodHRwczovL2FwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNTk0OTM0NDcxLCJuYmYiOjE1OTQ5MDU2NzF9.b3q9mzpC-sQuOQ96Rskfv9NEvSmCHbglplJ5X8HJHhY'
      },
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css'
      ]
    }
  },
  
});