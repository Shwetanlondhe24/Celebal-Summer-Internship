import { useState, useCallback } from 'react';
import { paymentService } from '../services/paymentService';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const processPayment = useCallback(async (paymentDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.processPayment(paymentDetails);
      
      if (result.success) {
        setPaymentData(result.data);
        return result.data;
      } else {
        setError(result.error);
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPaymentIntent = useCallback(async (amount, currency, metadata) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.createPaymentIntent(amount, currency, metadata);
      
      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const confirmPaymentIntent = useCallback(async (intentId, paymentMethod) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.confirmPaymentIntent(intentId, paymentMethod);
      
      if (result.success) {
        setPaymentData(result.data);
        return result.data;
      } else {
        setError(result.error);
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refundPayment = useCallback(async (paymentId, amount) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.refundPayment(paymentId, amount);
      
      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPaymentDetails = useCallback(async (paymentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await paymentService.getPaymentDetails(paymentId);
      
      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearPaymentData = useCallback(() => {
    setPaymentData(null);
  }, []);

  return {
    isLoading,
    error,
    paymentData,
    processPayment,
    createPaymentIntent,
    confirmPaymentIntent,
    refundPayment,
    getPaymentDetails,
    clearError,
    clearPaymentData
  };
};

export default usePayment;