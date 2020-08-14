import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-asset-upload',
  templateUrl: './asset-upload.component.html',
  styleUrls: ['./asset-upload.component.scss']
})
export class AssetUploadComponent implements OnInit {
  @Input() assetType;
  @Input() resourceType: 'Products' | 'Categories' | 'Catalogs' | 'Promotions' | 'Suppliers' | 'Buyers' | 'ProductFacets';
  @Input() resourceID: string;
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
