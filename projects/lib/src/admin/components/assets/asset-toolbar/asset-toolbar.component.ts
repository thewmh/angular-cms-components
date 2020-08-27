import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetListMode } from '../asset-list/asset-list.component';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Asset } from '@ordercloud/headstart-sdk';

@Component({
  selector: 'cms-asset-toolbar',
  templateUrl: './asset-toolbar.component.html',
  styleUrls: ['./asset-toolbar.component.css'],
})
export class AssetToolbarComponent implements OnInit {
  @Input() multiple = false;
  @Input() listMode: AssetListMode;
  @Output() listModeChange = new EventEmitter<AssetListMode>();
  @Output() assetsUploaded = new EventEmitter<Asset[]>();

  @Input() search: string;
  @Output() searchChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
