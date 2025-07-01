import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Plane, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFlight } from '../contexts/FlightContext';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const { user } = useAuth();
  const { bookings } = useFlight();
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Plane },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  const userBookings = bookings.filter(booking => booking.userId === user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={user.firstName}
                        disabled={!isEditing}
                        className="input-field disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={user.lastName}
                        disabled={!isEditing}
                        className="input-field disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={user.phone || ''}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50"
                      placeholder="Add phone number"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <button className="btn-primary">Save Changes</button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                
                {userBookings.length > 0 ? (
                  <div className="space-y-4">
                    {userBookings.map(booking => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Booking #{booking.bookingReference}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Booked on {format(booking.bookingDate, 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Passengers</p>
                            <p className="font-medium">{booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Class</p>
                            <p className="font-medium capitalize">{booking.seatClass}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Amount</p>
                            <p className="font-medium text-lg">${booking.totalPrice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600">Start planning your next trip!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Email notifications for booking confirmations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">SMS notifications for flight updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="ml-2 text-sm text-gray-700">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Allow data collection for personalized recommendations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                        <span className="ml-2 text-sm text-gray-700">Share travel preferences with partners</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                  </div>

                  <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    + Add New Payment Method
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;