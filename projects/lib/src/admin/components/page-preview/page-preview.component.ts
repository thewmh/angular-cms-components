import { Component, OnInit, Input } from '@angular/core';
import { DeviceDimensions } from '../../models/device-dimensions.interface';
import { DeviceSize } from '../../models/device-size.interface';
import { Area } from '../../models/area.interface';

@Component({
  selector: 'cms-page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss']
})
export class PagePreviewComponent implements OnInit {
  @Input() html: string;
  @Input() remoteCss: string; // optional
  @Input() deviceDimensions: DeviceDimensions; // optional
  @Input() initialPreview: DeviceSize; // optional

  defaultDeviceDimensions: DeviceDimensions = {
    phone: {
      height: 667,
      width: 375,
    },
    tablet: {
      height: 1024,
      width: 768
    },
    desktop: {
      height: 1080,
      width: 1920
    }
  };
  height: number;
  width: number;
  previewDimensions: Area;
  selected: DeviceSize;

  constructor() {}

  ngOnInit(): void {
    if (!this.deviceDimensions){
      this.deviceDimensions = {} as DeviceDimensions;
    }
    const resolvedDimensions = {} as DeviceDimensions;
    Object.assign(resolvedDimensions, this.defaultDeviceDimensions, this.deviceDimensions);
    this.deviceDimensions = resolvedDimensions;
    this.preview(this.initialPreview || 'phone');
  }

  preview(size: DeviceSize): void {
    this.selected = size;
    this.previewDimensions = this.deviceDimensions[size];
  }

}
