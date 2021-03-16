import http from "./httpService";
import { apiURL } from "../components/config.json";
import jwtDecode from "jwt-decode";
import TOKEN_KEY from './tokenKey';
  
const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
 
const login = async (email, password) => {
    console.log("url:",apiURL);
    const { data } = await http.post(`${apiURL}/auth`, { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
}

const createUser = async (name, email, password) => {
  await http.post(`${apiURL}/users`, {name, password, email});
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export default {
  login,
  getCurrentUser,
  createUser,
  logout,  
};