import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAssetSearchComponent } from './asset-search.component';

describe('CmsAssetSearchComponent', () => {
  let component: CmsAssetSearchComponent;
  let fixture: ComponentFixture<CmsAssetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAssetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAssetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});