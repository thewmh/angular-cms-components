import { Component, Input, OnInit } from '@angular/core';
import {
  NgbModal,
  NgbModalRef,
  NgbNavChangeEvent
} from '@ng-bootstrap/ng-bootstrap';
import {
  Asset,
  HeadStartSDK,
  ListArgs
} from '@ordercloud/headstart-sdk';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResourceType } from '../../../shared/models/resource-type.interface';

const ASSET_TYPE_IMAGE = 'Image';
type ASSET_TYPE_IMAGE = typeof ASSET_TYPE_IMAGE;
const ASSET_TYPE_THEME = 'Theme';
type ASSET_TYPE_THEME = typeof ASSET_TYPE_THEME;
const ASSET_TYPE_ATTACHMENT = 'Attachment';
type ASSET_TYPE_ATTACHMENT = typeof ASSET_TYPE_ATTACHMENT;
const ASSET_TYPE_STRUCTURED = 'Structured';
type ASSET_TYPE_STRUCTURED = typeof ASSET_TYPE_STRUCTURED;

type AssetType =
  | ASSET_TYPE_IMAGE
  | ASSET_TYPE_THEME
  | ASSET_TYPE_ATTACHMENT
  | ASSET_TYPE_STRUCTURED;

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {
  @Input() resourceType?: ResourceType = null;
  @Input() resourceID?: string = null;
  @Input() parentResourceID?: string = null;
  assets: any;
  modalReference: NgbModalRef;
  loading = true;
  assetTypes: AssetType[] = [
    ASSET_TYPE_IMAGE,
    ASSET_TYPE_THEME,
    ASSET_TYPE_ATTACHMENT,
    ASSET_TYPE_STRUCTURED,
  ];
  selectedTab: AssetType = ASSET_TYPE_IMAGE;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-asset-list is missing required props resourceType or resourceID'
      );
    }
    this.listAssets(this.selectedTab, null);
  }

  listAssets(assetType: AssetType, searchTerm: string) {
    this.spinner.show();
    let options: ListArgs<Asset> = {
      filters: { Type: assetType },
    };
    // TODO: ListAssets will not accept search as a parameter, refactor for client side searching
    if (searchTerm) {
      options = { ...options, search: searchTerm, searchOn: ['Title'] };
    }
    return HeadStartSDK.Assets.ListAssets(this.resourceType, this.resourceID, options)
      .then((response) => this.assets = response.Items ? response.Items.filter(asset => asset.Type === assetType) : [])
      .catch((ex) => ex)
      .finally(() => {
        this.loading = false;
        this.spinner.hide();
      });
  }

  handleUploadAssetModal(modalRef) {
    this.modalReference = this.modalService.open(modalRef, { size: 'lg' });
  }

  handleSubmit() {
    this.modalReference.close();
    this.listAssets(this.selectedTab, null);
  }

  handleSearch($event) {
    this.listAssets(this.selectedTab, $event);
  }

  onChangeTab(event: NgbNavChangeEvent): void {
    this.selectedTab = event.nextId;
    this.listAssets(this.selectedTab, null);
  }
}
