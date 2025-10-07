import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  imports: [InputTextModule, FloatLabel, Message, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  isSubmitting = signal(false);
  isLoading = this.store.selectSignal(selectAuthLoading);

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isInvalid(controlName: string): boolean {
    const control = this.forgotPasswordForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.forgotPasswordForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  canSubmit(): boolean {
    return this.forgotPasswordForm.valid && !this.isSubmitting();
  }

  onSubmit() {
    this.isSubmitting.set(true);
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.store.dispatch(AuthActions.forgotPassword({ email }));
    } else {
      this.isSubmitting.set(false);
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
