import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSectionPickerComponent } from './section-picker.component';

describe('CmsSectionPickerComponent', () => {
  let component: CmsSectionPickerComponent;
  let fixture: ComponentFixture<CmsSectionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSectionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSectionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
