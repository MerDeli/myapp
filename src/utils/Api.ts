export const APPNAME = 'interface-test';

export const LOGIN_TOKEN_KEY = 'accessToken';

export const API = {
  login:{
    login:{
      uri:'/auth/oauth/token',
      method:'post'
    },
    getInfo:{
      uri:'/auth/sso/getInfo',
      method:'get'
    },
  }
}


