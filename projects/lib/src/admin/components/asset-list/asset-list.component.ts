import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Asset, Meta } from '@ordercloud/headstart-sdk';

export type AssetListMode = 'table' | 'grid';

@Component({
  selector: 'cms-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() showAssetStatus = true;
  @Input() shrink = false;
  @Input() mode: AssetListMode = 'table';
  @Input() selectable = false;
  @Input() multiple = false;
  @Input() items?: Asset[];
  @Input() meta?: Meta;
  @Input() selectedAsset: Asset[];
  @Input() downloadableFileTypes?: string[] = [];
  @Output() selectedAssetChange = new EventEmitter<Asset[]>();
  @Input() assetDetail?: Asset;
  @Output() assetDetailChange = new EventEmitter<Asset>();
  @Output() pageChangeEvent = new EventEmitter<number>();
  @ViewChild('gridContainer') gridContainerEl: ElementRef;
  columnWidth: string | number;
  showDownloadBtn = false;

  constructor() {
    window.addEventListener('resize', this.evaluateColumnWidth);
  }

  ngAfterViewInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    setTimeout(this.evaluateColumnWidth, 300);
  }

  ngOnInit() {
    if (!this.selectedAsset) {
      this.selectedAsset = [];
    }
    if (this.items.length && this.downloadableFileTypes.length) {
      this.showDownloadBtn = !!this.items.map(asset => asset.Metadata.ContentType)
      .filter(type => this.downloadableFileTypes.includes(type)).length;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.gridContainerEl &&
        changes.gridContainerEl.currentValue &&
        !changes.gridContrainerEl.firstChange) ||
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
      this.multiple
        ? this.selectedAsset.push(asset)
        : (this.selectedAsset = [asset]);
    } else {
      this.multiple
        ? this.selectedAsset.splice(selectedIndex, 1)
        : (this.selectedAsset = []);
    }

    this.selectedAssetChange.emit(this.selectedAsset);
  };

  getAssetIndex = (asset: Asset) => {
    return this.selectedAsset.findIndex((a) => a.ID === asset.ID);
  };

  isAssetSelected = (asset: Asset) => {
    return (
      this.selectable && !!this.selectedAsset.find((a) => a.ID === asset.ID)
    );
  };
  isDownloadableFileType = (fileType: string): boolean => this.downloadableFileTypes.includes(fileType);
}
