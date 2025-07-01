import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { SearchFilters } from '../types';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    seatClass: 'economy',
    tripType: 'one-way'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.departure && filters.destination && filters.departureDate) {
      const searchParams = new URLSearchParams({
        departure: filters.departure,
        destination: filters.destination,
        departureDate: filters.departureDate,
        passengers: filters.passengers.toString(),
        seatClass: filters.seatClass,
        tripType: filters.tripType,
        ...(filters.returnDate && { returnDate: filters.returnDate })
      });
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilters(prev => ({ ...prev, tripType: 'one-way' }))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.tripType === 'one-way'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          One Way
        </button>
        <button
          onClick={() => setFilters(prev => ({ ...prev, tripType: 'round-trip' }))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filters.tripType === 'round-trip'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Round Trip
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={filters.departure}
                onChange={(e) => setFilters(prev => ({ ...prev, departure: e.target.value }))}
                placeholder="Departure city"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={filters.destination}
                onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Destination city"
                className="input-field pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={filters.departureDate}
                onChange={(e) => setFilters(prev => ({ ...prev, departureDate: e.target.value }))}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {filters.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={filters.returnDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="input-field pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={filters.passengers}
                onChange={(e) => setFilters(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                className="input-field pl-10"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <div className="grid grid-cols-3 gap-4">
            {['economy', 'business', 'first'].map((seatClass) => (
              <button
                key={seatClass}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, seatClass: seatClass as any }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.seatClass === seatClass
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium capitalize">{seatClass}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Flights</span>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;