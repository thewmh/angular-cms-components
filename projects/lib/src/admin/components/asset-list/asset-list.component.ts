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
import { merge as _merge} from 'lodash';
import { ResourceType } from 'projects/lib/src/shared/models/resource-type.interface';
import { ParentResourceType } from 'projects/lib/src/shared/models/parent-resource-type.interface';

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
  @Input() defaultFilterOptions?: Partial<ListArgs> = {};
  @Input() resourceType?: ResourceType = null;
  @Input() resourceID?: string = null;
  @Input() parentResourceID?: ParentResourceType = null;
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
    this.listAssets(this.selectedTab, null);
  }

  listAssets(assetType: AssetType, searchTerm: string) {
    this.spinner.show();
    let options: ListArgs<Asset> = _merge( {filters: { Type: assetType }}, this.defaultFilterOptions );
    if (searchTerm) {
      options = { ...options, search: searchTerm, searchOn: ['Title'] };
    }
    if (this.resourceID && this.resourceType) {
      return HeadStartSDK.Assets.ListAssets(this.resourceType, this.resourceID)
        .then((response) => this.assets = response.Items.filter(a => a.Type === assetType))
        .catch((ex) => ex)
        .finally(() => {
          this.loading = false;
          this.spinner.hide();
        });
    } else {
      return HeadStartSDK.Assets.List(options)
        .then((response) => this.assets = response.Items)
        .catch((ex) => ex)
        .finally(() => {
          this.loading = false;
          this.spinner.hide();
        });
    }
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
