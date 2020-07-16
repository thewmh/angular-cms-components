import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsConfirmModalComponent } from './confirm-modal.component';

describe('CmsConfirmModalComponent', () => {
  let component: CmsConfirmModalComponent;
  let fixture: ComponentFixture<CmsConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CmsConfirmModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
