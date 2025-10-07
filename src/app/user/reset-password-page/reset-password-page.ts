import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { selectAuthLoading } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-reset-password-page',
  imports: [FloatLabel, Message, PasswordModule, ReactiveFormsModule],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.css',
})
export class ResetPasswordPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private token = signal<string | null>(null);
  private store = inject(Store);
  private router = inject(Router);
  isSubmitting = signal(false);
  isLoading = this.store.selectSignal(selectAuthLoading);

  resetPasswordForm: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    },
    { validators: this.passwordsMatchValidator.bind(this) }
  );

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParams['token'];
    this.token.set(token);
  }

  private passwordsMatchValidator(group: AbstractControl) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.resetPasswordForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.resetPasswordForm.get(controlName);
    if (!control?.errors) return '';

    if (control.errors['required']) return 'This field is required.';
    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Minimum length is ${required} characters.`;
    }
    return '';
  }

  getFormError(): string {
    return this.resetPasswordForm.errors?.['passwordMismatch'] ? 'Passwords do not match.' : '';
  }

  hasPasswordMismatch(): boolean {
    return !!(
      this.resetPasswordForm.errors?.['passwordMismatch'] &&
      this.resetPasswordForm.get('confirmNewPassword')?.touched
    );
  }

  canSubmit(): boolean {
    return this.resetPasswordForm.valid && !this.isSubmitting() && !!this.token();
  }

  onSubmit(): void {
    this.isSubmitting.set(true);
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmNewPassword } = this.resetPasswordForm.value;
      const token = this.token();
      if (token) {
        this.store.dispatch(AuthActions.resetPassword({ token, newPassword, confirmNewPassword }));
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
      this.isSubmitting.set(false);
    }
  }
}
