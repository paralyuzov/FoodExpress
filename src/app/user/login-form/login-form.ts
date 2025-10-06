import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, FloatLabel, Message, ToastModule, RouterModule],
  templateUrl: './login-form.html',
  providers:[MessageService]
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private messageService = inject(MessageService);
  private router = inject(Router)

  formSubmitted = signal<boolean>(false);

  isLoading = this.store.selectSignal(selectAuthLoading);
  authError = this.store.selectSignal(selectAuthError);
  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  readonly loginStateEffect = effect(() => {
    const error = this.authError();
    const isAuth = this.isAuthenticated();
    if (error) {
      this.formSubmitted.set(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: error,
        life: 5000,
      });

      setTimeout(() => {
        this.loginForm.reset();
        this.formSubmitted.set(false);
        this.store.dispatch(AuthActions.clearAuthError());
      }, 1000);
    }

    if(isAuth) {
      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'You have been logged in successfully.',
        life: 3000,
      });
      this.router.navigate(['/']);
    }
  });

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty || this.formSubmitted());
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (!control) return '';
    if (control.errors?.['required']) return 'This field is required.';
    if (control.errors?.['email']) return 'Enter a valid email address.';
    if (control.errors?.['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Minimum length is ${required} characters.`;
    }
    return '';
  }

  canSubmit() {
    return this.loginForm.valid && !this.formSubmitted() && !this.isLoading();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.formSubmitted.set(true);
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
