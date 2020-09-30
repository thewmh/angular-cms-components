import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Asset, AssetUpload, ListArgs } from '@ordercloud/headstart-sdk';
import { ASSET_TYPES } from '../../constants/asset-types.constants';
import { AssetPickerComponent } from '../asset-picker/asset-picker.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'cms-asset-input',
  templateUrl: './asset-input.component.html',
  styleUrls: ['./asset-input.component.scss'],
})
export class AssetInputComponent implements OnInit, OnChanges {
  @Input() multiple = false;
  @Input() tagOptions?: string[];
  @Input() assetTypes?: ASSET_TYPES[];
  @Input() additionalFilters?: TemplateRef<any>;
  @Input() defaultListOptions?: ListArgs<Asset> = { filters: { Active: true } };
  @Input() beforeAssetUpload?: (asset: AssetUpload) => Promise<AssetUpload>;
  @ViewChild('assetPickerTemplate') assetPickerModal: ElementRef;
  @Output() selectedAssetChange = new EventEmitter<Asset | Asset[]>();
  @Input() selectedAsset?: Asset[] | Asset;

  constructor(private modalService: NgbModal) {}
  assetPicker: NgbModalRef;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (
      changes.defaultListOptions &&
      !changes.defaultListOptions.firstChange &&
      this.assetPicker &&
      this.assetPicker.componentInstance
    ) {
      this.assetPicker.componentInstance.defaultListOptions =
        changes.defaultListOptions.currentValue;
    }
  }

  get buttonText(): string {
    return `${this.selectedAsset ? 'Change' : `Choose`} Image${
      this.multiple ? '(s)' : ''
    }`;
  }

  openAssetPicker(): void {
    this.assetPicker = this.modalService.open(AssetPickerComponent, {
      size: 'xl',
      centered: true,
    });
    this.assetPicker.componentInstance.multiple = this.multiple;
    this.assetPicker.componentInstance.tagOptions = this.tagOptions;
    this.assetPicker.componentInstance.assetTypes = this.assetTypes;
    this.assetPicker.componentInstance.additionalFilters = this.additionalFilters;
    this.assetPicker.componentInstance.defaultListOptions = this.defaultListOptions;
    this.assetPicker.componentInstance.beforeAssetUpload = this.beforeAssetUpload;
    this.assetPicker.result
      .then((selected: Asset | Asset[]) => {
        this.selectedAssetChange.emit(selected);
      })
      .catch((e) => {
        if (e !== 'user dismissed modal') {
          throw e;
        }
      });
  }

  handleRemove(index?: number) {
    return (e: any) => {
      if (typeof index === 'number' && this.multiple === true) {
        const newSelected = cloneDeep(this.selectedAsset);
        newSelected.splice(index, 1);
        this.selectedAssetChange.emit(
          newSelected.length ? newSelected : undefined
        );
      } else {
        this.selectedAssetChange.emit(undefined);
      }
    };
  }
}
