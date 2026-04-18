import api from './api';

export const adminService = {
  async getDashboard() {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  async getUsers() {
    const response = await api.get('/admin/users');
    return response.data;
  },

  async updateUserRole(id: string | number, role: string) {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  async storeCategory(name: string) {
    const response = await api.post('/admin/categories', { name });
    return response.data;
  },

  async storeProduct(data: any) {
    const response = await api.post('/admin/products', data);
    return response.data;
  },

  async deleteProduct(id: string | number) {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  }
};
