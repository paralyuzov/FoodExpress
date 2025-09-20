import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { CreateAddressRequest, userActions } from '../../../store/user/user.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-adress-form',
  imports: [SelectModule, IftaLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './create-adress-form.html',
  styleUrl: './create-adress-form.css',
})
export class CreateAdressForm {
  private fb = inject(FormBuilder);
  isSubmitted = signal(false);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);
  private messageService = inject(MessageService)

  addressForm: FormGroup = this.fb.group({
    country: ['BG', Validators.required],
    state: ['Sofia', Validators.required],
    city: ['Sofia', Validators.required],
    street: ['', Validators.required],
    zipCode: ['1000', Validators.required],
  });

  readonly countries = [
    { name: 'United States', code: 'US' },
    { name: 'Bulgaria', code: 'BG' },
  ];

  isInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.addressForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }
  onSubmit() {
    if (this.addressForm.valid) {
      this.isSubmitted.set(true);
      const addressData: CreateAddressRequest = {
        country: this.addressForm.value.country,
        state: this.addressForm.value.state,
        city: this.addressForm.value.city,
        zipCode: this.addressForm.value.zipCode,
        street: this.addressForm.value.street,
      };

      this.store.dispatch(userActions.createAddress({ address: addressData }));
      this.messageService.add({
        severity: 'success',
        summary: 'Address Created',
        detail: 'The new address has been created successfully.',
        life: 3000,
      });
      this.dialogRef.close();
    }
  }
}
