import { checkResponseData, checkHttpStatus, parseJSON, getLocalToken } from './utils';
import config from '../config'

function getUrl(path, params={}) {
  if(_.isEmpty(params)) {
    return `${config.apiRoot}${path}`
  } else {
    _.each(params, (v, k) => {
      if(!v) {
        delete params[k]
      }
    })
    const queryString = _.map(params, (v, k) => {
      if(v !== 'all') {
        return `${k}=${v}`
      }
    }).filter((e) => (e !== '')).join('&')
    return `${config.apiRoot}${path}?${queryString}`
  }
}

function getHeaders(token) {
  if(token) {
    return {
      'x-auth-token': token,
      'content-type': 'application/json',
    }
  } else {
    return {
      'content-type': 'application/json',
    }
  }
}

const HttpClient = {

  get: (path, params) => new Promise((resolve, reject) => {
    fetch(getUrl(path, params), {
      headers: getHeaders(getLocalToken())
    })
    .then(parseJSON)
    .then(checkResponseData)
    .then(response => {
       resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  }),

  put: (path, payload) => new Promise((resolve, reject) => {
    fetch(getUrl(path), {
      method: 'put',
      headers: getHeaders(getLocalToken()),
      body: JSON.stringify(payload),
    })
    .then(parseJSON)
    .then(checkResponseData)
    .then(response => {
       resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  }),
  post: (path, payload) => new Promise((resolve, reject) => {
    fetch(getUrl(path), {
      method: 'post',
      headers: getHeaders(getLocalToken()),
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    })
    .then(parseJSON)
    .then(checkResponseData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  }),
  delete: (path) => new Promise((resolve, reject) => {
    fetch(getUrl(path), {
      method: 'delete',
      headers: getHeaders(getLocalToken()),
    })
    .then(response => {
       resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  }),

};

export default HttpClient;
