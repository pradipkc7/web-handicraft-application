export const API = {
  AUTH: {
    REGISTER: "/api/v1/users/register",
    LOGIN: "/api/v1/users/login",
    WHOAMI: "/api/v1/users/whoami",
    UPDATE: "/api/v1/users/update",
    CHANGE_PASSWORD: "/api/v1/users/change-password",
    FORGOT_PASSWORD: "/api/v1/users/forgot-password",
    RESET_PASSWORD: "/api/v1/users/reset-password",
  },
  PRODUCTS: {
    GET_ALL: "/api/v1/products",
    GET_BY_ID: (id: string) => `/api/v1/products/${id}`,
    GET_FEATURED: "/api/v1/products/featured",
    GET_CATEGORIES: "/api/v1/products/categories",
  },
  ADMIN: {
    USERS: {
      GET_ALL: "/api/v1/admin/users",
      GET_BY_ID: (id: string) => `/api/v1/admin/users/${id}`,
      CREATE: "/api/v1/admin/users",
      UPDATE: (id: string) => `/api/v1/admin/users/${id}`,
      UPDATE_PASSWORD: (id: string) => `/api/v1/admin/users/${id}/password`,
      DELETE: (id: string) => `/api/v1/admin/users/${id}`,
    },
    PRODUCTS: {
      GET_ALL: "/api/v1/admin/products",
      GET_BY_ID: (id: string) => `/api/v1/admin/products/${id}`,
      CREATE: "/api/v1/admin/products",
      UPDATE: (id: string) => `/api/v1/admin/products/${id}`,
      DELETE: (id: string) => `/api/v1/admin/products/${id}`,
    },
  },
  FILE: {
    UPLOAD: "/api/v1/file/upload",
  },
  CART: {
    GET: "/api/v1/cart",
    ADD: "/api/v1/cart",
    CLEAR: "/api/v1/cart",
  },
  ORDERS: {
    CREATE: "/api/v1/orders",
    GET_ALL: "/api/v1/orders",
    VERIFY_PAYMENT: "/api/v1/orders/verify-payment",
  },
  CONTACT: {
    SEND: "/api/v1/contact",
  },
};
