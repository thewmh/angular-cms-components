import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTemplateRendererComponent } from './section-template-renderer.component';

describe('SectionTemplateRendererComponent', () => {
  let component: SectionTemplateRendererComponent;
  let fixture: ComponentFixture<SectionTemplateRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTemplateRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTemplateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
