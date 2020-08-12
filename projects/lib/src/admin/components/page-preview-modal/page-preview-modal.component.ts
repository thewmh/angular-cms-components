import { Component, OnInit, Input } from '@angular/core';
import { DeviceDimensions } from '../../models/device-dimensions.interface';
import { DeviceSize } from '../../models/device-size.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cms-page-preview-modal',
  templateUrl: './page-preview-modal.component.html',
  styleUrls: ['./page-preview-modal.component.scss']
})
export class PagePreviewModalComponent implements OnInit {
  @Input() html: string;
  @Input() modalTitle?: string; // optional
  @Input() remoteCss: string; // optional
  @Input() deviceDimensions: DeviceDimensions; // optional
  @Input() initialPreview: DeviceSize; // optional

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
