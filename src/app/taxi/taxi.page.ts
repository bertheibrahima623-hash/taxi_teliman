import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, calendar, car, location, people, pin } from 'ionicons/icons';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
  imports: [CommonModule, IonContent, IonIcon, RouterLink],
})
export class TaxiPage {
  vehicleName = 'Violeta City';
  vehiclePrice = 2500;
  confirmed = false;

  constructor(private route: ActivatedRoute) {
    addIcons({ arrowBack, arrowForward, calendar, car, location, people, pin });
    this.route.queryParams.subscribe((params) => {
      const vehicle = params['vehicle'];
      if (vehicle === 'confort') {
        this.vehicleName = 'Violeta Confort';
        this.vehiclePrice = 4000;
      } else {
        this.vehicleName = 'Violeta City';
        this.vehiclePrice = 2500;
      }
    });
  }

  confirmBooking(): void {
    this.confirmed = true;
  }
}
