import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDishForm } from './edit-dish-form';

describe('EditDishForm', () => {
  let component: EditDishForm;
  let fixture: ComponentFixture<EditDishForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDishForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDishForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
