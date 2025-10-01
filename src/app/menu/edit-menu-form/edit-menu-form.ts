import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { selectMenusLoading, selectSelectedMenu } from '../../../store/menus/menu.selectors';
import { menusAction } from '../../../store/menus/menus.actions';

@Component({
  selector: 'app-edit-menu-form',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabel, Message, RadioButtonModule],
  templateUrl: './edit-menu-form.html',
  styleUrl: './edit-menu-form.css',
})
export class EditMenuForm implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private selectedMenu = this.store.selectSignal(selectSelectedMenu);

  isSubmitted = signal(false);
  isLoading = this.store.selectSignal(selectMenusLoading);

  editMenuForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    isActive: [true],
  });

  private readonly populateFormEffect = effect(() => {
    const menu = this.selectedMenu();
    if (menu) {
      this.editMenuForm.patchValue({
        name: menu.name,
        description: menu.description,
        isActive: menu.isActive,
      });
    }
  });

  ngOnInit(): void {
      const menuId = this.dialogConfig.data.id;
      this.store.dispatch(menusAction.getMenuById({menuId}));
  }

  canSubmit(): boolean {
    return this.editMenuForm.valid && !this.isLoading();
  }

  isInvalid(controlName: string): boolean {
    const control = this.editMenuForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.editMenuForm.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.editMenuForm.valid) {
      const formData = this.editMenuForm.value;
      const menuId = this.dialogConfig.data.id;
      this.store.dispatch(menusAction.updateMenu({ menuId, menu: formData }));
      this.dialogRef.close();
    } else {
      this.editMenuForm.markAllAsTouched();
    }
  }

}
