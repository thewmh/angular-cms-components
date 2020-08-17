import { Component, Input, OnInit } from '@angular/core';
import {
  NgbModal,
  NgbModalRef,
  NgbNavChangeEvent
} from '@ng-bootstrap/ng-bootstrap';
import {
  Asset, HeadStartSDK,
  ListArgs
} from '@ordercloud/headstart-sdk';
import { RequiredDeep } from '@ordercloud/headstart-sdk/dist/models/RequiredDeep';
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

  async ngOnInit(): Promise<void> {
    if (!this.resourceType || !this.resourceID) {
      throw new Error(
        'cms-asset-list is missing required props resourceType or resourceID'
      );
    }
    await this.listAssets(this.selectedTab, null);
  }

  async listAssets(assetType: AssetType, searchTerm: string) {
    console.log('this is hit');
    this.spinner.show();
    // TODO: options are not used yet - either handle searchTerm client side or wait for Oliver's updated endpoints
    let options: ListArgs<Asset> = {
      filters: { Type: assetType }
    };
    if (searchTerm) {
      options = { ...options, search: searchTerm, searchOn: ['Title'] };
    }
    this.assets = await this.listAssetsPerResource()
      .then((assets) => assets.filter(a => a.Type === assetType))
      .catch((ex) => ex)
      .finally(() => {
        this.loading = false;
        this.spinner.hide();
      });
  }

  async listAssetsPerResource(): Promise<RequiredDeep<Asset[]>> {
    // TODO: remove 'as any' when ListDocuments returns correct type, currently it returns 'void' which is wrong
    return (await HeadStartSDK.Assets.ListAssets(
      this.resourceID,
      this.parentResourceID,
      this.resourceType
    )) as any;
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
