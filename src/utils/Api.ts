export const APPNAME = 'interface-test';

export const LOGIN_TOKEN_KEY = 'accessToken';

export const API = {
  login:{
    login:{
      uri:'/secur/oauth/token',
      method:'post'
    },
    getInfo:{
      uri:'/secur/sso/getInfo',
      method:'get'
    },
  },
  // auth:{
  //   account:{
  //     getInfo:{
  //       uri:'/auth/sso/getInfo',
  //       method:'get'
  //     },
  //   }
  // }
}


