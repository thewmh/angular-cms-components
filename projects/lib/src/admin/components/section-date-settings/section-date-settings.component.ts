import { Component, OnInit, NgZone, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cms-section-date-settings',
  templateUrl: './section-date-settings.component.html',
  styleUrls: ['./section-date-settings.component.scss']
})
export class SectionDateSettingsComponent implements OnInit {
  @Input() data: any;
  startDate: string;
  endDate: string;
  constructor(public modal: NgbActiveModal, public zone: NgZone) {}

  ngOnInit(): void {
    this.startDate = this.data.startDate;
    this.endDate = this.data.endDate;
  }

  submit() {
    this.modal.close({ startDate: this.startDate, endDate: this.endDate });
  }
}
