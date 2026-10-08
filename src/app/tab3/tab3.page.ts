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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [FormsModule, IonContent, IonIcon],
})
export class Tab3Page {
  firstName = 'Élodie';
  lastName = 'Martin';
  email = 'elodie.martin@email.fr';
  isEditing = false;
  notificationsEnabled = true;
  selectedPayment = 'visa';
  favoriteAddress = 'Domicile · 18 rue Oberkampf, Paris';
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
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.savedMessage = '';
  }

  saveProfile(): void {
    this.isEditing = false;
    this.savedMessage = 'Vos informations ont été mises à jour.';
  }

  showPaymentMessage(): void {
    this.paymentMessage = 'L’ajout d’une carte sera disponible lors de la connexion au paiement sécurisé.';
  }

  toggleFavorite(): void {
    this.favoriteAddress = this.favoriteAddress.startsWith('Domicile')
      ? 'Bureau · 12 avenue de la République, Paris'
      : 'Domicile · 18 rue Oberkampf, Paris';
  }
}
