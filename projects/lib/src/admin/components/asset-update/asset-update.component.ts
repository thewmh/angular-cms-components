import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeadStartSDK, AssetAssignment } from '@ordercloud/headstart-sdk';
import { ResourceType } from '../../../shared/models/resource-type.interface';

@Component({
  selector: 'cms-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class AssetUpdateComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  assetForm: FormGroup;
  displayUrl: any;
  fileValue: File;

  @Input() asset?: any;
  @Input() assetType: any;
  @Input() isNew: boolean;
  @Input() resourceType?: ResourceType = null;
  @Input() resourceID?: string = null;
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
      Title: [this.asset ? this.asset.Title : null, null],
      Url: [this.asset ? this.asset.Url : null, null],
      Active: [this.asset ? this.asset.Active : false],
      Type: [this.asset ? this.asset.Type : this.assetType],
      FileName: [this.asset ? this.asset.FileName : null],
      File: [this.asset ? this.asset.File : null]
    };
    
    this.assetForm = this.formBuilder.group(formGroup);
  }

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // only set Url so it can be displayed after uploading
      this.assetForm.controls.Url.setValue(e.target.result);
    };
    reader.readAsDataURL(file);
    this.assetForm.controls.File.setValue(file);
    this.assetForm.controls.FileName.setValue(file.name);
  }

  formValid(): boolean {
    return this.assetForm.valid;
  }

  deleteAsset(assetID: string) {
    return HeadStartSDK.Assets.Delete(assetID).then(() => {
      this.onDelete.emit();
    });
  }

  saveChanges(asset) {
    const updatedAsset = asset.value;
    if (this.isNew) {
      if (updatedAsset.File) delete updatedAsset.Url;
      return HeadStartSDK.Upload.UploadAsset(updatedAsset).then((response) => {
        if (this.resourceID && this.resourceType) {
          const assignment: AssetAssignment = {
            ResourceID: this.resourceID,
            ResourceType: this.resourceType,
            AssetID: response.ID
          };
          return HeadStartSDK.Assets.SaveAssetAssignment(assignment).then(() => {
            this.isNew = false;
            this.onSubmit.emit({
              action: 'UploadAsset',
              asset: response
            });
          })
        } else {
          this.isNew = false;
          this.onSubmit.emit({
            action: 'UploadAsset',
            asset: response
          });
        }
      });
    } else {
      return HeadStartSDK.Assets.Save(updatedAsset.ID, updatedAsset).then(() => {
        this.onSubmit.emit({
          action: 'Update',
          asset: updatedAsset
        });
      });
    }
  }

  deleteFile() {
    this.assetForm.controls.File.setValue(null);
    this.assetForm.controls.FileName.setValue(null);
    this.assetForm.controls.Url.setValue(null);
  }
}
