import { NgModule } from '@angular/core';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
// import { AssetPickerComponent } from './components/asset-picker/asset-picker.component';
import { CarouselEditorComponent } from './components/carousel-editor/carousel-editor.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SectionPickerComponent } from './components/section-picker/section-picker.component';
import { SectionDateSettingsComponent } from './components/section-date-settings/section-date-settings.component';
import { CmsBuyerModule } from '../buyer/public_api';
import { CmsSharedModule } from '../shared/shared.module';
// import { AssetListComponent } from './components/asset-list/asset-list.component';
import { DragAndDropDirective } from './components/directives/drag-and-drop/drag-and-drop.directive';
import { PageListComponent } from './components/page-list/page-list.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { SectionTemplateRendererComponent } from './components/section-template-renderer/section-template-renderer.component';
import { PageSummaryComponent } from './components/page-summary/page-summary.component';
import { PagePreviewComponent } from './components/page-preview/page-preview.component';
import { PagePreviewRendererComponent } from './components/page-preview-renderer/page-preview-renderer.component';
import { PagePreviewModalComponent } from './components/page-preview-modal/page-preview-modal.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetFiltersComponent } from './components/asset-filters/asset-filters.component';
import { AssetManagementComponent } from './components/asset-management/asset-management.component';
import { AssetToolbarComponent } from './components/asset-toolbar/asset-toolbar.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { AssetDimensionsPipe } from './pipes/asset-dimensions.pipe';
import { AssetUploadConfirmComponent } from './components/asset-upload-confirm/asset-upload-confirm.component';
import { AssetUploadButtonComponent } from './components/asset-upload-button/asset-upload-button.component';
import { AssetPickerComponent } from './components/asset-picker/asset-picker.component';
import { AssetInputComponent } from './components/asset-input/asset-input.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';

const declarations = [
  HtmlEditorComponent,
  PageEditorComponent,
  AssetPickerComponent,
  CarouselEditorComponent,
  ConfirmModalComponent,
  SectionPickerComponent,
  SectionDateSettingsComponent,
  AssetListComponent,
  AssetManagementComponent,
  AssetFiltersComponent,
  AssetPickerComponent,
  AssetToolbarComponent,
  AssetDetailComponent,
  AssetUploadConfirmComponent,
  AssetUploadButtonComponent,
  DragAndDropDirective,
  PageListComponent,
  StatusIconComponent,
  SectionTemplateRendererComponent,
  PageSummaryComponent,
  PagePreviewComponent,
  PagePreviewRendererComponent,
  PagePreviewModalComponent,
  AssetDimensionsPipe,
  AssetInputComponent,
  ThumbnailComponent,
];
@NgModule({
  declarations,
  entryComponents: [
    ConfirmModalComponent,
    AssetUploadConfirmComponent,
    AssetPickerComponent,
    CarouselEditorComponent,
    SectionPickerComponent,
    SectionDateSettingsComponent,
    PagePreviewModalComponent,
  ],
  imports: [CmsSharedModule, CmsBuyerModule],
  exports: declarations,
})
export class CmsAdminModule {}
