import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Store } from '@ngrx/store';
import { selectRestaurantLoading } from '../../../store/restaurant/restaurant.selectors';
import { RadioButtonModule } from 'primeng/radiobutton';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-create-restaurant-form',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, Message, RadioButtonModule],
  templateUrl: './create-restaurant-form.html',
  styleUrl: './create-restaurant-form.css'
})
export class CreateRestaurantForm {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef)
  isLoading = this.store.selectSignal(selectRestaurantLoading);
  isSubmitted = signal(false);

  createRestaurantForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(2)]],
    description: ['',[Validators.required, Validators.minLength(10)]],
    email: ['',[Validators.required, Validators.email]],
    address: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    imageUrl: ['',[Validators.required]],
    isActive: [true],
  })


  isInvalid(controlName: string): boolean {
    const control = this.createRestaurantForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.createRestaurantForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Minimum length is ${requiredLength} characters`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }

  canSubmit(): boolean {
    return this.createRestaurantForm.valid && !this.isSubmitted();
  }

  onSubmit(): void {
    this.isSubmitted.set(true);
    if (this.createRestaurantForm.valid) {
      const formData = this.createRestaurantForm.value;
      this.store.dispatch(restaurantAction.createRestaurant({ restaurant: formData }));
      this.dialogRef.close();
    } else {
      this.createRestaurantForm.markAllAsTouched();
    }
    this.isSubmitted.set(false);
  }

}
