import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAssetPickerComponent } from './asset-picker.component';

describe('CmsAssetPickerComponent', () => {
  let component: CmsAssetPickerComponent;
  let fixture: ComponentFixture<CmsAssetPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAssetPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAssetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
