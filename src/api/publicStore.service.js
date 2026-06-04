import axiosClient from "./axiosClient";

const STORE_ID = 244;
const STORE_SLUG = "perfumeria-angels";
const BRANCH_ID = 220;

const withBranch = (params = {}) => ({
  branch_id: BRANCH_ID,
  ...(params || {}),
});

const PublicStoreService = {
  getCategories(params = {}) {
    return axiosClient.get(`public/stores/${STORE_ID}/categories`, {
      params: withBranch(params),
    });
  },

  getProducts(params = {}) {
    return axiosClient.get(`public/stores/${STORE_ID}/products`, {
      params: withBranch(params),
    });
  },

  getProductDetail(productId, params = {}) {
    if (!productId) throw new Error("productId es requerido");

    return axiosClient.get(`public/stores/${STORE_ID}/products/${productId}`, {
      params: withBranch(params),
    });
  },

  getWhiteLabelLanding(params = {}) {
    return axiosClient.get(`public/white-label/${STORE_SLUG}/landing`, {
      params: withBranch(params),
    });
  },

  getWhiteLabelPicks(params = {}) {
    return axiosClient.get(`public/white-label/${STORE_SLUG}/picks`, {
      params: withBranch(params),
    });
  },

  getWhiteLabelSite(params = {}) {
    return axiosClient.get(`public/white-label/${STORE_SLUG}/site`, {
      params: withBranch(params),
    });
  },

  getPublicSite(params = {}) {
    return axiosClient.get(`public/tienda/${STORE_SLUG}/sitio`, {
      params: withBranch(params),
    });
  },

  constants: { STORE_ID, STORE_SLUG, BRANCH_ID },
};

export default PublicStoreService;