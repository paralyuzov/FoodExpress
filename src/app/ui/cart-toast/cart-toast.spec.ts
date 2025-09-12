import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartToast } from './cart-toast';

describe('CartToast', () => {
  let component: CartToast;
  let fixture: ComponentFixture<CartToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartToast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
