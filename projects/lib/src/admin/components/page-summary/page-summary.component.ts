import { Component, OnInit, Input } from '@angular/core';
import { JDocument } from '@ordercloud/headstart-sdk';

@Component({
  selector: 'cms-page-summary',
  templateUrl: './page-summary.component.html',
  styleUrls: ['./page-summary.component.scss'],
})
export class PageSummaryComponent {
  @Input() document: JDocument;
  @Input() renderSiteUrl: string;
  constructor() {}
}
