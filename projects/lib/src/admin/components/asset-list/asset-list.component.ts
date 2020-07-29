import { Component, OnInit } from '@angular/core';
import {
  HeadStartSDK,
  ListArgs,
  Asset,
  Filters,
} from '@ordercloud/headstart-sdk';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  assets: any;
  modalReference: NgbModalRef;
  assetTypes: AssetType[] = [
    ASSET_TYPE_IMAGE,
    ASSET_TYPE_THEME,
    ASSET_TYPE_ATTACHMENT,
    ASSET_TYPE_STRUCTURED,
  ];
  selectedTab: AssetType = ASSET_TYPE_IMAGE;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.listAssets(this.assetTypes[0], null);
  }

  listAssets(assetType: AssetType, searchTerm: string) {
    let options: ListArgs<Asset> = {
      filters: { Type: assetType },
    };
    if (searchTerm) {
      options = { ...options, search: searchTerm, searchOn: ['Title'] };
    }
    return HeadStartSDK.Assets.List(options).then((assets) => {
      this.assets = assets;
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

  onChangeTab(eventId): void {
    this.selectedTab = eventId;
    this.listAssets(this.selectedTab, null);
  }
}
