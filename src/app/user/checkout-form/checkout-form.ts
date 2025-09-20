import { Component, computed, inject, signal, effect } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllAddresses } from '../../../store/user/user.selectors';
import { userActions, type CreateAddressRequest } from '../../../store/user/user.actions';
import { selectCartItems, selectCartTotal } from '../../../store/cart/cart.selectors';
import { orderActions } from '../../../store/orders/order.actions';
import { selectCheckoutUrl, selectOrderError } from '../../../store/orders/order.selectors';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-checkout-form',
  imports: [SelectModule, IftaLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
  providers: [DialogService],
})
export class CheckoutForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly addresses = this.store.selectSignal(selectAllAddresses);
  readonly formSubmitted = signal(false);
  readonly selectAddNewAddress = signal(false);
  readonly selectedAddressId = signal<string | null>(null);

  readonly cartItems = this.store.selectSignal(selectCartItems);
  readonly cartTotal = this.store.selectSignal(selectCartTotal);
  readonly checkoutUrl = this.store.selectSignal(selectCheckoutUrl);
  readonly orderError = this.store.selectSignal(selectOrderError);

  private dialogService = inject(DialogService);
  private dialogRef = inject(DynamicDialogRef);

  private readonly checkoutEffect = effect(() => {
    const url = this.checkoutUrl();
    if (url) {
      this.openCheckoutWindow(url);
    }
  });
  readonly checkout_url = this.store.selectSignal(selectCheckoutUrl);

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
        addressId: selectedAddr.id,
        items: cartItems,
      };

      this.store.dispatch(orderActions.createOrder({ order: orderData }));
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private openCheckoutWindow(checkoutUrl: string): void {
    try {
      // window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Failed to open checkout window:', error);
      window.location.href = checkoutUrl;
    }
  }
}
