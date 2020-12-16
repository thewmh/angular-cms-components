import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetListMode } from '../asset-list/asset-list.component';
import { Asset, AssetUpload } from '@ordercloud/cms-sdk'

@Component({
  selector: 'cms-asset-toolbar',
  templateUrl: './asset-toolbar.component.html',
  styleUrls: ['./asset-toolbar.component.css'],
})
export class AssetToolbarComponent implements OnInit {
  @Input() multiple = false;
  @Input() listMode: AssetListMode;
  @Input() showListModeToggle = true;
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @Output() listModeChange = new EventEmitter<AssetListMode>();
  @Output() assetsUploaded = new EventEmitter<{
    uploaded: Asset[];
    errors: any[];
  }>();

  @Input() search: string;
  @Output() searchChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
