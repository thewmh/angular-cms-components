import { ModuleWithProviders, NgModule } from '@angular/core';
import { CmsHtmlEditorComponent } from './components/html-editor/html-editor.component';
import { CmsPageEditorComponent } from './components/page-editor/page-editor.component';
import { CmsAssetPickerComponent } from './components/asset-picker/asset-picker.component';
import { CmsCarouselEditorComponent } from './components/carousel-editor/carousel-editor.component';
import { CmsConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CmsSectionPickerComponent } from './components/section-picker/section-picker.component';
import { CmsSectionDateSettingsComponent } from './components/section-date-settings/section-date-settings.component';
import { CmsBuyerModule } from '../buyer/public_api';
import { CmsSharedModule } from '../shared/shared.module';
import { CmsAssetListComponent } from './components/asset-list/asset-list.component';
import { CmsAssetUpdateComponent } from './components/asset-update/asset-update.component';
import { CmsAssetUploadComponent } from './components/asset-upload/asset-upload.component';
import { CmsDragAndDropDirective } from './components/directives/drag-and-drop/drag-and-drop.directive';
import { CmsAssetSearchComponent } from './components/asset-search/asset-search.component';

const declarations = [
  CmsAssetSearchComponent,
  CmsHtmlEditorComponent,
  CmsPageEditorComponent,
  CmsAssetPickerComponent,
  CmsCarouselEditorComponent,
  CmsConfirmModalComponent,
  CmsSectionPickerComponent,
  CmsSectionDateSettingsComponent,
  CmsAssetListComponent,
  CmsAssetUpdateComponent,
  CmsAssetUploadComponent,
  CmsDragAndDropDirective,
]
@NgModule({
  declarations,
  entryComponents: [
    CmsConfirmModalComponent,
    CmsAssetPickerComponent,
    CmsCarouselEditorComponent,
    CmsSectionPickerComponent,
    CmsSectionDateSettingsComponent
  ],
  imports: [
    CmsSharedModule.forRoot(),
    CmsBuyerModule.forRoot(),
  ],
  exports: declarations
})
export class CmsAdminModule {
  /**
   * forRoot lets us define providers as singletons so that there is exactly one instance
   * without this, there could be multiple instances of one service on lazy loaded modules :(
   */
  static forRoot(): ModuleWithProviders<CmsAdminModule> {
    return {
      ngModule: CmsAdminModule,
      providers: []
    }
  }
}
