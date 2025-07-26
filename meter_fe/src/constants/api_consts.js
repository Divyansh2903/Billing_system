
export const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
// export const API_BASE ="http://localhost:3000/api";


export const API_ENDPOINTS = {
  GET_READING: `${API_BASE}/meter/get-reading`,
  CREATE_ORDER: `${API_BASE}/razorpay/create-order`,
  UPLOAD_URL: `${API_BASE}/upload/upload-url`,
  GET_DASHBOARD_DATA: `${API_BASE}/dashboard/get-data`,
};
