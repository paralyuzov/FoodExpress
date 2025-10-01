import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantForm } from './edit-restaurant-form';

describe('EditRestaurantForm', () => {
  let component: EditRestaurantForm;
  let fixture: ComponentFixture<EditRestaurantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRestaurantForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRestaurantForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
