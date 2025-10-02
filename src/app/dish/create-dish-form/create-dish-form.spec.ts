import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishForm } from './create-dish-form';

describe('CreateDishForm', () => {
  let component: CreateDishForm;
  let fixture: ComponentFixture<CreateDishForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDishForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDishForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
