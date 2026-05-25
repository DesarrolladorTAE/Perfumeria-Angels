import axiosClient from "./axiosClient";

const STORE_ID = 244;
const STORE_SLUG = "perfumeria-angels";

const PublicStoreService = {
  // GET /public/stores/244/categories
  getCategories() {
    return axiosClient.get(`public/stores/${STORE_ID}/categories`);
  },

  // GET /public/stores/244/products
  getProducts(params = {}) {
    return axiosClient.get(`public/stores/${STORE_ID}/products`, { params });
  },

  // GET /public/stores/244/products/{productId}
  getProductDetail(productId) {
    if (!productId) throw new Error("productId es requerido");
    return axiosClient.get(`public/stores/${STORE_ID}/products/${productId}`);
  },

  // GET /public/white-label/perfumeria-angels/landing
  getWhiteLabelLanding(params = {}) {
    return axiosClient.get(`public/white-label/${STORE_SLUG}/landing`, {
      params: params || {},
    });
  },

  // GET /public/tienda/perfumeria-angels/sitio
  getPublicSite() {
    return axiosClient.get(`public/tienda/${STORE_SLUG}/sitio`);
  },

  constants: { STORE_ID, STORE_SLUG },
};

export default PublicStoreService;