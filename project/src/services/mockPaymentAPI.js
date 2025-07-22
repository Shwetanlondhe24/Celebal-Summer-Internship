class MockPaymentAPI {
  constructor() {
    this.baseDelay = 1000;
    this.failureRate = 0.1;
  }

  async delay(ms = this.baseDelay) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `txn_${timestamp}_${random}`.toUpperCase();
  }

  generatePaymentMethodId(type) {
    const prefix = type === 'card' ? 'pm_card' : 'pm_paypal';
    const random = Math.random().toString(36).substr(2, 12);
    return `${prefix}_${random}`;
  }

  validateCardNumber(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(num)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  async processPayment(paymentData) {
    await this.delay(Math.random() * 2000 + 1000);

    const { amount, currency, paymentMethod, metadata } = paymentData;

    if (paymentMethod.type === 'card') {
      const cardNumber = paymentMethod.card.number;
      
      if (cardNumber === '4000000000000002') {
        return this.createErrorResponse('card_declined', 'Your card was declined.');
      }
      
      if (cardNumber === '4000000000009995') {
        return this.createErrorResponse('insufficient_funds', 'Your card has insufficient funds.');
      }
      
      if (cardNumber === '4000000000009987') {
        return this.createErrorResponse('expired_card', 'Your card has expired.');
      }
      
      if (cardNumber === '4000000000000069') {
        return this.createErrorResponse('incorrect_cvc', 'Your card\'s security code is incorrect.');
      }
      
      if (cardNumber === '4000000000000119') {
        return this.createErrorResponse('processing_error', 'An error occurred while processing your card.');
      }

      if (!this.validateCardNumber(cardNumber)) {
        return this.createErrorResponse('invalid_number', 'Your card number is invalid.');
      }

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      
      if (paymentMethod.card.exp_year < currentYear || 
          (paymentMethod.card.exp_year === currentYear && paymentMethod.card.exp_month < currentMonth)) {
        return this.createErrorResponse('expired_card', 'Your card has expired.');
      }
    }

    if (Math.random() < this.failureRate) {
      const errors = [
        { code: 'network_error', message: 'A network error occurred. Please try again.' },
        { code: 'timeout', message: 'The request timed out. Please try again.' },
        { code: 'rate_limit_exceeded', message: 'Too many requests. Please wait a moment and try again.' }
      ];
      const error = errors[Math.floor(Math.random() * errors.length)];
      return this.createErrorResponse(error.code, error.message);
    }

    return this.createSuccessResponse(amount, currency, paymentMethod, metadata);
  }

  async createPaymentIntent(data) {
    await this.delay(500);

    const { amount, currency, metadata } = data;
    const intentId = `pi_${Math.random().toString(36).substr(2, 24)}`;

    return {
      success: true,
      data: {
        id: intentId,
        amount,
        currency,
        status: 'requires_payment_method',
        client_secret: `${intentId}_secret_${Math.random().toString(36).substr(2, 16)}`,
        created: Math.floor(Date.now() / 1000),
        metadata: metadata || {}
      }
    };
  }

  async confirmPaymentIntent(intentId, paymentMethod) {
    await this.delay(Math.random() * 1500 + 1000);

    const paymentResult = await this.processPayment({
      amount: 10000,
      currency: 'inr',
      paymentMethod,
      metadata: { intent_id: intentId }
    });

    if (!paymentResult.success) {
      return {
        success: false,
        error: paymentResult.error
      };
    }

    return {
      success: true,
      data: {
        id: intentId,
        status: 'succeeded',
        amount: paymentResult.data.amount,
        currency: paymentResult.data.currency,
        payment_method: paymentResult.data.payment_method,
        charges: {
          data: [paymentResult.data]
        }
      }
    };
  }

  createSuccessResponse(amount, currency, paymentMethod, metadata) {
    const transactionId = this.generateTransactionId();
    const paymentMethodId = this.generatePaymentMethodId(paymentMethod.type);

    return {
      success: true,
      data: {
        id: transactionId,
        amount,
        currency,
        status: 'succeeded',
        payment_method: {
          id: paymentMethodId,
          type: paymentMethod.type,
          ...this.formatPaymentMethod(paymentMethod)
        },
        receipt_url: `https://pay.mockapi.com/receipts/${transactionId}`,
        created: Math.floor(Date.now() / 1000),
        metadata: metadata || {}
      }
    };
  }

  createErrorResponse(code, message) {
    return {
      success: false,
      error: {
        code,
        message,
        type: 'card_error',
        decline_code: code === 'card_declined' ? 'generic_decline' : null
      }
    };
  }

  formatPaymentMethod(paymentMethod) {
    if (paymentMethod.type === 'card') {
      return {
        card: {
          brand: this.getCardBrand(paymentMethod.card.number),
          last4: paymentMethod.card.number.slice(-4),
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year
        }
      };
    }
    
    if (paymentMethod.type === 'paypal') {
      return {
        paypal: {
          email: paymentMethod.paypal.email
        }
      };
    }

    return {};
  }

  getCardBrand(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6/.test(num)) return 'discover';
    
    return 'unknown';
  }

  async getPaymentMethods(customerId) {
    await this.delay(300);

    return {
      success: true,
      data: [
        {
          id: 'pm_card_test123',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          }
        },
        {
          id: 'pm_paypal_test456',
          type: 'paypal',
          paypal: {
            email: 'user@example.com'
          }
        }
      ]
    };
  }
}

export const mockPaymentAPI = new MockPaymentAPI();

export const TEST_CARDS = {
  SUCCESS: '4242424242424242',
  DECLINED: '4000000000000002',
  INSUFFICIENT_FUNDS: '4000000000009995',
  EXPIRED: '4000000000009987',
  INCORRECT_CVC: '4000000000000069',
  PROCESSING_ERROR: '4000000000000119'
};

export default mockPaymentAPI;