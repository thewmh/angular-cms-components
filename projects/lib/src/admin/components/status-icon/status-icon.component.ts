import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'cms-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent implements OnInit, OnChanges {
  color: string;
  @Input() activeText = 'Live';
  @Input() inactiveText = 'Disabled';
  @Input() status = false;
  @Input() inline = false;

  constructor() {}

  ngOnInit(): void {
    this.color = this.status ? '#70D97A' : '#dc3545';
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (
      changes.status &&
      !changes.status.firstChange &&
      changes.status.previousValue !== changes.status.currentValue
    ) {
      this.ngOnInit();
    }
  }
}
