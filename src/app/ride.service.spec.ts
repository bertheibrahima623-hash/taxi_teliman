import { RideService } from './ride.service';

describe('RideService', () => {
  beforeEach(() => localStorage.clear());

  it('adds a booking to the persistent ride history', () => {
    const service = new RideService();
    const ride = service.bookRide({
      pickup: 'Place de la République',
      destination: 'Gare de Lyon',
      vehicle: 'Rouge City',
      price: 18,
      rideTime: '30min',
    });

    expect(service.rides[0]).toEqual(ride);
    expect(new RideService().rides[0]).toEqual(ride);
    expect(ride.status).toBe('upcoming');
  });

  it('persists cancellations', () => {
    const service = new RideService();
    const ride = service.bookRide({
      pickup: 'République',
      destination: 'Bastille',
      vehicle: 'Rouge City',
      price: 18,
      rideTime: 'now',
    });

    service.cancelRide(ride.id);

    expect(new RideService().rides[0].status).toBe('cancelled');
  });
});