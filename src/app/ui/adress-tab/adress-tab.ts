import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllAddresses } from '../../../store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAdressForm } from '../create-adress-form/create-adress-form';
import { Address } from '../../../models';
import { UpdateAdressForm } from '../update-adress-form/update-adress-form';

@Component({
  selector: 'app-adress-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './adress-tab.html',
  styleUrl: './adress-tab.css',
  providers: [DialogService],
})
export class AdressTab {
  private store = inject(Store);
  userAddresses = this.store.selectSignal(selectAllAddresses);
  private dialogService = inject(DialogService);

  showAddressForm() {
    this.dialogService.open(CreateAdressForm, {
      styleClass: 'bg-gradient-to-br! bg-neutral-800/5! p-8! w-xl! backdrop-blur-md!',
      closable: true,
    });
  }

  openUpdateAddressForm(address: Address) {
    this.dialogService.open(UpdateAdressForm, {
      styleClass: 'bg-gradient-to-br! bg-neutral-800/5! p-8! w-xl! backdrop-blur-md!',
      closable: true,
      data: {
        address,
      },
    });
  }
}
