import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dbloginbackend.vercel.app',
  withCredentials: true,
});

export default API;