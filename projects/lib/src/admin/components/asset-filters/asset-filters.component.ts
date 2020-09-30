import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import DEFAULT_ASSET_TYPES, {
  ASSET_TYPES,
} from '../../constants/asset-types.constants';

export interface CmsAssetFilterSelections {
  types: {
    [key: string]: boolean;
  };
  tags: {
    [key: string]: boolean;
  };
}

@Component({
  selector: 'cms-asset-filters',
  templateUrl: './asset-filters.component.html',
  styleUrls: ['./asset-filters.component.scss'],
})
export class AssetFiltersComponent {
  @Input() additionalFilters?: TemplateRef<any>;
  @Input() types: ASSET_TYPES[] = DEFAULT_ASSET_TYPES;
  @Input() tags?: string[];
  @Input() selections?: CmsAssetFilterSelections = {
    types: {},
    tags: {},
  };
  @Output() selectionsChange = new EventEmitter<CmsAssetFilterSelections>();

  constructor() {}

  handleSelectionChange(filterType: string, key: string, value: boolean) {
    this.selectionsChange.emit({
      ...this.selections,
      [filterType]: {
        ...this.selections[filterType],
        [key]: value,
      },
    });
  }
}
