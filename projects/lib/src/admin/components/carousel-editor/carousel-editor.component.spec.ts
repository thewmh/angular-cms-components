import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsCarouselEditorComponent } from './carousel-editor.component';

describe('CmsCarouselEditorComponent', () => {
  let component: CmsCarouselEditorComponent;
  let fixture: ComponentFixture<CmsCarouselEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsCarouselEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCarouselEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
