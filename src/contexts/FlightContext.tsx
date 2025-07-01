import React, { createContext, useContext, useState } from 'react';
import { Flight, SearchFilters, Booking } from '../types';
import { mockFlights } from '../data/mockData';

interface FlightContextType {
  flights: Flight[];
  searchFlights: (filters: SearchFilters) => Flight[];
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getFlightById: (id: string) => Flight | undefined;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
};

export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flights] = useState<Flight[]>(mockFlights);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const searchFlights = (filters: SearchFilters): Flight[] => {
    return flights.filter(flight => {
      const matchesDeparture = flight.departure.city.toLowerCase().includes(filters.departure.toLowerCase());
      const matchesDestination = flight.arrival.city.toLowerCase().includes(filters.destination.toLowerCase());
      const matchesDate = flight.departure.date === filters.departureDate;
      
      return matchesDeparture && matchesDestination && matchesDate;
    });
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const getFlightById = (id: string): Flight | undefined => {
    return flights.find(flight => flight.id === id);
  };

  return (
    <FlightContext.Provider value={{
      flights,
      searchFlights,
      bookings,
      addBooking,
      getFlightById
    }}>
      {children}
    </FlightContext.Provider>
  );
};