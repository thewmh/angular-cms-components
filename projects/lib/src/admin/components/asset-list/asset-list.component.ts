import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  ViewRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Asset, Meta } from '@ordercloud/headstart-sdk';

export type AssetListMode = 'table' | 'grid';

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements AfterViewInit {
  @Input() showAssetStatus = true;
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
  @Output() pageChangeEvent = new EventEmitter<number>();
  @ViewChild('gridContainer') gridContainerEl: ElementRef;
  columnWidth: string | number;

  constructor() {
    window.addEventListener('resize', this.evaluateColumnWidth);
  }

  ngAfterViewInit(): void {
    setTimeout(this.evaluateColumnWidth, 100);
  }

  evaluateColumnWidth = () => {
    console.log(
      'test',
      JSON.stringify(this.gridContainerEl, null, 2),
      JSON.stringify(this.gridContainerEl.nativeElement, null, 2)
    );
    if (
      this.gridContainerEl &&
      this.gridContainerEl.nativeElement &&
      this.gridContainerEl.nativeElement.offsetWidth
    ) {
      const columnCount = this.evaluateColumnCount();
      console.log(
        'check',
        this.gridContainerEl.nativeElement.offsetWidth,
        columnCount
      );

      this.columnWidth = `calc((${
        this.gridContainerEl.nativeElement.offsetWidth / columnCount
      }px - 0.5rem) - (0.5rem / ${columnCount}))`;
      console.log('new width', this.columnWidth);
    }
  };

  evaluateColumnCount = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
      return 2;
    }
    if (windowWidth <= 1068) {
      return 4;
    }
    if (windowWidth <= 1280) {
      return 5;
    }
    if (windowWidth <= 1920) {
      return 6;
    }
    return 8;
  };

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
