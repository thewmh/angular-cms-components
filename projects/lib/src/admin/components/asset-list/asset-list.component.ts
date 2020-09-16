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
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { Asset, Meta } from '@ordercloud/headstart-sdk';

export type AssetListMode = 'table' | 'grid';

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements AfterViewInit, OnChanges {
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
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.evaluateColumnWidth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.gridContainerEl && changes.gridContainerEl.currentValue) ||
      (changes.mode &&
        !changes.mode.firstChange &&
        changes.mode.currentValue === 'grid')
    ) {
      setTimeout(this.evaluateColumnWidth, 100);
    }
  }

  evaluateColumnWidth = () => {
    if (
      this.gridContainerEl &&
      this.gridContainerEl.nativeElement &&
      this.gridContainerEl.nativeElement.offsetWidth
    ) {
      const columnCount = this.evaluateColumnCount();
      this.columnWidth = `calc((${
        (this.gridContainerEl.nativeElement.offsetWidth - 15) / columnCount
      }px - 0.5rem) - (0.5rem / ${columnCount}))`;
    }
  };

  evaluateColumnCount = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 425) {
      return 2;
    }
    if (windowWidth <= 768) {
      return 3;
    }
    if (windowWidth <= 1024) {
      return 5;
    }
    if (windowWidth <= 1440) {
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
