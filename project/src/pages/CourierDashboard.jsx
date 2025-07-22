import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle, Clock, Package, Navigation } from 'lucide-react';

const CourierDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const shipments = [
    {
      id: '1',
      trackingId: 'ST001234567',
      receiverName: 'John Doe',
      receiverPhone: '+91 9876543210',
      pickupAddress: '123 Business Park, Andheri, Mumbai, MH 400053',
      deliveryAddress: '456 Residential Colony, Connaught Place, Delhi, DL 110001',
      status: 'assigned',
      assignedAt: '2024-01-16T08:00:00Z',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: '2',
      trackingId: 'ST001234568',
      receiverName: 'Jane Smith',
      receiverPhone: '+91 8765432109',
      pickupAddress: '789 Tech Center, Electronic City, Bangalore, KA 560100',
      deliveryAddress: '321 Garden Street, T. Nagar, Chennai, TN 600017',
      status: 'picked-up',
      assignedAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: '3',
      trackingId: 'ST001234569',
      receiverName: 'Bob Johnson',
      receiverPhone: '+91 7654321098',
      pickupAddress: '555 Industrial Area, Hadapsar, Pune, MH 411028',
      deliveryAddress: '777 IT Park, Gachibowli, Hyderabad, TS 500032',
      status: 'delivered',
      assignedAt: '2024-01-14T09:15:00Z',
      estimatedDelivery: '2024-01-16'
    }
  ];

  const updateShipmentStatus = (shipmentId, newStatus) => {
    console.log(`Updating shipment ${shipmentId} to status: ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextAction = (status) => {
    switch (status) {
      case 'assigned': return { action: 'picked-up', label: 'Mark as Picked Up' };
      case 'picked-up': return { action: 'in-transit', label: 'Mark In Transit' };
      case 'in-transit': return { action: 'out-for-delivery', label: 'Out for Delivery' };
      case 'out-for-delivery': return { action: 'delivered', label: 'Mark as Delivered' };
      default: return null;
    }
  };

  const pendingShipments = shipments.filter(s => s.status !== 'delivered');
  const completedShipments = shipments.filter(s => s.status === 'delivered');

  const stats = {
    assigned: shipments.filter(s => s.status === 'assigned').length,
    inProgress: shipments.filter(s => ['picked-up', 'in-transit', 'out-for-delivery'].includes(s.status)).length,
    completed: completedShipments.length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Courier Dashboard</h1>
        <p className="text-gray-600">Manage your assigned deliveries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.assigned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Deliveries ({pendingShipments.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed ({completedShipments.length})
          </button>
        </nav>
      </div>

      <div className="space-y-6">
        {(activeTab === 'pending' ? pendingShipments : completedShipments).map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shipment.trackingId}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Receiver Details</h4>
                    <p className="text-gray-600 mb-1">{shipment.receiverName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-1" />
                      <a href={`tel:${shipment.receiverPhone}`} className="hover:text-indigo-600">
                        {shipment.receiverPhone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Information</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Est. Delivery:</span> {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Assigned:</span> {new Date(shipment.assignedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pickup Address</p>
                        <p className="text-sm text-gray-600">{shipment.pickupAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                        <p className="text-sm text-gray-600">{shipment.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </button>

                {shipment.status !== 'delivered' && (
                  <button
                    onClick={() => {
                      const nextAction = getNextAction(shipment.status);
                      if (nextAction) {
                        updateShipmentStatus(shipment.id, nextAction.action);
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {getNextAction(shipment.status)?.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {(activeTab === 'pending' ? pendingShipments : completedShipments).length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} deliveries
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending' 
                ? "You don't have any pending deliveries at the moment."
                : "You haven't completed any deliveries today."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourierDashboard;