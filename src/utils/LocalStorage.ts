import {LOGIN_TOKEN_KEY} from "@/utils/Api";


// 获取本地token内容
export function getToken() {
  return localStorage.getItem(LOGIN_TOKEN_KEY);
}

// 设置本地Token内容
export function setToken(token) {
  localStorage.setItem(LOGIN_TOKEN_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(LOGIN_TOKEN_KEY);
}

// 获取访问令牌
export function getAccessToken() {
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);
  const { access_token } = { ...JSON.parse(token) };
  return access_token;
}
