import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Asset,
  Meta,
  ListArgs,
  HeadStartSDK,
  ListPage,
} from '@ordercloud/headstart-sdk';
import { ResourceType } from '../../../../shared/models/resource-type.interface';
import { AssetListMode } from '../asset-list/asset-list.component';
import DEFAULT_ASSET_TYPES, {
  ASSET_TYPES,
} from '../../../constants/asset-types.constants';

@Component({
  selector: 'cms-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.scss'],
})
export class AssetManagementComponent implements OnInit {
  @Input() defaultListOptions?: Partial<ListArgs> = {};
  @Input() resourceType?: ResourceType;
  @Input() resourceID?: string;
  @Input() selectable = false;
  @Input() multiple = false;
  @Input() selected: Asset[] = [];
  @Input() assetTypes: ASSET_TYPES[] = DEFAULT_ASSET_TYPES;
  @Input() tagOptions?: string[];
  assetDetail?: Asset;

  search = '';
  listMode?: AssetListMode = 'table';
  items?: Asset[];
  meta?: Meta;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.resourceID && this.resourceType && this.defaultListOptions) {
      console.warn(
        "Because you've provided a resourceType and resourceID, defaultListOptions will be ignored as they are not currently supported while listing assets per resource"
      );
    }
    this.listAssets();
  }

  listAssets(options?: ListArgs<Asset>) {
    this.spinner.show();
    const requestOptions: ListArgs<Asset> = Object.assign(
      {},
      options,
      this.defaultListOptions
    );

    return (this.resourceID && this.resourceType
      ? this.listAssetsByResource()
      : this.listAssetsByFilters(requestOptions)
    ).finally(() => {
      this.spinner.hide();
    });
  }

  listAssetsByResource() {
    return HeadStartSDK.Assets.ListAssets(
      this.resourceType,
      this.resourceID
    ).then((response: any) => {
      this.items = response;
    });
  }

  listAssetsByFilters(options: ListArgs<Asset>) {
    return HeadStartSDK.Assets.List(options).then(
      (response: ListPage<Asset>) => {
        this.items = response.Items;
        this.meta = response.Meta;
      }
    );
  }

  handleAssetClick(asset: Asset) {
    this.assetDetail = asset;
  }

  handleAssetsUploaded(newAssets: Asset[]) {
    this.items = [...this.items, ...newAssets];
    if (newAssets.length === 1) {
      this.assetDetail = newAssets[0];
    }
  }

  handleAssetDeleted(asset: Asset) {
    this.items = this.items.filter((i) => i.ID !== asset.ID);
    this.assetDetail = undefined;
  }
}
