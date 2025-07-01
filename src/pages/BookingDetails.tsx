import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Check } from 'lucide-react';
import { useFlight } from '../contexts/FlightContext';
import { useAuth } from '../contexts/AuthContext';
import { Passenger, Booking } from '../types';

const BookingDetails: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getFlightById, addBooking } = useFlight();
  const { user } = useAuth();

  const seatClass = (searchParams.get('class') as 'economy' | 'business' | 'first') || 'economy';
  const flight = flightId ? getFlightById(flightId) : null;

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'male'
    }
  ]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight not found</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = flight.price[seatClass] * passengers.length;

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    setPassengers(prev => prev.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking: Booking = {
        id: Date.now().toString(),
        userId: user.id,
        flightId: flight.id,
        passengers,
        seatClass,
        totalPrice,
        bookingDate: new Date(),
        status: 'confirmed',
        paymentStatus: 'paid',
        bookingReference: `FF${Date.now().toString().slice(-6)}`
      };

      addBooking(booking);
      navigate('/profile?tab=bookings');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to search results</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Summary */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Flight Details</h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{flight.airline}</h3>
                  <p className="text-gray-600">{flight.flightNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">${flight.price[seatClass]}</p>
                  <p className="text-sm text-gray-600 capitalize">{seatClass} class</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{flight.departure.time}</p>
                  <p className="text-gray-600">{flight.departure.city} ({flight.departure.airport})</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{flight.duration}</p>
                  <p className="text-xs text-gray-500">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{flight.arrival.time}</p>
                  <p className="text-gray-600">{flight.arrival.city} ({flight.arrival.airport})</p>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Information</h2>
              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900">Passenger {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={passenger.firstName}
                        onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as any)}
                        className="input-field"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/YY"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
                  <span className="font-medium">${flight.price[seatClass] * passengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">$45</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">${totalPrice + 45}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Check className="h-4 w-4" />
                  <span>Free cancellation within 24h</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <span>All major cards accepted</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={isProcessing}
                className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Book Flight - $${totalPrice + 45}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;