import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { selectAuthLoading } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule, FloatLabel, Message, PasswordModule],
  templateUrl: './change-password-form.html',
  styleUrl: './change-password-form.css',
})
export class ChangePasswordForm {
  fb = inject(FormBuilder);
  isSubmitted = signal(false);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);

  isLoading = this.store.selectSignal(selectAuthLoading);

  changePasswordForm: FormGroup = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    },
    {
      validators: this.passwordsMatch.bind(this),
    }
  );

  private passwordsMatch(group: AbstractControl) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { passwordsMismatch: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.changePasswordForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty || this.isSubmitted()));
  }

  hasPasswordMismatch(): boolean {
    return !!(
      this.changePasswordForm.errors?.['passwordsMismatch'] &&
      this.changePasswordForm.get('confirmNewPassword')?.touched
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.changePasswordForm.get(controlName);
    if (!control?.errors) return '';
    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }
    if (
      controlName === 'confirmNewPassword' &&
      this.changePasswordForm.errors?.['passwordsMismatch']
    ) {
      return 'Passwords do not match';
    }
    return '';
  }

   getFormError(): string {
    return this.changePasswordForm.errors?.['passwordsMismatch'] ? 'Passwords do not match.' : '';
  }

  canSubmit(): boolean {
    return this.changePasswordForm.valid && !this.isLoading() && !this.isSubmitted();
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;
      this.store.dispatch(
        AuthActions.changePassword({ currentPassword, newPassword, confirmNewPassword })
      );
      this.dialogRef.close();
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
