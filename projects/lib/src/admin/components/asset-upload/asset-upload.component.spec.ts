import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAssetUploadComponent } from './asset-upload.component';

describe('CmsAssetUploadComponent', () => {
  let component: CmsAssetUploadComponent;
  let fixture: ComponentFixture<CmsAssetUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAssetUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAssetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
