import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAssetListComponent } from './asset-list.component';

describe('CmsAssetListComponent', () => {
  let component: CmsAssetListComponent;
  let fixture: ComponentFixture<CmsAssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
