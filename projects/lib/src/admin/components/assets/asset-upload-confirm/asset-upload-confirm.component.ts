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
  @Output() done = new EventEmitter<Asset[]>();
  @Output() cancel = new EventEmitter();

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
    const uploadQueue: Promise<any>[] = [];
    this.files.forEach((f) => {
      const uploadAsset: AssetUpload = {
        Type: 'Image',
        File: f,
        FileName: f.name,
        Title: f.name,
        Active: true,
      };

      uploadQueue.push(HeadStartSDK.Upload.UploadAsset(uploadAsset));
    });
    Q.all(uploadQueue).then((assets: Asset[]) => {
      this.done.emit(assets);
    });
  }
}
