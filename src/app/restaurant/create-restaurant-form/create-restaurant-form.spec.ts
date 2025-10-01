import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantForm } from './create-restaurant-form';

describe('CreateRestaurantForm', () => {
  let component: CreateRestaurantForm;
  let fixture: ComponentFixture<CreateRestaurantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRestaurantForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
