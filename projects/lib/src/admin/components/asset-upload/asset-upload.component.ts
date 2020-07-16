import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-asset-upload',
  templateUrl: './asset-upload.component.html',
  styleUrls: ['./asset-upload.component.scss']
})
export class CmsAssetUploadComponent implements OnInit {
  @Input() assetType;
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
