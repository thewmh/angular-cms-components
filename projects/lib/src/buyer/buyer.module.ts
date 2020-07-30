import { NgModule, ModuleWithProviders } from '@angular/core';
import { CmsSharedModule } from '../shared/shared.module';
import { PageRendererComponent } from './components/page-renderer/page-renderer.component';

const declarations = [PageRendererComponent];

@NgModule({
  declarations,
  imports: [
    CmsSharedModule
  ],
  exports: declarations,
})
export class CmsBuyerModule {}
