import { Component, OnInit } from '@angular/core';
import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  assets: any;
  modalReference: NgbModalRef;
  assetTypes: string[] = ['Image', 'Theme', 'Attachment', 'Structured'];
  selectedTab: string = 'Image';

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.listAssets(this.assetTypes[0], null);
  }

  listAssets(assetType: string, searchTerm: string) {
    let options: any = { filters: { Type: assetType } };
    if (searchTerm) options = { ...options, search: searchTerm, searchOn: 'Title' };
    return HeadStartSDK.Assets.List(options).then(
      (assets) => {
        this.assets = assets;
      }
    );
  }

  handleUploadAssetModal(modalRef) {
    this.modalReference = this.modalService.open(modalRef, {size: 'lg'});
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
