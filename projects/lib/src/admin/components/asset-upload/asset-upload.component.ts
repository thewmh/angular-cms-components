import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceType } from '../../../shared/models/resource-type.interface';

@Component({
  selector: 'cms-asset-upload',
  templateUrl: './asset-upload.component.html',
  styleUrls: ['./asset-upload.component.scss']
})
export class AssetUploadComponent {
  @Input() assetType;
  @Input() resourceType?: ResourceType = null;
  @Input() resourceID?: string = null;
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();
}
