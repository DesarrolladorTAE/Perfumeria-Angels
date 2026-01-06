import axiosClient from "./axiosClient";

const STORE_ID = 244;
const STORE_SLUG = "perfumeria-angels";

const PublicStoreService = {
  // GET /public/stores/244/categories
  getCategories() {
    return axiosClient.get(`public/stores/${STORE_ID}/categories`);
  },

  // GET /public/stores/244/products
  // (si mañana le agregas filtros tipo ?q= o ?category=, aquí lo conectas)
  getProducts(params = {}) {
    return axiosClient.get(`public/stores/${STORE_ID}/products`, { params });
  },

  // GET /public/stores/244/products/{productId}
  getProductDetail(productId) {
    if (!productId) throw new Error("productId es requerido");
    return axiosClient.get(`public/stores/${STORE_ID}/products/${productId}`);
  },

  // GET /public/tienda/perfumeria-angels/sitio
  getPublicSite() {
    return axiosClient.get(`public/tienda/${STORE_SLUG}/sitio`);
  },

  // por si algún día cambias de tienda (milagro), aquí los consultas
  constants: { STORE_ID, STORE_SLUG },
};

export default PublicStoreService;
