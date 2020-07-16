import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSectionDateSettingsComponent } from './section-date-settings.component';

describe('CmsSectionDateSettingsComponent', () => {
  let component: CmsSectionDateSettingsComponent;
  let fixture: ComponentFixture<CmsSectionDateSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSectionDateSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSectionDateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
