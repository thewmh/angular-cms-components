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
import { Asset } from '@ordercloud/headstart-sdk';

@Component({
  selector: 'cms-asset-upload-button',
  templateUrl: './asset-upload-button.component.html',
  styleUrls: ['./asset-upload-button.component.css'],
})
export class AssetUploadButtonComponent implements OnInit {
  @Input() multiple = false;
  @ViewChild('confirmAssetUploadTemplate') confirmAssetUploadModal: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() assetsUploaded = new EventEmitter<Asset[]>();
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

  handleAssetsUploaded(newAssets: Asset[]) {
    this.confirmModal.close();
    this.selectedFiles = undefined;
    this.assetsUploaded.emit(newAssets);
  }
}
