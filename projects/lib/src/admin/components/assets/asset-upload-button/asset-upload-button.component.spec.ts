import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetUploadButtonComponent } from './asset-upload-button.component';

describe('AssetUploadButtonComponent', () => {
  let component: AssetUploadButtonComponent;
  let fixture: ComponentFixture<AssetUploadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetUploadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
