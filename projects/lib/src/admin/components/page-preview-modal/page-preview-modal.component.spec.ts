import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreviewModalComponent } from './page-preview-modal.component';

describe('PagePreviewModalComponent', () => {
  let component: PagePreviewModalComponent;
  let fixture: ComponentFixture<PagePreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
