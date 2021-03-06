import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { fakeAccountLogin, getFakeCaptcha,getUserInfo } from './service';
import { getPageQuery, setAuthority } from './utils/utils';
import {setToken} from "@/utils/LocalStorage";

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const nPayload = { ...payload, grant_type: `password` };
      const response = yield call(fakeAccountLogin, nPayload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response && response.access_token) {
        message.success('登录成功！');
        setToken(JSON.stringify(response));
        const currentUser = yield call(getUserInfo);
        if (!currentUser.data) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              code: 400,
              message: '无权登录',
              type: payload.type,
            },
          });
          return;
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
