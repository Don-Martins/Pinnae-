import api from './api';

export const marketplaceService = {
  async getProducts(params?: any) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProduct(slug: string) {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async getProjects() {
    const response = await api.get('/projects');
    return response.data;
  },

  async getProject(slug: string) {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  }
};
