import React from 'react';
import SearchForm from '../components/SearchForm';
import { Plane, Shield, Clock, Award } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Plane className="h-8 w-8 text-primary-600" />,
      title: 'Best Flight Deals',
      description: 'Compare prices from hundreds of airlines to find the best deals for your journey.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Secure Booking',
      description: 'Your personal and payment information is protected with bank-level security.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to assist you.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: 'Trusted by Millions',
      description: 'Join millions of satisfied customers who trust us with their travel needs.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-slide-up">
              Discover the best flight deals and book your next adventure with confidence. 
              Compare prices, choose your preferred airline, and travel with ease.
            </p>
          </div>
          
          <div className="animate-slide-up">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FlightFinder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make flight booking simple, secure, and affordable. Experience the difference 
              with our premium travel platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore the world's most sought-after travel destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: 'Paris',
                country: 'France',
                image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
                price: 'From $650'
              },
              {
                city: 'Tokyo',
                country: 'Japan',
                image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
                price: 'From $890'
              },
              {
                city: 'London',
                country: 'United Kingdom',
                image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
                price: 'From $580'
              }
            ].map((destination, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{destination.city}</h3>
                  <p className="text-sm opacity-90">{destination.country}</p>
                  <p className="text-lg font-semibold mt-2">{destination.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;