import axios from 'axios';
import { io } from 'socket.io-client';

const instance = axios.create({
  baseURL: 'http://18.194.78.176:4444/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export const socket = io('http://18.194.78.176:4444');

export default instance;
