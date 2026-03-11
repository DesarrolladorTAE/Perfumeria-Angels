import axiosClient from "./axiosClient";

const STORE_ID = 244;
const STORE_SLUG = "perfumeria-angels";
const BRANCH_ID = 220;

const PublicStoreService = {

  /* =========================
   CATEGORÍAS
  ========================= */

  // GET /public/stores/244/categories
  getCategories() {
    return axiosClient.get(`public/stores/${STORE_ID}/categories`);
  },

  /* =========================
   PRODUCTOS
  ========================= */

  // GET /public/stores/244/products
  getProducts(params = {}) {
    return axiosClient.get(`public/stores/${STORE_ID}/products`, { params });
  },

  // GET /public/stores/244/products/{productId}
  getProductDetail(productId) {
    if (!productId) throw new Error("productId es requerido");
    return axiosClient.get(`public/stores/${STORE_ID}/products/${productId}`);
  },

  /* =========================
   SITIO PÚBLICO
  ========================= */

  // GET /public/tienda/perfumeria-angels/sitio
  getPublicSite() {
    return axiosClient.get(`public/tienda/${STORE_SLUG}/sitio`);
  },

  /* =========================
   LANDING CATEGORY
  ========================= */

  // GET /public/white-label/perfumeria-angels/landing
  getLandingCategory(storeSlug = STORE_SLUG, branchId = BRANCH_ID, perPage = 20) {
    const params = {};

    if (branchId !== null && branchId !== undefined) params.branch_id = branchId;
    if (perPage) params.per_page = perPage;

    return axiosClient.get(`public/white-label/${storeSlug}/landing`, { params });
  },

  /* =========================
   PROMOCIONES
  ========================= */

  // GET /branches/{branchId}/promotions
  getPromotions(branchId = BRANCH_ID, params = {}) {
    return axiosClient.get(`branches/${branchId}/promotions`, { params });
  },

  // GET /branches/{branchId}/promotions/{slug}
  getPromotionDetail(slug, branchId = BRANCH_ID) {
    if (!slug) throw new Error("slug es requerido");

    return axiosClient.get(`branches/${branchId}/promotions/${slug}`);
  },

  /* =========================
   CONSTANTES
  ========================= */

  constants: {
    STORE_ID,
    STORE_SLUG,
    BRANCH_ID,
  },
};

export default PublicStoreService;