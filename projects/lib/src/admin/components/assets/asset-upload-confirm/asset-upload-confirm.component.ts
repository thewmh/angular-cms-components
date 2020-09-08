import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Asset, HeadStartSDK, AssetUpload } from '@ordercloud/headstart-sdk';
import * as Q from 'q';

@Component({
  selector: 'cms-asset-upload-confirm',
  templateUrl: './asset-upload-confirm.component.html',
  styleUrls: ['./asset-upload-confirm.component.scss'],
})
export class AssetUploadConfirmComponent implements OnInit, OnChanges {
  @Input() files: any;
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Output() done = new EventEmitter<{ uploaded: Asset[]; errors: any[] }>();
  @Output() cancel = new EventEmitter();
  uploadQueue: Promise<any>[] = [];
  uploading = false;

  constructor() {}

  ngOnInit(): void {
    this.readDataUrls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes && changes.files && !changes.files.firstChange) {
      this.readDataUrls();
    }
  }

  readDataUrls() {
    this.files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        f.dataUrl = e.target.result;
      };
      reader.readAsDataURL(f);
    });
  }

  handleUploadFiles() {
    this.uploading = true;
    this.files.forEach((f) => {
      const uploadAsset: AssetUpload = {
        Type: 'Image',
        File: f,
        FileName: f.name,
        Title: f.name,
        Active: true,
      };

      this.uploadQueue.push(this.uploadFile(uploadAsset));
    });
    Q.allSettled(this.uploadQueue).then((values: Q.PromiseState<Asset>[]) => {
      const uploaded = values
        .filter((v) => v.state === 'fulfilled')
        .map((v) => v.value);

      const errors = values
        .filter((v) => v.state === 'rejected')
        .map((v) => v.value);

      this.done.emit({
        uploaded,
        errors,
      });

      this.uploading = false;
      this.uploadQueue = [];
    });
  }

  uploadFile(asset: AssetUpload) {
    if (this.beforeAssetUpload) {
      return this.beforeAssetUpload(asset).then(
        HeadStartSDK.Upload.UploadAsset
      );
    }
    return HeadStartSDK.Upload.UploadAsset(asset);
  }
}
