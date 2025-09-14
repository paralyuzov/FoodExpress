import { Component, computed, inject, signal } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllAddresses } from '../../../store/user/user.selectors';
import { userActions, type CreateAddressRequest } from '../../../store/user/user.actions';
import {
  selectCartItems,
  selectCartState,
  selectCartTotal,
} from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-adress-form',
  imports: [SelectModule, IftaLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './adress-form.html',
  styleUrl: './adress-form.css',
})
export class AdressForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly addresses = this.store.selectSignal(selectAllAddresses);
  readonly formSubmitted = signal(false);
  readonly selectAddNewAddress = signal(false);
  readonly selectedAddressId = signal<string | null>(null);

  readonly cartItems = this.store.selectSignal(selectCartItems);
  readonly cartTotal = this.store.selectSignal(selectCartTotal);

  readonly selectedAddress = computed(() => {
    const addressId = this.selectedAddressId();
    if (!addressId) return null;
    return this.addresses().find((address) => address.id === addressId) ?? null;
  });

  readonly hasSelectedAddress = computed(() => this.selectedAddress() !== null);

  readonly addressForm: FormGroup = this.fb.group({
    country: ['BG', Validators.required],
    state: ['Sofia', Validators.required],
    city: ['Sofia', Validators.required],
    zipCode: ['1000', Validators.required],
    street: ['', Validators.required],
  });

  readonly countries = [
    { name: 'United States', code: 'US' },
    { name: 'Bulgaria', code: 'BG' },
  ];

  isInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty || this.formSubmitted()));
  }

  getErrorMessage(controlName: string): string {
    const control = this.addressForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  onAddNewAddress(): void {
    this.selectAddNewAddress.set(true);
    this.selectedAddressId.set(null);
  }

  onAddressSelect(addressId: string): void {
    this.selectedAddressId.set(addressId);
    this.selectAddNewAddress.set(false);
  }

  isAddressSelected(addressId: string): boolean {
    return this.selectedAddressId() === addressId;
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.formSubmitted.set(true);

      const addressData: CreateAddressRequest = {
        country: this.addressForm.value.country,
        state: this.addressForm.value.state,
        city: this.addressForm.value.city,
        zipCode: this.addressForm.value.zipCode,
        street: this.addressForm.value.street,
      };

      this.store.dispatch(userActions.createAddress({ address: addressData }));
      this.selectAddNewAddress.set(false);
      this.addressForm.reset({
        country: 'BG',
        state: 'Sofia',
        city: 'Sofia',
        zipCode: '1000',
        street: '',
      });
      this.formSubmitted.set(false);
    }
  }

  proceedToCheckout(): void {
    const selectedAddr = this.selectedAddress();
    const cartItems = this.cartItems();
    if (selectedAddr) {
      const orderData = {
        address: selectedAddr.id,
        items: cartItems,
      };

      console.log(orderData)

    }
  }
}
