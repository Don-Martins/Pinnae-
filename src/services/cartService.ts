import api from './api';

export const cartService = {
  async getCart() {
    const response = await api.get('/cart');
    return response.data;
  },

  async addProduct(productId: string | number, quantity: number = 1) {
    const response = await api.post('/cart/add-product', { product_id: productId, quantity });
    return response.data;
  },

  async addBundle(bundleId: string | number) {
    const response = await api.post('/cart/add-bundle', { bundle_id: bundleId });
    return response.data;
  },

  async updateQuantity(itemId: string | number, quantity: number) {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  async removeProduct(itemId: string | number) {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  async clearCart() {
    const response = await api.post('/cart/clear');
    return response.data;
  }
};
