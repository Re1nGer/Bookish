import axios from 'axios';
import { Platform } from 'react-native';


const instance = axios.create({
  baseURL: Platform.OS === 'android' ? "http://10.0.2.2:5085/" : 'http://localhost:5085/', //dev env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;

