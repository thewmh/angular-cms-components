import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Asset, AssetUpload, ListArgs } from '@ordercloud/cms-sdk'
import { ASSET_TYPES } from '../../constants/asset-types.constants';

@Component({
  selector: 'cms-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.css'],
})
export class AssetPickerComponent implements OnInit {
  @Input() multiple = false;
  @Input() tagOptions?: string[];
  @Input() assetTypes?: ASSET_TYPES[];
  @Input() additionalFilters?: TemplateRef<any>;
  @Input() defaultListOptions?: ListArgs<Asset> = { filters: { Active: true } };
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  selectedAsset: Asset[];

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
    if (!this.selectedAsset) {
      this.selectedAsset = [];
    }
  }
}
