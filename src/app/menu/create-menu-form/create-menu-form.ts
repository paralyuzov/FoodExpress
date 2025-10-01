import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectMenusLoading } from '../../../store/menus/menu.selectors';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { menusAction } from '../../../store/menus/menus.actions';

@Component({
  selector: 'app-create-menu-form',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, Message, RadioButtonModule],
  templateUrl: './create-menu-form.html',
  styleUrl: './create-menu-form.css',
})
export class CreateMenuForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);

  isSubmitted = signal(false);
  isLoading = this.store.selectSignal(selectMenusLoading);

  createMenuForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    isActive: [true],
  });

  isInvalid(controlName: string): boolean {
    const control = this.createMenuForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.createMenuForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
    }
    return '';
  }

  canSubmit(): boolean {
    return this.createMenuForm.valid && !this.isLoading();
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.createMenuForm.valid) {
      const restaurantId = this.dialogConfig.data.id;
      const formValue = this.createMenuForm.value;
      this.store.dispatch(menusAction.createMenu({ restaurantId, menu: formValue }));
      this.dialogRef.close();
    } else {
      this.isSubmitted.set(false);
      this.createMenuForm.markAllAsTouched();
    }
  }
}
