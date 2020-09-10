import { error } from '@angular/compiler/src/util';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Asset } from '@ordercloud/headstart-sdk';
import { ASSET_TYPES } from '../../constants/asset-types.constants';
import { getGroupName } from '@contentful/mimetype';

@Component({
  selector: 'cms-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit, OnChanges {
  @Input() asset?: Asset;
  @Input() file?: any;
  @Input() size = 300;
  @Input() selected = false;

  ready = false;
  type?: ASSET_TYPES | 'Error';
  url?: string;
  alt?: string;
  fr = new FileReader();

  constructor() {
    this.fr.onload = this.handleFileLoad;
    this.fr.onerror = this.handleFileError;
    this.fr.onloadend = this.handleFileLoadEnd;
  }

  ngOnInit(): void {
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

    if (changes.size && !changes.size.firstChange && this.asset) {
      this.url = this.assetSizedUrl(this.asset.Url);
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
    if (this.size <= 100) {
      return url + '-s';
    }
    if (this.size <= 300) {
      return url + '-m';
    }
    return url;
  }

  initFile(): void {
    this.fr.readAsDataURL(this.file);
    this.alt = this.file.name;
    this.type = getGroupName({
      type: this.file.type,
    });
  }

  handleFileLoad(e: ProgressEvent<FileReader>): void {
    this.url = e.target.result.toString();
  }

  handleFileError(e: ProgressEvent<FileReader>): void {
    this.type = undefined;
  }

  handleFileLoadEnd(): void {
    this.ready = true;
  }
}
