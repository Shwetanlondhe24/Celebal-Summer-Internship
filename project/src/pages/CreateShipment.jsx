import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, Phone, ArrowRight, Copy, Check } from 'lucide-react';
import PaymentForm from '../components/PaymentForm.jsx';

const CreateShipment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    // Sender details (auto-filled)
    senderName: 'John Smith',
    senderPhone: '+91 9876543210',
    
    // Receiver details
    receiverName: '',
    receiverPhone: '',
    
    // Addresses
    pickupAddress: '',
    deliveryAddress: '',
    
    // Package details
    packageSize: 'small',
    packageWeight: '',
    packageDescription: '',
    
    // Payment
    paymentMethod: 'razorpay'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
  };

  const handlePaymentSuccess = async (paymentData) => {
    setIsLoading(true);
    try {
      const newTrackingId = 'ST' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTrackingId(newTrackingId);
      
      console.log('Shipment created with payment:', {
        shipmentData: formData,
        paymentData,
        trackingId: newTrackingId
      });
      
      setStep(4);
    } catch (error) {
      console.error('Error creating shipment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPackagePrice = () => {
    switch (formData.packageSize) {
      case 'small': return 99;
      case 'medium': return 149;
      case 'large': return 199;
      case 'xl': return 299;
      default: return 99;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender Details</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.senderName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={formData.senderPhone}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="receiverName"
                required
                value={formData.receiverName}
                onChange={handleInputChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter receiver name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="receiverPhone"
                required
                value={formData.receiverPhone}
                onChange={handleInputChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+91 9876543210"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Addresses</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="pickupAddress"
                required
                value={formData.pickupAddress}
                onChange={handleInputChange}
                rows={3}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter complete pickup address"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="deliveryAddress"
                required
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                rows={3}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter complete delivery address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Package Size *</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'small', label: 'Small', price: '₹99', desc: 'Up to 1kg' },
              { id: 'medium', label: 'Medium', price: '₹149', desc: 'Up to 5kg' },
              { id: 'large', label: 'Large', price: '₹199', desc: 'Up to 10kg' },
              { id: 'xl', label: 'Extra Large', price: '₹299', desc: 'Up to 25kg' }
            ].map((size) => (
              <label key={size.id} className="relative">
                <input
                  type="radio"
                  name="packageSize"
                  value={size.id}
                  checked={formData.packageSize === size.id}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  formData.packageSize === size.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="text-center">
                    <Package className={`h-8 w-8 mx-auto mb-2 ${
                      formData.packageSize === size.id ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                    <div className="font-semibold text-gray-900">{size.label}</div>
                    <div className="text-sm text-gray-600">{size.desc}</div>
                    <div className="text-lg font-bold text-indigo-600 mt-1">{size.price}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Weight (kg)</label>
            <input
              type="number"
              name="packageWeight"
              value={formData.packageWeight}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 2.5"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Description</label>
            <input
              type="text"
              name="packageDescription"
              value={formData.packageDescription}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Electronics, Documents"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Package Size</span>
          <span className="font-medium capitalize">{formData.packageSize}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">From</span>
          <span className="font-medium text-right max-w-xs truncate">{formData.pickupAddress}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">To</span>
          <span className="font-medium text-right max-w-xs truncate">{formData.deliveryAddress}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Receiver</span>
          <span className="font-medium">{formData.receiverName}</span>
        </div>
      </div>

      {/* Payment Form */}
      <PaymentForm
        amount={getPackagePrice()}
        currency="INR"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Shipment Created Successfully!</h3>
        <p className="text-gray-600">Your package has been scheduled for pickup</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-sm text-gray-600 mb-2">Your Tracking ID</div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl font-bold text-indigo-600">{trackingId}</span>
          <button
            onClick={copyTrackingId}
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            title="Copy tracking ID"
          >
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
        {copied && <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate(`/track?id=${trackingId}`)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Track Now
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Shipment</h1>
        <p className="text-gray-600">Fill in the details to create your shipment</p>
      </div>

      {/* Progress Steps */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Details' },
              { step: 2, title: 'Package' },
              { step: 3, title: 'Payment' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= item.step 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= item.step ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > item.step ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        {step < 4 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="text-sm text-gray-600">
                Complete payment above to create your shipment
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateShipment;