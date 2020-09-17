import {
  Component,
  OnInit,
  Input,
  NgZone,
  ViewEncapsulation,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';
import { CarouselEditorComponent } from '../carousel-editor/carousel-editor.component';
import { v4 as guid } from 'uuid';
import { SectionPickerComponent } from '../section-picker/section-picker.component';
import { SectionDateSettingsComponent } from '../section-date-settings/section-date-settings.component';
import { PagePreviewModalComponent } from '../page-preview-modal/page-preview-modal.component';
import { Asset, ListArgs, AssetUpload } from '@ordercloud/headstart-sdk';
import sectionPickerMock from '../section-picker/section-picker.mock';
import { ASSET_TYPES } from '../../constants/asset-types.constants';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HtmlEditorComponent implements OnInit, OnChanges {
  @Input() initialValue: string;
  @Input() editorOptions: any;
  @Input() tagOptions?: string[];
  @Input() assetTypes?: ASSET_TYPES[];
  @Input() defaultListOptions?: ListArgs<Asset> = { filters: { Active: true } };
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Output() selectedAssetChange = new EventEmitter<Asset | Asset[]>();
  @Input() getSectionTemplates?: () => Promise<string[]>;
  @Output() htmlChange = new EventEmitter<string>();
  @Output() charCountChange ?= new EventEmitter<number>();
  html: string;
  resolvedEditorOptions: any = {};
  componentMountedToDom: boolean;
  private timer;

  tinymceId = `tiny-angular_${guid()}`;

  defaultEditorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    content_css: [
      'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
    ],
    content_style: `
    body {
      padding:15px !important;
    }
    #tinymce[contenteditable="true"] .c-slide-container img {
      display: none;
    }

    #tinymce[contenteditable="true"] .c-slide-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #tinymce[contenteditable="true"] .c-slide-container::before {
      content: '';
      width: 100%;
      height: 200px;
      position: absolute;
      background-color: lightgray;
    }
    #tinymce[contenteditable="true"] .c-slide-container::after {
      font-weight: bold;
      content: 'Carousel preview not available in edit mode. Click View > Preview';
      z-index: 0;
    }
    `,
    height: 500,

    plugins: [
      'ordercloud wordcount print paste importcss searchreplace autolink autosave save directionality',
      'code visualblocks visualchars fullscreen image link media template codesample table charmap',
      'hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools',
      'textpattern noneditable help charmap emoticons',
    ],
    menubar: 'edit view insert format',
    menu: {
      edit: {
        title: 'Edit',
        items: 'undo redo | cut copy paste | selectall | searchreplace',
      },
      view: {
        title: 'View',
        items: 'code oc-preview fullscreen',
      },
      insert: {
        title: 'Insert',
        items: 'image link media oc-section inserttable | charmap emoticons hr',
      },
      format: {
        title: 'Format',
        items:
          'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat',
      },
    },
    toolbar: [
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat',
    ],
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    imagetools_toolbar:
      'rotateleft rotateright | flipv fliph | editimage imageoptions',
    contextmenu: 'link image imagetools table oc-row oc-col',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    importcss_append: true,
    toolbar_mode: 'sliding',
    extended_valid_elements: 'script[src|async|defer|type|charset]',

    /**
     * Adds an advanced tab to set things like style/border/space
     */
    image_advtab: true,

    /**
     * object holding all OrderCloud enhanced functions
     */
    ordercloud: {
      get_section_templates_callback: () => Promise.resolve(sectionPickerMock),
    },

    /**
     * Adds an upload tab (uploads to ordercloud cms)
     */
    image_uploadtab: true,
    images_upload_handler(blobInfo, successCallback, errorCallback) {
      // importing tinymce breaks things so we have to use instance from window
      /* tslint:disable: no-string-literal */
      window['tinymce'].execCommand('ocAssetUploader', true, {
        blobInfo,
        successCallback,
        errorCallback,
      });
    },

    /**
     * Adds ability to transform images
     */

    imagetools_cors_hosts: ['marktplacetest.blob.core.windows.net'],
  };

  constructor(private modalService: NgbModal, public zone: NgZone) { }

  ngOnInit(): void {
    this.componentMountedToDom = false;
    setTimeout(() => {
      // fixes bug where editor doesn't load in a component that uses transclusion (ng-content)
      // angular components can be created in a detached state where they're not contained in a document
      // however tinymce requires there to be a DOM in order to operate correctly so we're deferring
      // execution of the editor until (most likely) the dom is loaded. Yes, this is kind of an ugly hack
      // but there isn't a great built-in solution from tinymce.
      // https://github.com/tinymce/tinymce-angular/issues/9
      this.componentMountedToDom = true;
    });
    this.html = this.initialValue;
    Object.assign(
      this.resolvedEditorOptions,
      this.defaultEditorOptions,
      this.editorOptions
    );

    this.resolvedEditorOptions.file_picker_callback = (
      callback,
      value,
      meta
    ) => {
      this.zone.run(() => {
        this.openAssetPicker.bind(this)(callback, value, meta);
      });
    };
    this.resolvedEditorOptions.ordercloud.open_carousel_editor = (editor) => {
      return this.zone.run(() => {
        // we need to manually trigger change detection
        // because this is running outside of the scope of angular
        return this.openCarouselEditor.bind(this)(editor);
      });
    };
    this.resolvedEditorOptions.ordercloud.open_section_picker = (data) => {
      return this.zone.run(() => {
        return this.openSectionPicker.bind(this)(data);
      });
    };
    this.resolvedEditorOptions.ordercloud.open_section_date_settings = (
      data
    ) => {
      return this.zone.run(() => {
        return this.openSectionDateSettings.bind(this)(data);
      });
    };

    this.resolvedEditorOptions.ordercloud.open_preview_modal = (data) => {
      return this.zone.run(() => {
        return this.openPreviewModal.bind(this)(data);
      });
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If the initial value changes and it is no longer the same as this.html, reinitialize this.html with the new initial value
    if (
      changes.initialValue &&
      !changes.initialValue.firstChange &&
      changes.initialValue.currentValue !== this.html
    ) {
      this.html = changes.initialValue.currentValue;
    }
  }

  // TODO: Throttle this callback so that the emitter isn't fired multiple times for the same change.
  onEditorChange(e: any): void {
    this.htmlChange.emit(this.html);
    if (
      this.resolvedEditorOptions.plugins.filter(
        (p) => p.includes('wordcount').length
      )
    ) {
      this.getCharacterCount();
    }
  }

  openAssetPicker(callback, value, meta): void {
    const modalRef = this.modalService.open(AssetPickerComponent, {
      size: 'xl',
      centered: true,
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window',
    });
    modalRef.componentInstance.multiple = false;
    modalRef.componentInstance.tagOptions = this.tagOptions;
    modalRef.componentInstance.assetTypes = this.assetTypes;
    modalRef.componentInstance.defaultListOptions = this.defaultListOptions;
    modalRef.componentInstance.beforeAssetUpload = this.beforeAssetUpload;
    modalRef.result
      .then((asset: Asset) => {
        if (meta.filetype === 'image') {
          callback(asset.Url, { alt: asset.Title });
          this.selectedAssetChange.emit([asset]);
        } else if (meta.filetype === 'file') {
          // TODO: do
          console.error('Filetype is not yet implemented');
        } else if (meta.filetype === 'media') {
          // TODO: do
          console.error('Filetype is not yet implemented');
        }
      })
      .catch((e) => {
        if (e !== 'user dismissed modal') {
          throw e;
        }
      });
  }

  openCarouselEditor(): Promise<any> {
    const modalRef = this.modalService.open(CarouselEditorComponent, {
      size: 'xl',
      centered: true,
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window',
    });
    return modalRef.result;
  }

  openSectionPicker(data): Promise<any> {
    const modalRef = this.modalService.open(SectionPickerComponent, {
      size: 'lg',
      centered: true,
      // TODO: might wanna abstract these classes / centered as default settings for any modal that's opened from the editor
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window',
    });
    modalRef.componentInstance.data = data;
    return modalRef.result;
  }

  openSectionDateSettings(data): Promise<any> {
    const modalRef = this.modalService.open(SectionDateSettingsComponent, {
      size: 'md',
      centered: true,
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window',
    });
    modalRef.componentInstance.data = data;
    return modalRef.result;
  }

  openPreviewModal(data: { html: string; remoteCss: string }): Promise<any> {
    const modalRef = this.modalService.open(PagePreviewModalComponent, {
      size: 'xl',
      centered: true,
      backdropClass: 'oc-tinymce-modal_backdrop',
      windowClass: 'oc-tinymce-modal_window',
    });
    modalRef.componentInstance.html = data.html;
    modalRef.componentInstance.remoteCss = data.remoteCss;
    return modalRef.result;
  }

  getCharacterCount(): void {
    // importing tinymce breaks things so we have to use instance from window
    /* tslint:disable: no-string-literal */
    const tinymce = window['tinymce'];

    const body = tinymce.get(this.tinymceId)?.getBody();
    if (body) {
      const content = tinymce.trim(body.innerText || body.textContent);
      this.charCountChange.emit(content.length);
    }
  }
}
