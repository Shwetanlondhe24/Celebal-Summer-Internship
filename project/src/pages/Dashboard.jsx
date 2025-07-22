import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Filter, MapPin, Clock, CheckCircle, Truck, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const shipments = [
    {
      id: '1',
      trackingId: 'ST001234567',
      receiverName: 'John Doe',
      fromAddress: 'Mumbai, MH',
      toAddress: 'Delhi, DL',
      status: 'in-transit',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: '2',
      trackingId: 'ST001234568',
      receiverName: 'Jane Smith',
      fromAddress: 'Bangalore, KA',
      toAddress: 'Chennai, TN',
      status: 'delivered',
      createdAt: '2024-01-14',
      estimatedDelivery: '2024-01-16'
    },
    {
      id: '3',
      trackingId: 'ST001234569',
      receiverName: 'Bob Johnson',
      fromAddress: 'Pune, MH',
      toAddress: 'Hyderabad, TS',
      status: 'picked-up',
      createdAt: '2024-01-16',
      estimatedDelivery: '2024-01-18'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'created': return 'bg-gray-100 text-gray-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'created': return <Package className="h-4 w-4" />;
      case 'assigned': return <Clock className="h-4 w-4" />;
      case 'picked-up': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'out-for-delivery': return <MapPin className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    if (filter === 'all') return true;
    if (filter === 'in-transit') return ['assigned', 'picked-up', 'in-transit', 'out-for-delivery'].includes(shipment.status);
    if (filter === 'delivered') return shipment.status === 'delivered';
    return true;
  });

  const stats = {
    total: shipments.length,
    inTransit: shipments.filter(s => ['assigned', 'picked-up', 'in-transit', 'out-for-delivery'].includes(s.status)).length,
    delivered: shipments.filter(s => s.status === 'delivered').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello {user?.name}! 👋
        </h1>
        <p className="text-gray-600">Here's an overview of your shipments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-lg p-3">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Truck className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Shipments</h2>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Show All</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        <Link
          to="/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Shipment</span>
        </Link>
      </div>

      {/* Shipments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredShipments.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't created any shipments yet." 
                : `No ${filter.replace('-', ' ')} shipments found.`}
            </p>
            <Link
              to="/create"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Your First Shipment
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredShipments.map((shipment) => (
              <div key={shipment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {shipment.receiverName}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {getStatusIcon(shipment.status)}
                        <span className="ml-1 capitalize">{shipment.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{shipment.fromAddress} → {shipment.toAddress}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Tracking ID:</span> {shipment.trackingId}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {new Date(shipment.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Est. Delivery:</span> {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Link
                      to={`/track?id=${shipment.trackingId}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;