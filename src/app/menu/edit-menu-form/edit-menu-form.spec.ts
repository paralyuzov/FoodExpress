import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuForm } from './edit-menu-form';

describe('EditMenuForm', () => {
  let component: EditMenuForm;
  let fixture: ComponentFixture<EditMenuForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMenuForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
