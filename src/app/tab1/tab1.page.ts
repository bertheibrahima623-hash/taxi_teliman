import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { RideService } from '../ride.service';
import {
  airplaneOutline,
  arrowForwardOutline,
  busOutline,
  carOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  chevronDownOutline,
  lockClosedOutline,
  locateOutline,
  navigateOutline,
  swapVerticalOutline,
  timeOutline,
  trainOutline,
} from 'ionicons/icons';

type VehicleId = 'city' | 'comfort' | 'van';

interface VehicleOption {
  id: VehicleId;
  name: string;
  description: string;
  eta: string;
  price: number;
  icon: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [FormsModule, IonContent, IonIcon],
})
export class Tab1Page {
  readonly todayLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()).toUpperCase();
  pickup = 'Ma position · Paris 11e';
  destination = '';
  rideTime = 'now';
  selectedVehicle: VehicleId = 'city';
  bookingMessage = '';
  formError = '';

  readonly vehicles: VehicleOption[] = [
    { id: 'city', name: 'Rouge City', description: '1–3 pers.', eta: '4 min', price: 18, icon: 'car-sport-outline' },
    { id: 'comfort', name: 'Rouge Confort', description: '1–3 pers.', eta: '6 min', price: 26, icon: 'car-outline' },
    { id: 'van', name: 'Rouge Van', description: '1–6 pers.', eta: '8 min', price: 38, icon: 'bus-outline' },
  ];

  constructor(
    private readonly rideService: RideService,
    private readonly router: Router,
  ) {
    addIcons({
      airplaneOutline,
      arrowForwardOutline,
      busOutline,
      carOutline,
      checkmarkCircleOutline,
      checkmarkOutline,
      chevronDownOutline,
      lockClosedOutline,
      locateOutline,
      navigateOutline,
      swapVerticalOutline,
      timeOutline,
      trainOutline,
    });
  }

  get selectedVehiclePrice(): number {
    return this.vehicles.find((vehicle) => vehicle.id === this.selectedVehicle)?.price ?? 18;
  }

  setDestination(destination: string): void {
    this.destination = destination;
    this.formError = '';
    this.bookingMessage = '';
  }

  useCurrentLocation(): void {
    this.pickup = 'Ma position · Paris 11e';
  }

  swapLocations(): void {
    [this.pickup, this.destination] = [this.destination, this.pickup];
    this.bookingMessage = '';
  }

  requestRide(): void {
    if (!this.pickup.trim() || !this.destination.trim()) {
      this.formError = 'Indiquez un départ et une destination pour continuer.';
      this.bookingMessage = '';
      return;
    }

    this.formError = '';
    const vehicle = this.vehicles.find((option) => option.id === this.selectedVehicle);
    this.rideService.bookRide({
      pickup: this.pickup.trim(),
      destination: this.destination.trim(),
      vehicle: vehicle?.name ?? 'Rouge City',
      price: this.selectedVehiclePrice,
      rideTime: this.rideTime,
    });
    this.bookingMessage = `Votre course ${this.rideTime === 'now' ? 'immédiate' : 'programmée'} est confirmée · ${this.selectedVehiclePrice} €`;
  }

  viewRides(): void {
    void this.router.navigateByUrl('/tabs/tab2');
  }
}
