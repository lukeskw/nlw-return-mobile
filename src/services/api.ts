import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.18.3:3333',
  timeout: 5000
})