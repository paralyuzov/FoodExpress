import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordForm } from './change-password-form';

describe('ChangePasswordForm', () => {
  let component: ChangePasswordForm;
  let fixture: ComponentFixture<ChangePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
