import 'jquery';
// Add back slick once carousel is actually used
// import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';

import { CommonModule } from '@angular/common';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
} from '@angular/core';
import {
  NgbModalModule,
  NgbCollapseModule,
  NgbPaginationModule,
  NgbTabsetModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [NoResultsComponent, SafeHtmlPipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbNavModule,
    NgxSpinnerModule,
    NgbTooltipModule,
    CommonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbNavModule,
    NgxSpinnerModule,
    NgbTooltipModule,
    NoResultsComponent,
    SafeHtmlPipe,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CmsSharedModule {}
