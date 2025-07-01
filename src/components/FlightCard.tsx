import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Plane, Wifi, Tv, Coffee, Zap } from 'lucide-react';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  seatClass: 'economy' | 'business' | 'first';
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, seatClass }) => {
  const navigate = useNavigate();

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'entertainment': return <Tv className="h-4 w-4" />;
      case 'meals': return <Coffee className="h-4 w-4" />;
      case 'power outlets': return <Zap className="h-4 w-4" />;
      default: return <Plane className="h-4 w-4" />;
    }
  };

  const handleBookFlight = () => {
    navigate(`/booking/${flight.id}?class=${seatClass}`);
  };

  return (
    <div className="flight-card card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Plane className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{flight.airline}</h3>
            <p className="text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">${flight.price[seatClass]}</p>
          <p className="text-sm text-gray-600">per person</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
          <p className="text-sm text-gray-600">{flight.departure.airport}</p>
          <p className="text-sm text-gray-600">{flight.departure.city}</p>
        </div>

        <div className="flex-1 mx-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <div className="flex-1 h-0.5 bg-gray-300 relative">
              <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
            </div>
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">{flight.duration}</p>
            <p className="text-xs text-gray-500">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
          <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
          <p className="text-sm text-gray-600">{flight.arrival.city}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {flight.amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 text-gray-600">
              {getAmenityIcon(amenity)}
              <span className="text-xs">{amenity}</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {flight.availableSeats[seatClass]} seats left
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Free cancellation within 24h</span>
        </div>
        <button
          onClick={handleBookFlight}
          className="btn-primary px-6 py-2"
        >
          Select Flight
        </button>
      </div>
    </div>
  );
};

export default FlightCard;