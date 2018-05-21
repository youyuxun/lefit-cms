import isEmpty from 'lodash/isEmpty';
import { GET_ADMIN_USER_INFO, GET_ADMIN_USER_RIGHTS, LOGOUT } from '../services/common';
import { isUrl } from '../utils/utils';

function _formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
// format menuData
function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      name: item.pname,
      icon: item.ico_key,
      hideInMenu: item.is_menu !== 1,
      path: `${parentPath}${item.route_path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.child && item.child.length) {
      result.children = formatter(item.child, `${parentPath}${item.route_path}/`, item.authority);
    }
    return result;
  });
}

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    menuData: [],
    currentUser: {},
  },

  effects: {
    *fetchUserInfo(_, { call, put, select }) {
      const global = yield select(state => state.global);
      if (isEmpty(global.currentUser)) {
        const res = yield call(GET_ADMIN_USER_INFO);
        if (res.status.code === '00000') {
          yield put({
            type: 'saveUserInfo',
            payload: {
              currentUser: res.result.info,
            },
          });
        }
      }
    },
    *fetchMenuData(_, { call, put, select }) {
      const global = yield select(state => state.global);
      if (global.menuData && global.menuData.length) return;
      const res = yield call(GET_ADMIN_USER_RIGHTS);
      if (res.status.code === '00000') {
        const menu = [].concat(res.result.menu_tree);
        const menuData = formatter(menu);
        yield put({
          type: 'saveMenuData',
          payload: {
            menuData,
          },
        });
      }
    },
    *logout({ payload }, { call }) {
      const res = yield call(LOGOUT, payload);
      if (res.code === 0) {
        window.location.href = res.redirect;
      } else {
        throw res;
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveMenuData(state, { payload }) {
      return {
        ...state,
        menuData: payload.menuData,
      };
    },
    saveUserInfo(state, { payload }) {
      return {
        ...state,
        currentUser: payload.currentUser,
      };
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        // 获取menuData
        dispatch({
          type: 'fetchMenuData',
        });
        dispatch({
          type: 'fetchUserInfo',
        });
      });
    },
  },
};
