import request from 'umi-request';
import {API, APPNAME} from "@/utils/Api";

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // const params = {...param,'client_id':'admin',
  //   'client_secret':'admin123',
  //   'grant_type':'password',
  //   'scope':'all'}
  return request(`${APPNAME}${API.login.login.uri}`, {
    method: `${API.login.login.method}`,
    data: params,
    headers:{
      Authorization: 'Basic ' + btoa(`admin:admin123`).toString(),
    }
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
