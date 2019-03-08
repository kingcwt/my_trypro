import { query as queryUsers, queryCurrent } from '../services/user';
import {personInfo_Func} from '../services/meth';
export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    personal_Info:{}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *info(_,{call,put}){
      const response=yield call(personInfo_Func);
      if(response.statusCode===1){
        yield put({
          type:'SUCCESS',
          payload:{
            personal_Info:response.user
          }
        })
      }

    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    SUCCESS(state,action){
      return{
        ...state,
        ...action.payload,
      }
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
