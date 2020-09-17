import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import DEFAULT_ASSET_TYPES, {
  ASSET_TYPES,
} from '../../constants/asset-types.constants';
import { ListArgs, Asset, AssetUpload } from '@ordercloud/headstart-sdk';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cms-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.css'],
})
export class AssetPickerComponent implements OnInit {
  @Input() multiple = false;
  @Input() tagOptions?: string[];
  @Input() assetTypes?: ASSET_TYPES[];
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
