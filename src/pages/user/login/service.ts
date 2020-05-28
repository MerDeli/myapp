import request from 'umi-request';
import {API, APPNAME} from "@/utils/Api";
import {stringify} from 'qs';
import {getAccessToken, getToken} from "@/utils/LocalStorage";

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(param: LoginParamsType) {
  const params = {...param,'client_id':'admin',
    'client_secret':'admin123',
    'grant_type':'password',
    'scope':'all'}
  return request(`${APPNAME}${API.login.login.uri}`, {
    method: `${API.login.login.method}`,
    data: `${stringify(params)}`,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: 'Basic ' + btoa(`admin:admin123`).toString(),
    }
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

// 获取用户信息
export async function getUserInfo() {
  const accessToken = getAccessToken()
  return request(`${APPNAME}${API.login.getInfo.uri}`,{
    method: `${API.login.getInfo.method}`,
    headers:{
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: 'Bearer ' + accessToken,
      "accessToken" :  accessToken || "",
    }
  });
}
