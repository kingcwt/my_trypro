var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var CryptoJS = require("crypto-js");
var store = require('store');

export const  APIHost ='http://192.168.1.124:3000';

export var defaultParams = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
};

/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
    return fetch(url, {
        ...defaultParams,
        method: 'get'
    });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {

    return fetch(url, {
        ...defaultParams,
        method: 'post',
        body: JSON.stringify(body)
    });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {

    return fetch(url, {
        ...defaultParams,
        method: 'put',
        body: JSON.stringify(body)
    });
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
    return fetch(url, {
        ...defaultParams,
        method: 'delete'
    });
}

/************************************* token **********************************/
/**
 * HTTP GET
 * @param  {string} url
 * @param  {string} token
 * @return {Promise}
 */
export function read_Token(url,token) {
  defaultParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':token
    };
    return fetch(url, {
        ...defaultParams,
        method: 'get'
    });
}

export function creat_Token2(url,token,body={}) {
    defaultParams.headers = {
        'Authorization':token
    };
    return fetch(url, {
        //...defaultParams,
        method: 'post',
        body: body,
    });
    /*return fetch(url, {
      headers: {
        'Authorization':token,
      },
      method: 'post',
      body: body
    });*/
}

export function creat_Token(url,token,body={}) {
    defaultParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':token
    };
    return fetch(url, {
        ...defaultParams,
        method: 'post',
        body: JSON.stringify(body)
    });
}

export function delete_Token(url,token) {
    defaultParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':token
    };
    return fetch(url, {
        ...defaultParams,
        method: 'delete'
    });
}

export function update_Token(url,token,body={}) {
    defaultParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':token
    };
    return fetch(url, {
        ...defaultParams,
        method: 'put',
        body: body
    });
}


export function uploadImg_Token(url,body) {
    return fetch(url, {
        method: 'post',
        body: body,
    });
}



export function getAuth(url,username,password){
  if(!password&&!store.get("user")){return null}
  var pass = AES.encrypt(url+":"+new Date().getTime(), (password? HmacMD5(password,password).toString() : store.get("user").password));
  return "bearer "+(username? username : store.get("user").username)+":"+pass+':admin';

}

//登陆
// export function login(username,password, type=1){
//   var pasd = CryptoJS.MD5(CryptoJS.SHA1(password)+'Mt&*R_r`>D*vK~V=W{OF?%W`}!!qptkmStyP$po<FhM^J$,;z(iYvWw<{<_|Lis[')+"";
//   store.set("user",{username:username, password:CryptoJS.HmacMD5(pasd,pasd).toString(), type: type});
// }
export function SOTORE_LOGIN(username,password){
    store.set("user",{username:username,password:HmacMD5(password,password).toString()});
}

// export function login2(data, type=1){
//   store.set("user",{username:data.userName, password:data.password, type: type});
// }

// //登出
export function loginOut(){
    store.remove("user");
}

export function loggedIn() {
    var user = store.get("user");
    if(!!user){
        return user
    }else{
        return false;
    }
}

