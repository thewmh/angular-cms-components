import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MarketplaceSDK, Asset } from 'marketplace-javascript-sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cms-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class CmsAssetUpdateComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  assetForm: FormGroup;

  @Input() asset?: any;
  @Input() assetType: any;
  @Input() isNew: boolean;
  @Output() onSubmit = new EventEmitter();
  @Output() onDelete = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    const formGroup = {
      Title: [this.asset ? this.asset.Title : null, Validators.required],
      Url: [this.asset ? this.asset.Url : null, null],
      Active: [this.asset ? this.asset.Active : false],
      ID: [this.asset ? this.asset.ID : null, null],
      Type: [this.asset ? this.asset.Type : this.assetType],
      FileName: [this.asset ? this.asset.FileName : null],
    };

    this.assetForm = this.formBuilder.group(formGroup);
  }

  uploadFile(file): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.assetForm.controls['Url'].setValue(e.target['result']);
    };
    reader.readAsDataURL(file);
    this.assetForm.controls['FileName'].setValue(file.name);
  }

  formValid(): boolean {
    return this.assetForm.valid;
  }

  deleteAsset(assetID: string) {
    return MarketplaceSDK.Assets.Delete(assetID).then(() => {
      this.onDelete.emit();
    });
  }

  saveChanges(asset) {
    let updatedAsset = asset.value;
    if (this.isNew) {
      return MarketplaceSDK.Upload.UploadAsset(updatedAsset).then(() => {
        this.isNew = false;
        this.onSubmit.emit({
          action: 'UploadAsset',
          asset: updatedAsset
        });
      })
    } else {
      return MarketplaceSDK.Assets.Update(updatedAsset.ID, updatedAsset).then(() => {
        this.onSubmit.emit({
          action: 'Update',
          asset: updatedAsset
        });
      })
    }
  }

  deleteFile() {
    this.assetForm.controls['Url'].setValue(null);
    this.assetForm.controls['FileName'].setValue(null);
  }
}
