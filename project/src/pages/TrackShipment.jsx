import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const TrackShipment = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockData = {
      trackingId: trackingId,
      status: 'in-transit',
      receiverName: 'John Doe',
      fromAddress: 'Mumbai, Maharashtra 400001',
      toAddress: 'Delhi, Delhi 110001',
      estimatedDelivery: '2024-01-17',
      currentLocation: 'Pune Distribution Center',
      events: [
        {
          status: 'created',
          description: 'Shipment created',
          location: 'Mumbai, MH',
          timestamp: '2024-01-15T10:00:00Z',
          completed: true
        },
        {
          status: 'picked-up',
          description: 'Package picked up',
          location: 'Mumbai, MH',
          timestamp: '2024-01-15T14:30:00Z',
          completed: true
        },
        {
          status: 'in-transit',
          description: 'In transit to destination',
          location: 'Pune Distribution Center',
          timestamp: '2024-01-16T08:15:00Z',
          completed: true
        },
        {
          status: 'out-for-delivery',
          description: 'Out for delivery',
          location: 'Delhi, DL',
          timestamp: '',
          completed: false
        },
        {
          status: 'delivered',
          description: 'Package delivered',
          location: 'Delhi, DL',
          timestamp: '',
          completed: false
        }
      ]
    };

    setTrackingData(mockData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (trackingId) {
      handleSearch({ preventDefault: () => {} });
    }
  }, []);

  const getStatusIcon = (status, completed) => {
    if (!completed) {
      return <div className="w-3 h-3 border-2 border-gray-300 rounded-full bg-white" />;
    }

    switch (status) {
      case 'created':
        return <Package className="h-6 w-6 text-white" />;
      case 'picked-up':
        return <CheckCircle className="h-6 w-6 text-white" />;
      case 'in-transit':
        return <Truck className="h-6 w-6 text-white" />;
      case 'out-for-delivery':
        return <MapPin className="h-6 w-6 text-white" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-white" />;
      default:
        return <Package className="h-6 w-6 text-white" />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (!completed) return 'bg-gray-300';
    
    switch (status) {
      case 'created': return 'bg-blue-500';
      case 'picked-up': return 'bg-yellow-500';
      case 'in-transit': return 'bg-purple-500';
      case 'out-for-delivery': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
        <p className="text-gray-600">Enter your tracking ID to get real-time updates</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g., ST001234567)"
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Tracking...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Track</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
      </div>

      {trackingData && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tracking ID: {trackingData.trackingId}
                </h2>
                <p className="text-gray-600">To: {trackingData.receiverName}</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Truck className="h-4 w-4 mr-1" />
                  In Transit
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-semibold">{trackingData.fromAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">To</p>
                  <p className="font-semibold">{trackingData.toAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Est. Delivery</p>
                  <p className="font-semibold">
                    {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-700 font-medium">Current Location:</span>
                <span className="text-purple-900">{trackingData.currentLocation}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking Timeline</h3>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8">
                {trackingData.events.map((event, index) => (
                  <div key={index} className="relative flex items-start space-x-4">
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(event.status, event.completed)}`}>
                      {getStatusIcon(event.status, event.completed)}
                    </div>
                    
                    <div className="min-w-0 flex-1 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className={`text-lg font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {event.description}
                          </h4>
                          <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {event.location}
                          </p>
                        </div>
                        {event.timestamp && (
                          <div className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'} mt-1 sm:mt-0`}>
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-900 mb-2">Common Issues:</p>
            <ul className="space-y-1">
              <li>• Tracking ID not found? Check for typos</li>
              <li>• No updates? Package may be in transit</li>
              <li>• Delivery delayed? Weather or traffic delays</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">Contact Support:</p>
            <ul className="space-y-1">
              <li>• Email: support@shiptracker.com</li>
              <li>• Phone: 1800-123-4567</li>
              <li>• Live Chat: Available 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;