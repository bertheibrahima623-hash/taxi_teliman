import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  arrowForwardOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  chatbubbleEllipsesOutline,
  closeOutline,
  createOutline,
  locationOutline,
  notificationsOutline,
  sparklesOutline,
} from 'ionicons/icons';

interface PaymentOption {
  id: string;
  brand: 'visa' | 'mastercard';
  name: string;
  details: string;
}

interface AccountSettings {
  firstName: string;
  lastName: string;
  email: string;
  notificationsEnabled: boolean;
  selectedPayment: string;
  favoriteAddress: string;
}

const ACCOUNT_STORAGE_KEY = 'violeta-vtc-account';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  imports: [FormsModule, IonContent, IonIcon],
})
export class Tab3Page {
  firstName = 'Kairo';
  lastName = 'Fovere';
  email = 'kairo.fovere@email.com';
  isEditing = false;
  notificationsEnabled = true;
  selectedPayment = 'visa';
  favoriteAddress = 'Domicile · ACI 2000, Bamako';
  savedMessage = '';
  paymentMessage = '';

  readonly payments: PaymentOption[] = [
    { id: 'visa', brand: 'visa', name: 'Visa', details: '•••• 4821 · Expire 09/28' },
    { id: 'mastercard', brand: 'mastercard', name: 'Mastercard', details: '•••• 1093 · Expire 02/27' },
  ];

  constructor() {
    addIcons({
      addOutline,
      arrowForwardOutline,
      checkmarkCircleOutline,
      checkmarkOutline,
      chatbubbleEllipsesOutline,
      closeOutline,
      createOutline,
      locationOutline,
      notificationsOutline,
      sparklesOutline,
    });
    this.loadSettings();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.savedMessage = '';
  }

  saveProfile(): void {
    this.isEditing = false;
    this.savedMessage = 'Vos informations ont été mises à jour.';
    this.persistSettings();
  }

  setPayment(paymentId: string): void {
    this.selectedPayment = paymentId;
    this.persistSettings();
  }

  savePreferences(): void {
    this.persistSettings();
  }

  showPaymentMessage(): void {
    this.paymentMessage = 'L’ajout d’une carte sera disponible lors de la connexion au paiement sécurisé.';
  }

  toggleFavorite(): void {
    this.favoriteAddress = this.favoriteAddress.startsWith('Domicile')
      ? 'Bureau · Quartier du Fleuve, Bamako'
      : 'Domicile · ACI 2000, Bamako';
    this.persistSettings();
  }

  private loadSettings(): void {
    try {
      const stored = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      if (!stored) return;

      const settings = JSON.parse(stored) as Partial<AccountSettings>;
      if (typeof settings.firstName === 'string') this.firstName = settings.firstName;
      if (typeof settings.lastName === 'string') this.lastName = settings.lastName;
      if (typeof settings.email === 'string') this.email = settings.email;
      if (typeof settings.notificationsEnabled === 'boolean') {
        this.notificationsEnabled = settings.notificationsEnabled;
      }
      if (this.payments.some((payment) => payment.id === settings.selectedPayment)) {
        this.selectedPayment = settings.selectedPayment!;
      }
      if (typeof settings.favoriteAddress === 'string') {
        this.favoriteAddress = settings.favoriteAddress;
      }
    } catch {
      // Keep the default profile if saved settings are unreadable.
    }
  }

  private persistSettings(): void {
    const settings: AccountSettings = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      notificationsEnabled: this.notificationsEnabled,
      selectedPayment: this.selectedPayment,
      favoriteAddress: this.favoriteAddress,
    };

    try {
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // The current session remains usable if browser storage is unavailable.
    }
  }
}
