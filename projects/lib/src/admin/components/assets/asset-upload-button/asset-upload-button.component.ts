import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Asset, AssetUpload } from '@ordercloud/headstart-sdk';

@Component({
  selector: 'cms-asset-upload-button',
  templateUrl: './asset-upload-button.component.html',
  styleUrls: ['./asset-upload-button.component.css'],
})
export class AssetUploadButtonComponent implements OnInit {
  @Input() multiple = false;
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @ViewChild('confirmAssetUploadTemplate') confirmAssetUploadModal: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() assetsUploaded = new EventEmitter<{
    uploaded: Asset[];
    errors: any[];
  }>();
  selectedFiles?: any; // FileList
  confirmModal: NgbModalRef;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  handleUploadClick() {
    this.selectedFiles = undefined;
    this.fileInput.nativeElement.click();
  }

  confirmAssetUpload(e) {
    this.selectedFiles = e.target.files;
    this.confirmModal = this.modalService.open(this.confirmAssetUploadModal);
  }

  handleCancel() {
    this.confirmModal.dismiss();
    this.selectedFiles = undefined;
  }

  handleAssetsUploaded(event: any) {
    this.confirmModal.close();
    this.selectedFiles = undefined;
    this.assetsUploaded.emit(event);
  }
}
