import { Component, inject, signal, effect } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Store } from '@ngrx/store';
import {
  selectAuthLoading,
  selectAuthError,
  selectAuthMessage,
} from '../../../store/auth/auth.selectors';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthActions } from '../../../store/auth/auth.actions';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, Message, RouterModule, ToastModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  providers: [MessageService],
})
export class RegisterForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);

  readonly formSubmitted = signal(false);
  readonly registrationSuccess = signal(false);
  readonly successMessage = signal('');

  readonly isLoading = this.store.selectSignal(selectAuthLoading);
  readonly authError = this.store.selectSignal(selectAuthError);
  readonly message = this.store.selectSignal(selectAuthMessage);

  canSubmit() {
    return this.registerForm.valid && !this.formSubmitted() && !this.isLoading();
  }

  private readonly registrationStateEffect = effect(() => {
    const message = this.message();
    const error = this.authError();

    if (message) {
      this.registrationSuccess.set(true);
      this.successMessage.set(message);

      this.messageService.add({
        severity: 'success',
        summary: 'Registration Successful!',
        detail: message,
        life: 5000,
      });

      setTimeout(() => {
        this.registerForm.reset();
        this.formSubmitted.set(false);
        this.registrationSuccess.set(false);
        this.store.dispatch(AuthActions.clearAuthError());
      }, 1000);
    }

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Failed',
        detail: error,
        life: 5000,
      });
      this.formSubmitted.set(false);
    }
  });

  registerForm: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator.bind(this) }
  );

  private passwordsMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty || this.formSubmitted()));
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control?.errors) return '';

    if (control.errors['required']) return 'This field is required.';
    if (control.errors['email']) return 'Enter a valid email address.';
    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Minimum length is ${required} characters.`;
    }
    return '';
  }

  getFormError(): string {
    return this.registerForm.errors?.['passwordMismatch'] ? 'Passwords do not match.' : '';
  }

  hasPasswordMismatch(): boolean {
    return !!(
      this.registerForm.errors?.['passwordMismatch'] &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.formSubmitted.set(true);
      this.store.dispatch(AuthActions.register(this.registerForm.value));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
