import { Flight } from '../types';

export const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air France',
    flightNumber: 'AF007',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '14:30',
      date: '2024-04-10'
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      time: '03:45+1',
      date: '2024-04-11'
    },
    duration: '7h 15m',
    price: {
      economy: 650,
      business: 2400,
      first: 4200
    },
    availableSeats: {
      economy: 45,
      business: 12,
      first: 4
    },
    aircraft: 'Boeing 777-300ER',
    stops: 0,
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets']
  },
  {
    id: '2',
    airline: 'Delta Airlines',
    flightNumber: 'DL125',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '10:15',
      date: '2024-04-10'
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      time: '23:30',
      date: '2024-04-10'
    },
    duration: '7h 15m',
    price: {
      economy: 720,
      business: 2650,
      first: 4500
    },
    availableSeats: {
      economy: 32,
      business: 8,
      first: 2
    },
    aircraft: 'Airbus A350-900',
    stops: 0,
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets', 'Lie-flat Seats']
  },
  {
    id: '3',
    airline: 'British Airways',
    flightNumber: 'BA117',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '21:50',
      date: '2024-04-10'
    },
    arrival: {
      airport: 'LHR',
      city: 'London',
      time: '08:25+1',
      date: '2024-04-11'
    },
    duration: '6h 35m',
    price: {
      economy: 580,
      business: 2200,
      first: 3800
    },
    availableSeats: {
      economy: 67,
      business: 15,
      first: 6
    },
    aircraft: 'Boeing 787-9',
    stops: 0,
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets']
  },
  {
    id: '4',
    airline: 'Lufthansa',
    flightNumber: 'LH441',
    departure: {
      airport: 'JFK',
      city: 'New York',
      time: '17:20',
      date: '2024-04-10'
    },
    arrival: {
      airport: 'FRA',
      city: 'Frankfurt',
      time: '06:50+1',
      date: '2024-04-11'
    },
    duration: '7h 30m',
    price: {
      economy: 690,
      business: 2350,
      first: 4100
    },
    availableSeats: {
      economy: 28,
      business: 6,
      first: 3
    },
    aircraft: 'Airbus A340-600',
    stops: 0,
    amenities: ['WiFi', 'Entertainment', 'Meals', 'Power Outlets', 'Premium Economy']
  }
];