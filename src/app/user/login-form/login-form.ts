import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ForgotPassword } from '../forgot-password/forgot-password';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FloatLabel,
    Message,
    RouterModule,
  ],
  templateUrl: './login-form.html',
  providers: [DialogService],
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  formSubmitted = signal<boolean>(false);

  isLoading = this.store.selectSignal(selectAuthLoading);
  authError = this.store.selectSignal(selectAuthError);
  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  readonly loginStateEffect = effect(() => {
    const error = this.authError();
    const isAuth = this.isAuthenticated();
    if (error) {
      this.formSubmitted.set(false);

      setTimeout(() => {
        this.loginForm.reset();
        this.formSubmitted.set(false);
        this.store.dispatch(AuthActions.clearAuthError());
      }, 3000);
    }

    if (isAuth) {
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

  onForgotPassword() {
    this.dialogService.open(ForgotPassword, {
      header: 'Forgot Password',
      styleClass: 'bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      focusOnShow: false,
    });
  }
}
