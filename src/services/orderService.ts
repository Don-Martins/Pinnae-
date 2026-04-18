import api from './api';

export const orderService = {
  async getOrders() {
    const response = await api.get('/orders');
    return response.data;
  },

  async createOrder() {
    const response = await api.post('/orders');
    return response.data;
  },

  async getOrder(id: string | number) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async initializePayment(orderId: string | number) {
    const response = await api.post('/payment/initialize', { order_id: orderId });
    return response.data;
  },

  async verifyPayment(reference: string) {
    const response = await api.get('/payment/callback', { params: { reference } });
    return response.data;
  }
};
