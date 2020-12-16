import { error } from '@angular/compiler/src/util';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Asset } from '@ordercloud/cms-sdk'
import {
  ASSET_TYPE,
  ASSET_TYPES,
} from '../../constants/asset-types.constants';

@Component({
  selector: 'cms-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit, OnChanges {
  @Input() asset?: Asset;
  @Input() file?: any;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() selected = false;
  @Input('width') customWidth: number | string;
  @Input('height') customHeight: number | string;
  @Input() caption?: string;
  @Input() showRemove = false;
  @Output() remove = new EventEmitter<number | undefined>();

  assetType: typeof ASSET_TYPE;
  ready = false;
  type?: ASSET_TYPES;
  url?: string;
  alt?: string;
  fr = new FileReader();
  defaultSize: string;

  constructor() {
    this.assetType = ASSET_TYPE;
    this.fr.onload = this.handleFileLoad.bind(this);
    this.fr.onerror = this.handleFileError.bind(this);
  }

  get width(): string {
    return this.customWidth
      ? typeof this.customWidth === 'number'
        ? this.customWidth + 'px'
        : this.customWidth
      : this.defaultSize;
  }

  get height(): string {
    return this.customHeight
      ? typeof this.customHeight === 'number'
        ? this.customHeight + 'px'
        : this.customHeight
      : this.defaultSize;
  }

  ngOnInit(): void {
    this.defaultSize = this.determineDefaultSize();
    if (this.asset && this.file) {
      throw error(
        '[angular-cms-components] CmsThumbnailComponent requires either an asset or a file, not both.'
      );
    }
    if (this.asset) {
      this.initAsset();
    }
    if (this.file) {
      this.initFile();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (
      (changes.asset && !changes.asset.firstChange) ||
      (changes.file && !changes.file.firstChange)
    ) {
      this.ngOnInit();
      return;
    }

    if (changes.size && !changes.size.firstChange) {
      this.defaultSize = this.determineDefaultSize();
      if (this.asset) {
        this.url = this.assetSizedUrl(this.asset.Url);
      }
    }
  }

  initAsset(): void {
    this.type = this.asset.Type;
    this.url =
      this.type === 'Image'
        ? this.assetSizedUrl(this.asset.Url)
        : this.asset.Url;
    this.alt = this.asset.Title || this.asset.FileName;
    this.ready = true;
  }

  assetSizedUrl(url: string): string {
    if (this.size === 'small') {
      return url + '-s';
    }
    if (this.size === 'large') {
      return url;
    }
    return url + '-m';
  }

  determineDefaultSize(): string {
    if (this.size === 'small') {
      return '100px';
    }
    if (this.size === 'medium') {
      return '300px';
    }
    return '600px';
  }

  initFile(): void {
    this.fr.readAsDataURL(this.file);
    this.alt = this.file.name;
    this.type =
      this.file.type === 'application/json'
        ? 'JSON'
        : this.file.groupName || 'Unknown';
  }

  handleFileLoad(e: ProgressEvent<FileReader>): void {
    this.url = e.target.result as string;
    this.ready = true;
  }

  handleFileError(e: ProgressEvent<FileReader>): void {
    this.type = undefined;
    this.ready = true;
  }
}
