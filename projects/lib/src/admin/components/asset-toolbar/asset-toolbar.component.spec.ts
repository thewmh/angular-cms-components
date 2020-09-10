import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetToolbarComponent } from './asset-toolbar.component';

describe('AssetToolbarComponent', () => {
  let component: AssetToolbarComponent;
  let fixture: ComponentFixture<AssetToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
