
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Session recording functions
const createSession = () => axiosInstance.post('/sessions');
const saveSessionChunk = (sessionId, events) =>
  axiosInstance.post(`/sessions/${sessionId}/chunks`, { events });

// User authentication
const login = (credentials) => axiosInstance.post('/auth/login', credentials);
const signup = (userInfo) => axiosInstance.post('/auth/signup', userInfo);
const logout = () => axiosInstance.post('/auth/logout');

// Session data
const saveSession = (sessionData) => axiosInstance.post('/sessions', sessionData);
const getSessions = () => axiosInstance.get('/sessions');
const getSessionById = (sessionId) => axiosInstance.get(`/sessions/${sessionId}`);

// Current user
const getCurrentUser = () => axiosInstance.get('/user/me');

// Final API object
const apiService = {
  login,
  signup,
  logout,
  saveSession,
  getSessions,
  getSessionById,
  getCurrentUser,
  createSession,
  saveSessionChunk,
  post: axiosInstance.post,
  get: axiosInstance.get,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default apiService;
