import { RideService } from './ride.service';

describe('RideService', () => {
  beforeEach(() => localStorage.clear());

  it('adds a booking to persistent ride history', () => {
    const service = new RideService();
    const ride = service.bookRide({
      pickup: 'ACI 2000, Bamako',
      destination: 'Hamdallaye, Bamako',
      vehicle: 'Violeta City',
      price: 2500,
      rideTime: '30min',
    });

    expect(service.rides[0]).toEqual(ride);
    expect(new RideService().rides[0]).toEqual(ride);
    expect(ride.status).toBe('upcoming');
  });

  it('persists ride cancellations', () => {
    const service = new RideService();
    const ride = service.bookRide({
      pickup: 'Badalabougou, Bamako',
      destination: 'Hippodrome, Bamako',
      vehicle: 'Violeta City',
      price: 2500,
      rideTime: 'now',
    });

    service.cancelRide(ride.id);

    expect(new RideService().rides[0].status).toBe('cancelled');
  });
});