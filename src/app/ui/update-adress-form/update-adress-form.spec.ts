import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdressForm } from './update-adress-form';

describe('UpdateAdressForm', () => {
  let component: UpdateAdressForm;
  let fixture: ComponentFixture<UpdateAdressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdressForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdressForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
