import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRatingComponent } from './rating.component';

describe('RestaurantRatingComponent', () => {
  let component: RestaurantRatingComponent;
  let fixture: ComponentFixture<RestaurantRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
