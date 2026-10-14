import { Injectable } from '@angular/core';

export type RideStatus = 'upcoming' | 'past' | 'cancelled';

export interface Ride {
  id: number;
  day: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  vehicle: string;
  distance: string;
  price: number;
  status: RideStatus;
}

export interface NewRide {
  pickup: string;
  destination: string;
  vehicle: string;
  price: number;
  rideTime: string;
}

const STORAGE_KEY = 'violeta-vtc-rides';

const DEMO_RIDES: Ride[] = [
  { id: 1, day: '16', date: 'OCT. 2026', time: '19:00', pickup: 'ACI 2000, Bamako', destination: 'Hamdallaye, Bamako', vehicle: 'Violeta Confort', distance: '5,2 km', price: 4000, status: 'upcoming' },
  { id: 2, day: '04', date: 'OCT. 2026', time: '09:42', pickup: 'Badalabougou, Bamako', destination: 'Hippodrome, Bamako', vehicle: 'Violeta City', distance: '3,8 km', price: 2500, status: 'past' },
  { id: 3, day: '29', date: 'SEPT. 2026', time: '16:18', pickup: 'Sogoniko, Bamako', destination: 'Aéroport international Modibo Keïta-Sénou', vehicle: 'Violeta Confort', distance: '15,4 km', price: 8000, status: 'past' },
];

@Injectable({ providedIn: 'root' })
export class RideService {
  private ridesList = this.loadRides();

  get rides(): Ride[] {
    return [...this.ridesList];
  }

  bookRide(booking: NewRide): Ride {
    const departure = this.getDepartureDate(booking.rideTime);
    const ride: Ride = {
      id: Date.now(),
      day: departure.toLocaleDateString('fr-FR', { day: '2-digit' }),
      date: departure.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }).toUpperCase(),
      time: departure.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      pickup: booking.pickup,
      destination: booking.destination,
      vehicle: booking.vehicle,
      distance: 'Trajet estimé',
      price: booking.price,
      status: 'upcoming',
    };

    this.ridesList = [ride, ...this.ridesList];
    this.persist();
    return ride;
  }

  cancelRide(id: number): void {
    this.ridesList = this.ridesList.map((ride) =>
      ride.id === id ? { ...ride, status: 'cancelled' } : ride,
    );
    this.persist();
  }

  private getDepartureDate(rideTime: string): Date {
    const departure = new Date();
    if (rideTime === '30min') {
      departure.setMinutes(departure.getMinutes() + 30);
    } else if (rideTime === 'tonight') {
      departure.setHours(19, 0, 0, 0);
      if (departure.getTime() < Date.now()) departure.setDate(departure.getDate() + 1);
    }
    return departure;
  }

  private loadRides(): Ride[] {
    try {
      const storedRides = localStorage.getItem(STORAGE_KEY);
      return storedRides ? JSON.parse(storedRides) as Ride[] : [...DEMO_RIDES];
    } catch {
      return [...DEMO_RIDES];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ridesList));
    } catch {
      // The current session still works when browser storage is unavailable.
    }
  }
}
