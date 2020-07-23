import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, CmsPageListComponent } from '../public-api';

export default {
  title: 'Page List',
  component: CmsPageListComponent,
  parameters: {
    component: CmsPageListComponent
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
  component: CmsPageListComponent,
  template: `<cms-page-list></cms-page-list>`,
  props: {},
  
});