import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cms-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit {
  color: string;
  @Input() status: 'active' | 'disabled'

  constructor() { }

  ngOnInit(): void {
    this.color = this.status === 'active' ? '#70D97A': '#dc3545'
  }

}
