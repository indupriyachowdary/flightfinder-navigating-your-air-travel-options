export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: {
    economy: number;
    business: number;
    first: number;
  };
  availableSeats: {
    economy: number;
    business: number;
    first: number;
  };
  aircraft: string;
  stops: number;
  amenities: string[];
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  passengers: Passenger[];
  seatClass: 'economy' | 'business' | 'first';
  totalPrice: number;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled' | 'pending';
  paymentStatus: 'paid' | 'pending' | 'failed';
  bookingReference: string;
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  seatNumber?: string;
}

export interface SearchFilters {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  seatClass: 'economy' | 'business' | 'first';
  tripType: 'one-way' | 'round-trip';
}