import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectProfileLoading, selectUserProfile } from '../../../store/user/user.selectors';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { userActions } from '../../../store/user/user.actions';
import { User } from '../../../models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-user-form',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, Message],
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.css',
})
export class EditUserForm implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  isSubmitted = signal(false);
  private dialogRef = inject(DynamicDialogRef)

  user = this.store.selectSignal(selectUserProfile);
  isLoading = this.store.selectSignal(selectProfileLoading);

  editUserForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const user = this.user();
    if (user) {
      this.editUserForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.editUserForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  canSubmit(): boolean {
    return this.editUserForm.valid && !this.isSubmitted() && !this.isLoading();
  }

  getErrorMessage(controlName: string): string {
    const control = this.editUserForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Minimum length is ${requiredLength} characters`;
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.canSubmit()) {
      this.isSubmitted.set(true);
      const formValue = this.editUserForm.getRawValue();
      const profile = formValue as Partial<User>;
      this.store.dispatch(userActions.updateProfile({ profile }));
      this.dialogRef.close();
    }
  }
}
