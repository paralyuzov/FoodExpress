import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestaurantTable } from './admin-restaurant-table';

describe('AdminRestaurantTable', () => {
  let component: AdminRestaurantTable;
  let fixture: ComponentFixture<AdminRestaurantTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
