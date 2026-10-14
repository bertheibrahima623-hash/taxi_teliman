import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  businessOutline,
  storefrontOutline,
  swapVerticalOutline,
  timeOutline,
  trainOutline,
} from 'ionicons/icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RideService } from '../ride.service';

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
  imports: [FormsModule, IonContent, IonIcon],
})
export class Tab1Page {
  readonly todayLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()).toUpperCase();
  pickup = 'Ma position · ACI 2000, Bamako';
  destination = '';
  rideTime = 'now';
  selectedVehicle: VehicleId = 'city';
  bookingMessage = '';
  formError = '';
  locationError = '';
  isLocating = false;
  mapLabel = 'BAMAKO · ACI 2000';
  mapUrl: SafeResourceUrl;

  readonly vehicles: VehicleOption[] = [
    { id: 'city', name: 'Violeta City', description: '1–3 pers.', eta: '4 min', price: 2500, icon: 'car-outline' },
    { id: 'comfort', name: 'Violeta Confort', description: '1–3 pers.', eta: '6 min', price: 4000, icon: 'car-outline' },
    { id: 'van', name: 'Violeta Van', description: '1–6 pers.', eta: '8 min', price: 6000, icon: 'bus-outline' },
  ];

  constructor(
    private readonly rideService: RideService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.mapUrl = this.createMapUrl(12.6392, -8.0029);
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
      businessOutline,
      storefrontOutline,
      swapVerticalOutline,
      timeOutline,
      trainOutline,
    });
  }

  get selectedVehiclePrice(): number {
    const basePrice = this.vehicles.find((vehicle) => vehicle.id === this.selectedVehicle)?.price ?? 2500;
    const destination = this.destination.toLocaleLowerCase('fr-FR');
    const airportSurcharge = destination.includes('sénou') || destination.includes('aéroport')
      ? 4000
      : 0;

    return basePrice + airportSurcharge;
  }

  setDestination(destination: string): void {
    this.destination = destination;
    this.clearBookingState();
  }

  useCurrentLocation(): void {
    this.locationError = '';
    if (!navigator.geolocation) {
      this.locationError = 'La géolocalisation n’est pas disponible sur cet appareil.';
      return;
    }

    this.isLocating = true;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        this.pickup = `Ma position · ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        this.mapUrl = this.createMapUrl(latitude, longitude);
        this.mapLabel = 'VOTRE POSITION';
        this.isLocating = false;
        this.clearBookingState();
      },
      (error: GeolocationPositionError) => {
        this.isLocating = false;
        this.locationError = error.code === error.PERMISSION_DENIED
          ? 'Autorisez la localisation dans votre navigateur pour utiliser votre position.'
          : 'Position introuvable. Vérifiez le GPS et réessayez.';
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    );
  }

  swapLocations(): void {
    [this.pickup, this.destination] = [this.destination, this.pickup];
    this.clearBookingState();
  }

  clearBookingState(): void {
    this.formError = '';
    this.bookingMessage = '';
  }

  selectVehicle(vehicleId: VehicleId): void {
    this.selectedVehicle = vehicleId;
    this.clearBookingState();
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
      vehicle: vehicle?.name ?? 'Violeta City',
      price: this.selectedVehiclePrice,
      rideTime: this.rideTime,
    });
    this.bookingMessage = `Demande ${this.rideTime === 'now' ? 'immédiate' : 'programmée'} enregistrée sur cet appareil · ${this.selectedVehiclePrice} FCFA`;
  }

  viewRides(): void {
    void this.router.navigateByUrl('/tabs/tab2');
  }

  private createMapUrl(latitude: number, longitude: number): SafeResourceUrl {
    const delta = 0.035;
    const bounds = [
      longitude - delta,
      latitude - delta,
      longitude + delta,
      latitude + delta,
    ].map((coordinate) => coordinate.toFixed(5)).join(',');
    const params = new URLSearchParams({
      bbox: bounds,
      layer: 'mapnik',
      marker: `${latitude},${longitude}`,
    });

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?${params}`,
    );
  }
}
