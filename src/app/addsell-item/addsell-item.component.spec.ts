import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsellItemComponent } from './addsell-item.component';

describe('AddsellItemComponent', () => {
  let component: AddsellItemComponent;
  let fixture: ComponentFixture<AddsellItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsellItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
