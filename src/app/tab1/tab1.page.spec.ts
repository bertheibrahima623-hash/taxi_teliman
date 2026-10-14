import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects incomplete requests and saves a valid Bamako trip', () => {
    component.requestRide();

    expect(component.formError).toContain('Indiquez un départ');
    expect(localStorage.getItem('violeta-vtc-rides')).toBeNull();

    component.destination = 'Hamdallaye, Bamako';
    component.selectVehicle('comfort');
    component.requestRide();

    const rides = JSON.parse(localStorage.getItem('violeta-vtc-rides') ?? '[]') as Array<{
      pickup: string;
      destination: string;
      price: number;
      status: string;
    }>;
    expect(component.formError).toBe('');
    expect(component.bookingMessage).toContain('4000 FCFA');
    expect(rides[0]).toMatchObject({
      pickup: 'Ma position · ACI 2000, Bamako',
      destination: 'Hamdallaye, Bamako',
      price: 4000,
      status: 'upcoming',
    });
  });

  it('adds the Sénou surcharge to the selected vehicle fare', () => {
    component.setDestination('Aéroport international Modibo Keïta-Sénou');

    expect(component.selectedVehiclePrice).toBe(6500);

    component.selectVehicle('comfort');

    expect(component.selectedVehiclePrice).toBe(8000);
  });
});
