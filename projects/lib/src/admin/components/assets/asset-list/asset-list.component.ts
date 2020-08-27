import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Asset, Meta } from '@ordercloud/headstart-sdk';

export type AssetListMode = 'table' | 'grid';

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit, OnChanges {
  @Input() shrink = false;
  @Input() mode: AssetListMode = 'table';
  @Input() selectable = false;
  @Input() multiple = false;
  @Input() items?: Asset[];
  @Input() meta?: Meta;
  @Input() selected: Asset[] = [];
  @Output() selectedChange = new EventEmitter<Asset[]>();
  @Input() assetDetail?: Asset;
  @Output() assetDetailChange = new EventEmitter<Asset>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
  }

  handleAssetClick = (asset: Asset) => {
    if (!this.selectable) {
      this.assetDetailChange.emit(asset);
    }
    const selectedIndex = this.getAssetIndex(asset);
    if (selectedIndex < 0) {
      this.multiple ? this.selected.push(asset) : (this.selected = [asset]);
    } else {
      this.multiple
        ? this.selected.splice(selectedIndex, 1)
        : (this.selected = []);
    }

    this.selectedChange.emit(this.selected);
  };

  getAssetIndex = (asset: Asset) => {
    return this.selected.findIndex((a) => a.ID === asset.ID);
  };

  isAssetSelected = (asset: Asset) => {
    return this.selectable && !!this.selected.find((a) => a.ID === asset.ID);
  };
}
