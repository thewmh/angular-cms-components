import { ModuleWithProviders, NgModule } from '@angular/core';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { AssetPickerComponent } from './components/asset-picker/asset-picker.component';
import { CarouselEditorComponent } from './components/carousel-editor/carousel-editor.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SectionPickerComponent } from './components/section-picker/section-picker.component';
import { SectionDateSettingsComponent } from './components/section-date-settings/section-date-settings.component';
import { CmsBuyerModule } from '../buyer/public_api';
import { CmsSharedModule } from '../shared/shared.module';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetUpdateComponent } from './components/asset-update/asset-update.component';
import { AssetUploadComponent } from './components/asset-upload/asset-upload.component';
import { DragAndDropDirective } from './components/directives/drag-and-drop/drag-and-drop.directive';
import { AssetSearchComponent } from './components/asset-search/asset-search.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { SectionTemplateRendererComponent } from './components/section-template-renderer/section-template-renderer.component';

const declarations = [
  AssetSearchComponent,
  HtmlEditorComponent,
  PageEditorComponent,
  AssetPickerComponent,
  CarouselEditorComponent,
  ConfirmModalComponent,
  SectionPickerComponent,
  SectionDateSettingsComponent,
  AssetListComponent,
  AssetUpdateComponent,
  AssetUploadComponent,
  DragAndDropDirective,
  PageListComponent,
  StatusIconComponent,
  SectionTemplateRendererComponent
];
@NgModule({
  declarations,
  entryComponents: [
    ConfirmModalComponent,
    AssetPickerComponent,
    CarouselEditorComponent,
    SectionPickerComponent,
    SectionDateSettingsComponent
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
    };
  }
}
