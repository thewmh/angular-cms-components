import { Component, OnInit, Input } from '@angular/core';
import { WidgetService } from 'projects/lib/src/shared/services/widget.service';

@Component({
  selector: 'cms-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss']
})
export class PageRendererComponent implements OnInit {
  @Input() page: string;
  pageContent: string;

  constructor(
    private widgetService: WidgetService
  ) { }

  ngOnInit(): void {
    this.pageContent = this.widgetService.applyDateRules(this.page);
  }
}
