import {
  Component,
  NgZone,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  SimpleChanges,
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
  sectionTemplates?: string[];
  selectedTemplateIndex: number;
  previewWidth = 1024;
  previewTransformRatio = 1;
  debounceTimeout: any;
  constructor(public modal: NgbActiveModal, public zone: NgZone) {}

  async ngOnInit(): Promise<void> {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    if (this.data.getSectionTemplates) {
      this.sectionTemplates = await this.data.getSectionTemplates();
    } else {
      this.sectionTemplates = sectionPickerMock;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (
      changes.data &&
      !changes.data.firstChange &&
      changes.data.currentValue.getSectionTemplates !==
        changes.data.previousValue.getSectionTemplates
    ) {
      this.ngOnInit();
    }
  }

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
