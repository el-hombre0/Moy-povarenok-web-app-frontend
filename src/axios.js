import axios from 'axios'

/** Подключение к backend */
const instance = axios.create({
  baseURL: "http://45.12.238.14:8080",
});

/** Middleware для получения ответа от backend, авторизован user или нет 
 * Если token есть, то он отправляется в запрос на backend в заголовке аторизации
 * @return изменённая конфигурация axios
*/
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
