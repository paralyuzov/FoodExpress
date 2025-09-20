import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdressForm } from './create-adress-form';

describe('CreateAdressForm', () => {
  let component: CreateAdressForm;
  let fixture: ComponentFixture<CreateAdressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdressForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdressForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
