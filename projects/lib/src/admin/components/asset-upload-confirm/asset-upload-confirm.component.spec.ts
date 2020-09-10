import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetUploadConfirmComponent } from './asset-upload-confirm.component';

describe('AssetUploadConfirmComponent', () => {
  let component: AssetUploadConfirmComponent;
  let fixture: ComponentFixture<AssetUploadConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetUploadConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetUploadConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
