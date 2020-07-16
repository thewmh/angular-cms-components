import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHtmlEditorComponent } from './html-editor.component';

describe('CmsHtmlEditorComponent', () => {
  let component: CmsHtmlEditorComponent;
  let fixture: ComponentFixture<CmsHtmlEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsHtmlEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
