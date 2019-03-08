import * as fetchs from '../utils/fetch';
import store from 'store';
export  function regFunc(params) {
  return fetchs.create(fetchs.APIHost + '/admin/reg',params)
    .then(response => response.json()).then(json => json);
}

export  function logAPI(params) {
    return fetchs.read_Token(fetchs.APIHost + '/admin/log',fetchs.getAuth(fetchs.APIHost+'/admin/log',params.username,params.pwd))
      .then(response => response.json()).then(json => json);
}

export function personInfo_Func() {
  return fetchs.read_Token(fetchs.APIHost+'/admin/log',fetchs.getAuth(fetchs.APIHost+'/admin/log')).then(response=>response.json()).then(json=>json);
}

/*获取*/
export function management_Func() {
  return fetchs.read_Token(fetchs.APIHost+'/admin/get/management',fetchs.getAuth(fetchs.APIHost+'/admin/get/management')).then(response=>response.json()).then(json=>json);
}
/*删除*/
export function management_RemoveFunc(params) {
  return fetchs.creat_Token(fetchs.APIHost+'/admin/post/remove_management',fetchs.getAuth(fetchs.APIHost+'/admin/post/remove_management'),params).then(response=>response.json()).then(json=>json);
}


/*修改信息*/
export function management_EditFunc(params) {
  return fetchs.creat_Token(fetchs.APIHost+'/admin/post/edit_management',fetchs.getAuth(fetchs.APIHost+'/admin/post/edit_management'),params).then(response=>response.json()).then(json=>json);
}

/*搜索*/
export function management_SearchFunc(params) {
  return fetchs.creat_Token(fetchs.APIHost+'/admin/post/search_management',fetchs.getAuth(fetchs.APIHost+'/admin/post/search_management'),params).then(response=>response.json()).then(json=>json);
}
