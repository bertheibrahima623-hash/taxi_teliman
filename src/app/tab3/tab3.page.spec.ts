import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('persists profile and preferences across reloads', () => {
    component.firstName = 'Mina';
    component.lastName = 'Diallo';
    component.email = 'mina@example.com';
    component.saveProfile();
    component.notificationsEnabled = false;
    component.setPayment('mastercard');
    component.savePreferences();
    component.toggleFavorite();

    const reloaded = new Tab3Page();

    expect(reloaded.firstName).toBe('Mina');
    expect(reloaded.lastName).toBe('Diallo');
    expect(reloaded.email).toBe('mina@example.com');
    expect(reloaded.notificationsEnabled).toBe(false);
    expect(reloaded.selectedPayment).toBe('mastercard');
    expect(reloaded.favoriteAddress).toContain('Bureau');
  });
});
