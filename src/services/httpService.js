import axios from 'axios';
import { toast } from 'react-toastify';
import TOKEN_KEY from './tokenKey'; 

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(TOKEN_KEY);

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("An unexpected error occurrred.");
  return Promise.reject(error);
});
 
export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
    put: axios.put
};
