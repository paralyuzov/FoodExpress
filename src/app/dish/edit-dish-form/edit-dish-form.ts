import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectDishesLoading, selectSelectedDish } from '../../../store/dish/dish.selectors';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { dishActions } from '../../../store/dish/dish.actions';

@Component({
  selector: 'app-edit-dish-form',
  imports: [
    InputNumberModule,
    InputTextModule,
    FloatLabel,
    Message,
    ReactiveFormsModule,
    RadioButtonModule,
  ],
  templateUrl: './edit-dish-form.html',
  styleUrl: './edit-dish-form.css',
})
export class EditDishForm implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private selectedDish = this.store.selectSignal(selectSelectedDish);

  isLoading = this.store.selectSignal(selectDishesLoading);
  isSubmitted = signal(false);

  editDishForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
    imageUrl: ['', Validators.required],
    category: ['', Validators.required],
    isAvailable: [true],
  });

  ngOnInit(): void {
    const dishId = this.dialogConfig.data.dishId;
    if (dishId) {
      this.store.dispatch(dishActions.getDishById({ dishId }));
    }
  }

  private patchFormEffect = effect(() => {
    const dish = this.selectedDish();
    if (dish) {
      this.editDishForm.patchValue({
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageUrl: dish.imageUrl,
        category: dish.category,
        isAvailable: dish.isAvailable,
      });
    }
  });

  isInvalid(controlName: string): boolean {
    const control = this.editDishForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.editDishForm.get(controlName);
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
    return this.editDishForm.valid && !this.isSubmitted();
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.editDishForm.valid) {
      const dishId = this.dialogConfig.data.dishId;
      const menuId = this.dialogConfig.data.menuId;
      const formValue = {
        name: this.editDishForm.value.name,
        description: this.editDishForm.value.description,
        price: parseFloat(this.editDishForm.value.price),
        imageUrl: this.editDishForm.value.imageUrl,
        category: this.editDishForm.value.category,
        isAvailable: this.editDishForm.value.isAvailable,
      };
      console.log(formValue);
      this.store.dispatch(dishActions.updateDish({ dishId, menuId, dish: formValue }));
      this.dialogRef.close();
    } else {
      this.isSubmitted.set(false);
      this.editDishForm.markAllAsTouched();
    }
  }
}
