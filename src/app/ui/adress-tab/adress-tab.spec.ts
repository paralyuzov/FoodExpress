import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressTab } from './adress-tab';

describe('AdressTab', () => {
  let component: AdressTab;
  let fixture: ComponentFixture<AdressTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdressTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
