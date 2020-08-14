import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetAssignment, HeadStartSDK } from '@ordercloud/headstart-sdk';

@Component({
  selector: 'cms-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class AssetUpdateComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  assetForm: FormGroup;

  @Input() asset?: any;
  @Input() assetType: any;
  @Input() resourceType: 'Products' | 'Categories' | 'Catalogs' | 'Promotions' | 'Suppliers' | 'Buyers' | 'ProductFacets';
  @Input() resourceID: string;
  @Input() isNew: boolean;
  @Output() onSubmit = new EventEmitter();
  @Output() onDelete = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-asset-update is missing required props resourceType or resourceID'
      );
    }
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
    return HeadStartSDK.Assets.Delete(assetID).then(() => {
      this.onDelete.emit();
    });
  }

  saveChanges(asset) {
    let updatedAsset = asset.value;
    if (this.isNew) {
      return HeadStartSDK.Upload.UploadAsset(updatedAsset).then((response) => {
        const assignment: AssetAssignment = {
          ResourceType: this.resourceType,
          ResourceID: this.resourceID,
          AssetID: response.ID
        }
        return HeadStartSDK.Assets.SaveAssetAssignment(assignment).then(() => {
          this.isNew = false;
          this.onSubmit.emit({
            action: 'UploadAsset',
            asset: response
          });
        })
      })
    } else {
      return HeadStartSDK.Assets.Update(updatedAsset.ID, updatedAsset).then(() => {
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
