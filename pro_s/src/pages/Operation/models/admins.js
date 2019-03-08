import { queryRule, removeRule, addRule, updateRule } from '../../../services/api';
import {management_Func,management_RemoveFunc} from '../../../services/meth';
export default {
  namespace: 'admin',

  state: {
    data: {
      list: [],
      pagination: {},
      management_Data:undefined,
      info:{}
    },
  },

  effects: {
    *adminManagement({payload},{call,put}){
      const response=yield call(management_Func,payload);
      if(response.statusCode===1){
        yield put({
          type:'success',
          payload:{
            management_Data:response.adminArr
          }
        })
      }
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
      const response = yield call(management_RemoveFunc, payload);
      console.log(response,'-----0');
      if(response.statusCode===1){
        console.log(response.adminArr,'删除返回的信息');
        yield put({
          type: 'success',
          info:response
        });
      }

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
        ...action.payload
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
