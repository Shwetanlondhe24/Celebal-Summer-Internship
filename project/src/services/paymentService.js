import { mockPaymentAPI } from './mockPaymentAPI';

class PaymentService {
  constructor() {
    this.provider = 'mock';
  }

  async createPaymentIntent(amount, currency = 'inr', metadata = {}) {
    switch (this.provider) {
      case 'mock':
        return await mockPaymentAPI.createPaymentIntent({
          amount: amount * 100,
          currency,
          metadata
        });
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  // Process payment
  async processPayment(paymentData) {
    switch (this.provider) {
      case 'mock':
        return await mockPaymentAPI.processPayment(paymentData);
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  // Confirm payment intent
  async confirmPaymentIntent(intentId, paymentMethod) {
    switch (this.provider) {
      case 'mock':
        return await mockPaymentAPI.confirmPaymentIntent(intentId, paymentMethod);
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  async getPaymentMethods(customerId) {
    switch (this.provider) {
      case 'mock':
        return await mockPaymentAPI.getPaymentMethods(customerId);
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount = null) {
    switch (this.provider) {
      case 'mock':
        // Mock refund implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          success: true,
          data: {
            id: `re_${Math.random().toString(36).substr(2, 24)}`,
            payment_intent: paymentId,
            amount: amount || 'full',
            status: 'succeeded',
            created: Math.floor(Date.now() / 1000)
          }
        };
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  async getPaymentDetails(paymentId) {
    switch (this.provider) {
      case 'mock':
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          success: true,
          data: {
            id: paymentId,
            amount: 10000,
            currency: 'inr',
            status: 'succeeded',
            created: Math.floor(Date.now() / 1000),
            payment_method: {
              type: 'card',
              card: {
                brand: 'visa',
                last4: '4242'
              }
            }
          }
        };
      default:
        throw new Error(`Payment provider ${this.provider} not supported`);
    }
  }

  setProvider(provider) {
    this.provider = provider;
  }

  getProvider() {
    return this.provider;
  }
}

export const paymentService = new PaymentService();
export default paymentService;