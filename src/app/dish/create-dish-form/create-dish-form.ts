import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { selectDishesLoading } from '../../../store/dish/dish.selectors';
import { RadioButtonModule } from 'primeng/radiobutton';
import { dishActions } from '../../../store/dish/dish.actions';


@Component({
  selector: 'app-create-dish-form',
  imports: [ReactiveFormsModule, InputNumberModule, InputTextModule, FloatLabel, Message, RadioButtonModule],
  templateUrl: './create-dish-form.html',
  styleUrl: './create-dish-form.css',
})
export class CreateDishForm {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  isLoading = this.store.selectSignal(selectDishesLoading);
  isSubmitted = signal(false);

  createDishForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
    imageUrl: ['', Validators.required],
    category: ['', Validators.required],
    isAvailable: [true],
  });

  isInvalid(controlName: string): boolean {
    const control = this.createDishForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.createDishForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Minimum length is ${requiredLength} characters`;
      }

      if (control.errors['min']) {
        const min = control.errors['min'].min;
        return `Value must be at least ${min}`;
      }

       if (control.errors['max']) {
        const max = control.errors['max'].max;
        return `Value must be at most ${max}`;
      }
    }
    return '';
  }

  canSubmit(): boolean {
    return this.createDishForm.valid && !this.isSubmitted();
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.createDishForm.valid) {
      const menuId = this.dialogConfig.data.id;
      const formValue = {
        name: this.createDishForm.value.name,
        description: this.createDishForm.value.description,
        price: parseFloat(this.createDishForm.value.price),
        imageUrl: this.createDishForm.value.imageUrl,
        category: this.createDishForm.value.category,
        isAvailable: this.createDishForm.value.isAvailable,
      };
      this.store.dispatch(dishActions.createDish({ menuId, dish: formValue }));
      this.dialogRef.close();
    } else {
      this.isSubmitted.set(false);
      this.createDishForm.markAllAsTouched();
    }
  }
}
