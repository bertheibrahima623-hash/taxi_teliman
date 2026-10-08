import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, carSportOutline, receiptOutline, star } from 'ionicons/icons';
import { Ride, RideService, RideStatus } from '../ride.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonContent, IonIcon]
})
export class Tab2Page {
  filter: 'upcoming' | 'past' | 'cancelled' = 'upcoming';
  receiptId: number | null = null;

  constructor(
    private readonly router: Router,
    private readonly rideService: RideService,
  ) {
    addIcons({ arrowForwardOutline, carSportOutline, receiptOutline, star });
  }

  get rides(): Ride[] {
    return this.rideService.rides;
  }

  get visibleRides(): Ride[] {
    return this.rides.filter((ride) => ride.status === this.filter);
  }

  get completedRideCount(): number {
    return this.rides.filter((ride) => ride.status === 'past').length;
  }

  countByStatus(status: RideStatus): number {
    return this.rides.filter((ride) => ride.status === status).length;
  }

  statusLabel(status: RideStatus): string {
    return status === 'upcoming' ? 'Confirmée' : status === 'cancelled' ? 'Annulée' : 'Terminée';
  }

  cancelRide(id: number): void {
    this.rideService.cancelRide(id);
    this.filter = 'cancelled';
  }

  toggleReceipt(id: number): void {
    this.receiptId = this.receiptId === id ? null : id;
  }

  bookAgain(): void {
    void this.router.navigateByUrl('/tabs/tab1');
  }

}
