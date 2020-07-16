import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPageEditorComponent } from './page-editor.component';

describe('CmsPageEditorComponent', () => {
  let component: CmsPageEditorComponent;
  let fixture: ComponentFixture<CmsPageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsPageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
