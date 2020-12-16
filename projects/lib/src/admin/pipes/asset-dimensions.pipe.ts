import { Pipe, PipeTransform } from '@angular/core';
import { AssetMetadata } from '@ordercloud/cms-sdk'

@Pipe({
  name: 'assetDimensions',
})
export class AssetDimensionsPipe implements PipeTransform {
  transform(meta: AssetMetadata): string {
    if (!meta || !(meta.ImageWidth && meta.ImageHeight)) {
      return '---';
    }
    return `${meta.ImageWidth} x ${meta.ImageHeight} px`;
  }
}
