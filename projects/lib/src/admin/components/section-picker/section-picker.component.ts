import {
  Component,
  NgZone,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import sectionPickerMock from './section-picker.mock';

@Component({
  selector: 'cms-section-picker',
  templateUrl: './section-picker.component.html',
  styleUrls: ['./section-picker.component.scss'],
})
export class SectionPickerComponent implements AfterViewChecked {
  @ViewChild('list', { read: ElementRef })
  listElement: ElementRef<HTMLDivElement>;
  @Input() data: any;
  sectionTemplates = sectionPickerMock;
  selectedTemplateIndex: number;
  previewWidth = 1024;
  previewTransformRatio = 1;
  debounceTimeout: any;
  constructor(public modal: NgbActiveModal, public zone: NgZone) {}

  ngAfterViewChecked(): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // TODO: this seems like it's getting hit way more than it should.

    this.debounceTimeout = setTimeout(() => {
      const transformRatio = this.determineTransformRatio();
      if (this.previewTransformRatio !== transformRatio) {
        this.previewTransformRatio = transformRatio;
      }
    }, 100);
  }

  determineTransformRatio() {
    if (this.listElement && this.listElement.nativeElement) {
      return this.listElement.nativeElement.clientWidth / this.previewWidth;
    }
    return 1;
  }

  handleSelectTemplate(index) {
    this.selectedTemplateIndex = index;
  }

  submit() {
    this.modal.close(this.sectionTemplates[this.selectedTemplateIndex]);
  }
}
