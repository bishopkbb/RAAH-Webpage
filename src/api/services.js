import apiClient from './client';

export const publicApi = {
  // Lead Generation
  submitDemoRequest: (data) => apiClient.post('/demo-requests', data),
  submitPricingRequest: (data) => apiClient.post('/pricing-requests', data),
  
  // Subscription Flow
  getQuoteDetails: (token) => apiClient.get(`/quote/${token}`),
  createCheckoutSession: (token, data) => apiClient.post(`/quote/${token}/checkout`, data),
};