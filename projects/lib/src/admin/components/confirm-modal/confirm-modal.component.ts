import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class CmsConfirmModalComponent {
  @Input()
  confirmText?: string;

  @Input()
  cancelText?: string;

  @Input()
  message?: string;

  @Output()
  proceed = new EventEmitter();

  @Output()
  cancel = new EventEmitter();
}
