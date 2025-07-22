import React, { useState } from 'react';
import { Users, Package, UserCheck, Filter, Search, MoreVertical } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('unassigned');
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  // Mock data
  const unassignedShipments = [
    {
      id: '1',
      trackingId: 'ST001234570',
      receiverName: 'Alice Johnson',
      fromAddress: 'Mumbai, MH',
      toAddress: 'Pune, MH',
      createdAt: '2024-01-16T10:30:00Z',
      priority: 'normal'
    },
    {
      id: '2',
      trackingId: 'ST001234571',
      receiverName: 'Bob Smith',
      fromAddress: 'Delhi, DL',
      toAddress: 'Gurgaon, HR',
      createdAt: '2024-01-16T11:45:00Z',
      priority: 'high'
    },
    {
      id: '3',
      trackingId: 'ST001234572',
      receiverName: 'Carol Davis',
      fromAddress: 'Bangalore, KA',
      toAddress: 'Mysore, KA',
      createdAt: '2024-01-16T12:15:00Z',
      priority: 'urgent'
    }
  ];

  const couriers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@courier.com',
      activeDeliveries: 3,
      maxCapacity: 10,
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@courier.com',
      activeDeliveries: 7,
      maxCapacity: 10,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@courier.com',
      activeDeliveries: 0,
      maxCapacity: 8,
      status: 'inactive'
    }
  ];

  const assignShipment = (shipmentId, courierId) => {
    console.log(`Assigning shipment ${shipmentId} to courier ${courierId}`);
  };

  const bulkAssign = (courierIds) => {
    console.log(`Bulk assigning shipments ${selectedShipments} to courier ${courierIds}`);
    setSelectedShipments([]);
  };

  const toggleShipmentSelection = (shipmentId) => {
    setSelectedShipments(prev => 
      prev.includes(shipmentId) 
        ? prev.filter(id => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShipments = unassignedShipments.filter(shipment => {
    const matchesSearch = shipment.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || shipment.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const stats = {
    unassigned: unassignedShipments.length,
    activeCouriers: couriers.filter(c => c.status === 'active').length,
    totalCapacity: couriers.reduce((sum, c) => sum + c.maxCapacity, 0),
    utilization: Math.round((couriers.reduce((sum, c) => sum + c.activeDeliveries, 0) / couriers.reduce((sum, c) => sum + c.maxCapacity, 0)) * 100)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage shipment assignments and courier operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-lg p-3">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unassigned</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unassigned}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Couriers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCouriers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCapacity}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{stats.utilization}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('unassigned')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'unassigned'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Unassigned Shipments ({unassignedShipments.length})
          </button>
          <button
            onClick={() => setActiveTab('couriers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'couriers'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Courier Management ({couriers.length})
          </button>
        </nav>
      </div>

      {activeTab === 'unassigned' && (
        <div className="space-y-6">
          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>
              </div>

              {selectedShipments.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {selectedShipments.length} selected
                  </span>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        bulkAssign(e.target.value);
                      }
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Bulk Assign To...</option>
                    {couriers.filter(c => c.status === 'active').map(courier => (
                      <option key={courier.id} value={courier.id}>
                        {courier.name} ({courier.activeDeliveries}/{courier.maxCapacity})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {filteredShipments.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No unassigned shipments</h3>
                <p className="text-gray-600">All shipments have been assigned to couriers.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedShipments.length === filteredShipments.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedShipments(filteredShipments.map(s => s.id));
                            } else {
                              setSelectedShipments([]);
                            }
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receiver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredShipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedShipments.includes(shipment.id)}
                            onChange={() => toggleShipmentSelection(shipment.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {shipment.trackingId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {shipment.receiverName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {shipment.fromAddress} → {shipment.toAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(shipment.priority)}`}>
                            {shipment.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(shipment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                assignShipment(shipment.id, e.target.value);
                              }
                            }}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Assign to...</option>
                            {couriers.filter(c => c.status === 'active').map(courier => (
                              <option key={courier.id} value={courier.id}>
                                {courier.name} ({courier.activeDeliveries}/{courier.maxCapacity})
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'couriers' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Deliveries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {couriers.map((courier) => (
                  <tr key={courier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{courier.name}</div>
                        <div className="text-sm text-gray-500">{courier.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        courier.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {courier.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {courier.activeDeliveries}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {courier.maxCapacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${(courier.activeDeliveries / courier.maxCapacity) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round((courier.activeDeliveries / courier.maxCapacity) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;