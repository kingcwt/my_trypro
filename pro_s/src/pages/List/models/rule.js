import { queryRule, removeRule, addRule, updateRule } from '../../../services/api';
import {management_Func} from '../../../services/meth';
export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
      management_Data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    success(state,action){
      return {
        ...state,
        ...action
      }
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
