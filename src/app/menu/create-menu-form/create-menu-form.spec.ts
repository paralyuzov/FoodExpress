import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuForm } from './create-menu-form';

describe('CreateMenuForm', () => {
  let component: CreateMenuForm;
  let fixture: ComponentFixture<CreateMenuForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMenuForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
