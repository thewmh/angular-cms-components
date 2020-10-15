import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Asset, HeadStartSDK, AssetUpload } from '@ordercloud/headstart-sdk';
import { getGroupName, getExtension } from '@contentful/mimetype';
import * as Q from 'q';

@Component({
  selector: 'cms-asset-upload-confirm',
  templateUrl: './asset-upload-confirm.component.html',
  styleUrls: ['./asset-upload-confirm.component.scss'],
})
export class AssetUploadConfirmComponent {
  @Input() files: any;
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Output() done = new EventEmitter<{ uploaded: Asset[]; errors: any[] }>();
  @Output() cancel = new EventEmitter();
  uploadQueue: Promise<any>[] = [];
  uploading = false;

  constructor() {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.files.forEach((f) => {
      f.groupName = getGroupName({
        type: f.type,
        fallbackExt: getExtension(f.name),
        fallbackFileName: f.name,
      });
    });
  }

  handleUploadFiles() {
    this.uploading = true;
    this.files.forEach((f) => {
      const uploadAsset: AssetUpload = {
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
