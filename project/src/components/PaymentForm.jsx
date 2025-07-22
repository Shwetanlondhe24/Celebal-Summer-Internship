import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { mockPaymentAPI, TEST_CARDS } from '../services/mockPaymentAPI';

const PaymentForm = ({ amount, currency = 'INR', onSuccess, onError }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [cardData, setCardData] = useState({
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    name: ''
  });

  const [paypalData, setPaypalData] = useState({
    email: ''
  });

  const handleCardInputChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePaypalInputChange = (field, value) => {
    setPaypalData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!cardData.number) newErrors.number = 'Card number is required';
      if (!cardData.exp_month) newErrors.exp_month = 'Expiry month is required';
      if (!cardData.exp_year) newErrors.exp_year = 'Expiry year is required';
      if (!cardData.cvc) newErrors.cvc = 'CVC is required';
      if (!cardData.name) newErrors.name = 'Cardholder name is required';
    }

    if (paymentMethod === 'paypal') {
      if (!paypalData.email) newErrors.email = 'PayPal email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrors({});

    try {
      const paymentData = {
        amount: amount * 100, // Convert to cents
        currency: currency.toLowerCase(),
        paymentMethod: paymentMethod === 'card' ? {
          type: 'card',
          card: {
            number: cardData.number.replace(/\s/g, ''),
            exp_month: parseInt(cardData.exp_month),
            exp_year: parseInt(cardData.exp_year),
            cvc: cardData.cvc
          },
          billing_details: {
            name: cardData.name
          }
        } : {
          type: 'paypal',
          paypal: {
            email: paypalData.email
          }
        },
        source: 'shipment_payment'
      };

      const result = await mockPaymentAPI.processPayment(paymentData);

      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        setErrors({ general: result.error.message });
        onError && onError(result.error);
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
      onError && onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleCardInputChange('number', formatted);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lock className="h-5 w-5 text-green-600" />
        <span className="text-sm text-gray-600">Secure Payment</span>
      </div>

      {errors.general && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{errors.general}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === 'card' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-2">
                  <CreditCard className={`h-5 w-5 ${
                    paymentMethod === 'card' ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">Credit Card</span>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === 'paypal' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded ${
                    paymentMethod === 'paypal' ? 'bg-indigo-600' : 'bg-gray-400'
                  }`} />
                  <span className="font-medium">PayPal</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.number ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.number && <p className="text-red-600 text-sm mt-1">{errors.number}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <select
                  value={cardData.exp_month}
                  onChange={(e) => handleCardInputChange('exp_month', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.exp_month ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                {errors.exp_month && <p className="text-red-600 text-sm mt-1">{errors.exp_month}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  value={cardData.exp_year}
                  onChange={(e) => handleCardInputChange('exp_year', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.exp_year ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {errors.exp_year && <p className="text-red-600 text-sm mt-1">{errors.exp_year}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardData.cvc}
                  onChange={(e) => handleCardInputChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  maxLength="4"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.cvc ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.cvc && <p className="text-red-600 text-sm mt-1">{errors.cvc}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                placeholder="John Doe"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        )}

        {/* PayPal Payment Form */}
        {paymentMethod === 'paypal' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PayPal Email
            </label>
            <input
              type="email"
              value={paypalData.email}
              onChange={(e) => handlePaypalInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
        )}

        {/* Amount Display */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span className="text-indigo-600">₹{amount}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span>Pay ₹{amount}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Test Card Numbers:</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <div>Success: {TEST_CARDS.SUCCESS}</div>
          <div>Declined: {TEST_CARDS.DECLINED}</div>
          <div>Insufficient Funds: {TEST_CARDS.INSUFFICIENT_FUNDS}</div>
          <div>Expired: {TEST_CARDS.EXPIRED}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;