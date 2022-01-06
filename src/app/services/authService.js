import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../../config.json";
import http from "./httpService";
import { roleNames } from "../../config.json";

const apiEndpoint = apiUrl + "user/";
const jwtKeyName = "jwt";

http.setJwtHeader(getJwt());

export async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint + "login", {
    email,
    password,
  });

  if (data.roleName !== roleNames.admin && data.roleName !== roleNames.shipper)
    return null;

  localStorage.setItem(jwtKeyName, data.token);
  http.setJwtHeader(data.token);

  return data.token;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(jwtKeyName, jwt);
}

export function logout() {
  localStorage.removeItem(jwtKeyName);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(jwtKeyName);
    if (jwt) {
      const user = jwtDecode(jwt);
      return user;
    }
  } catch (ex) {
    return null;
  }

  return null;
}

export function getJwt() {
  const jwt = localStorage.getItem(jwtKeyName);
  return jwt;
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default auth;
