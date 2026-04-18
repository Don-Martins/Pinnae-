import api from './api';

export const sellerService = {
  async getDashboard() {
    const response = await api.get('/seller/dashboard');
    return response.data;
  },

  async getProducts() {
    const response = await api.get('/seller/products');
    return response.data;
  },

  async storeProduct(data: any) {
    const response = await api.post('/seller/products', data);
    return response.data;
  },

  async updateProduct(id: string | number, data: any) {
    const response = await api.put(`/seller/products/${id}`, data);
    return response.data;
  },

  async getOrders() {
    const response = await api.get('/seller/orders');
    return response.data;
  }
};
