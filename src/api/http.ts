import axios from 'axios';
import { io } from 'socket.io-client';

const instance = axios.create({
  baseURL: 'https://linkstagram-api.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export const socket = io(''https://linkstagram-api.onrender.com');

export default instance;
