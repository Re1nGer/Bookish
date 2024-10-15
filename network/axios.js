import axios from 'axios';


const instance = axios.create({
  baseURL: "http://164.92.195.88/", //dev env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;

