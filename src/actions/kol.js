import {Request, Success, Failure} from './pureAction'
import { pushNotification } from './notification'
import { returnNotifyMsgByResponse } from '../lib/utils'
import api  from '../lib/api'
const Resource = 'kol'

export function fetch(params) {
  return async dispatch => {
    dispatch(Request(Resource, 'FETCH'))
    try {
      const ret = await api.instance.get('/kols', {params})
      dispatch(Success(ret, Resource, 'FETCH'))
    } catch (error) {
      dispatch(Failure(error, Resource, 'FETCH'))
    }
  }
}

export function fetchbabytree(params) {
  const query = Object.assign({}, params)
  delete query.platform
  return async dispatch => {
    dispatch(Request(Resource, 'FETCH'))
    try {
      const ret = await api.instance.get('/bbtkols', { params: query })
      dispatch(Success(ret, Resource, 'FETCH'))
    } catch (error) {
      dispatch(Failure(error, Resource, 'FETCH'))
    }
  }
}

export function fetchzhihu(params) {
  const query = Object.assign({}, params)
  delete query.platform
  return async dispatch => {
    dispatch(Request(Resource, 'FETCH'))
    try {
      const ret = await api.instance.get('/zhihukols', { params: query })
      dispatch(Success(ret, Resource, 'FETCH'))
    } catch (error) {
      dispatch(Failure(error, Resource, 'FETCH'))
    }
  }
}

export function fetchlive(params) {
  const query = Object.assign({}, params)
  delete query.platform
  query.insertDate = moment().format('YYYY-MM-DD')
  return async dispatch => {
    dispatch(Request(Resource, 'FETCH'))
    try {
      const ret = await api.instance.get('/livekols', { params: query })
      dispatch(Success(ret, Resource, 'FETCH'))
    } catch (error) {
      dispatch(Failure(error, Resource, 'FETCH'))
    }
  }
}

export function detail(params) {
  return async dispatch => {
    dispatch(Request(Resource, 'DETAIL'))
    try {
      const ret = await api.instance.get(`/kols/${params.kolId}`)
      dispatch(Success(ret, Resource, 'DETAIL'))
    } catch (error) {
      dispatch(Failure(error, Resource, 'DETAIL'))
    }
  }
}

export function add(data) {
  return async dispatch => {
    try {
      dispatch(Request(Resource, 'ADD'))
      let added = await api.instance.post('/kols', data)
      dispatch(Success(added, Resource, 'ADD'))
    } catch (error) {
      let res = returnNotifyMsgByResponse(error)
      dispatch(pushNotification({
         type: 'error',
         text: res.msg,
      }))
    }
  }
}
