import axios from 'axios'

/** Подключение к backend */
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export default instance;
