import { Component, OnInit, Input } from '@angular/core';
import DEFAULT_ASSET_TYPES, {
  ASSET_TYPES,
} from '../../../constants/asset-types.constants';

@Component({
  selector: 'cms-asset-filters',
  templateUrl: './asset-filters.component.html',
  styleUrls: ['./asset-filters.component.scss'],
})
export class AssetFiltersComponent implements OnInit {
  @Input() types: ASSET_TYPES[] = DEFAULT_ASSET_TYPES;
  @Input() tags?: string[];
  constructor() {}

  ngOnInit(): void {}
}
