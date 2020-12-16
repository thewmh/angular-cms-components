import { Component, Input } from '@angular/core';
import { JDocument } from '@ordercloud/cms-sdk'

@Component({
  selector: 'cms-page-summary',
  templateUrl: './page-summary.component.html',
  styleUrls: ['./page-summary.component.scss'],
})
export class PageSummaryComponent {
  @Input() document: JDocument;
  @Input() renderSiteUrl?: string; // optional
  constructor() {}
}
