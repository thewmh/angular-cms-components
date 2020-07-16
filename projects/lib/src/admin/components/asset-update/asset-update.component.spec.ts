import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAssetUpdateComponent } from './asset-update.component';

describe('CmsAssetUpdateComponent', () => {
  let component: CmsAssetUpdateComponent;
  let fixture: ComponentFixture<CmsAssetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAssetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAssetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
