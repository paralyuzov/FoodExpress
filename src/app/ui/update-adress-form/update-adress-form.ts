import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address } from '../../../models';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { CreateAddressRequest, userActions } from '../../../store/user/user.actions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-adress-form',
  imports: [
    SelectModule,
    IftaLabelModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-adress-form.html',
  styleUrl: './update-adress-form.css',
})
export class UpdateAdressForm {
  private dialogConfig = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private messageService = inject(MessageService);
  isSubmitted = signal(false);

  private address = signal<Address>(this.dialogConfig.data.address);

  updateFormAddress: FormGroup = this.fb.group({
    country: [this.address().country, Validators.required],
    state: [this.address().state, Validators.required],
    street: [this.address().street, Validators.required],
    city: [this.address().city, Validators.required],
    zipCode: [this.address().zipCode, Validators.required],
  });

  readonly countries = [
    { name: 'United States', code: 'US' },
    { name: 'Bulgaria', code: 'BG' },
  ];

  isInvalid(controlName: string): boolean {
    const control = this.updateFormAddress.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.updateFormAddress.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  onSubmit() {
   if (this.updateFormAddress.valid) {
         this.isSubmitted.set(true);
         const addressData: CreateAddressRequest = {
           country: this.updateFormAddress.value.country,
           state: this.updateFormAddress.value.state,
           city: this.updateFormAddress.value.city,
           zipCode: this.updateFormAddress.value.zipCode,
           street: this.updateFormAddress.value.street,
         };

         this.store.dispatch(userActions.updateAddress({ addressId: this.address().id, address: addressData }));
         this.messageService.add({
           severity: 'success',
           summary: 'Address Updated',
           detail: 'The address has been updated successfully.',
           life: 3000,
         });
         this.dialogRef.close();
       }
  }
}
