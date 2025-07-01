import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import { useFlight } from '../contexts/FlightContext';
import FlightCard from '../components/FlightCard';
import { Flight, SearchFilters } from '../types';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { searchFlights } = useFlight();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const filters: SearchFilters = {
    departure: searchParams.get('departure') || '',
    destination: searchParams.get('destination') || '',
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    passengers: parseInt(searchParams.get('passengers') || '1'),
    seatClass: (searchParams.get('seatClass') as any) || 'economy',
    tripType: (searchParams.get('tripType') as any) || 'one-way'
  };

  useEffect(() => {
    const results = searchFlights(filters);
    setFlights(results);
  }, [searchParams]);

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price[filters.seatClass] - b.price[filters.seatClass];
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'departure':
        return a.departure.time.localeCompare(b.departure.time);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {filters.departure} → {filters.destination}
              </h1>
              <p className="text-gray-600">
                {filters.departureDate} • {filters.passengers} passenger{filters.passengers > 1 ? 's' : ''} • {filters.seatClass} class
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-lg font-semibold text-gray-900">
                {flights.length} flight{flights.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full input-field"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="duration">Duration</option>
                    <option value="departure">Departure Time</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Airlines</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(flights.map(f => f.airline))).map(airline => (
                      <label key={airline} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="ml-2 text-sm text-gray-600">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Stops</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                      <span className="ml-2 text-sm text-gray-600">Direct flights only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                      <span className="ml-2 text-sm text-gray-600">1 stop</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:w-3/4">
            <div className="space-y-4">
              {sortedFlights.length > 0 ? (
                sortedFlights.map(flight => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    seatClass={filters.seatClass}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <SortAsc className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or dates to find more options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;