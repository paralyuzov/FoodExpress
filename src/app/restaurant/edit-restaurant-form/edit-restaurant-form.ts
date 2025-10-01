import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectRestaurantLoading,
  selectSelectedRestaurant,
} from '../../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-edit-restaurant-form',
  imports: [InputTextModule, FloatLabel, Message, RadioButtonModule, ReactiveFormsModule],
  templateUrl: './edit-restaurant-form.html',
  styleUrl: './edit-restaurant-form.css',
})
export class EditRestaurantForm implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private selectedRestaurant = this.store.selectSignal(selectSelectedRestaurant);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  isSubmitted = signal(false);
  isLoading = this.store.selectSignal(selectRestaurantLoading);

  editRestaurantForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    imageUrl: ['', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    const restaurantId = this.dialogConfig.data.id as string;
    if (restaurantId) {
      this.store.dispatch(restaurantAction.loadSelectedRestaurantDetails({ id: restaurantId }));
    }
  }

  private readonly populateFormEffect = effect(() => {
    const restaurant = this.selectedRestaurant();
    if (restaurant) {
      this.editRestaurantForm.patchValue({
        name: restaurant.name,
        description: restaurant.description,
        email: restaurant.email,
        address: restaurant.address,
        phone: restaurant.phone,
        imageUrl: restaurant.imageUrl,
        isActive: restaurant.isActive,
      });
    }
  });

  isInvalid(controlName: string): boolean {
    const control = this.editRestaurantForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.editRestaurantForm.get(controlName);
    if (control) {
      if (control.hasError('required')) {
        return 'This field is required';
      }
      if (control.hasError('minlength')) {
        return `Minimum length is ${control.getError('minlength').requiredLength} characters`;
      }
      if (control.hasError('email')) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  canSubmit(): boolean {
    return this.editRestaurantForm.valid && !this.isSubmitted() && !this.isLoading();
  }

  onSubmit(): void {
    this.isSubmitted.set(true);
    if(this.editRestaurantForm.valid && this.selectedRestaurant()) {
      const formData = this.editRestaurantForm.value;
      const restaurantId = this.selectedRestaurant()!.id;
      this.store.dispatch(restaurantAction.updateRestaurant({ restaurantId, restaurant: formData }));
      this.dialogRef.close();
    } else {
      this.editRestaurantForm.markAllAsTouched();
    }
    this.isSubmitted.set(false);
  }
}
