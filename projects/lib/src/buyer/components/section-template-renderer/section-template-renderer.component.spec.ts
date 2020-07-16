import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSectionTemplateRendererComponent } from './section-template-renderer.component';

describe('SectionTemplateRendererComponent', () => {
  let component: CmsSectionTemplateRendererComponent;
  let fixture: ComponentFixture<CmsSectionTemplateRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSectionTemplateRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSectionTemplateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
