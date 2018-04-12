import Immutable from 'immutable'
import { combineReducers } from 'redux';
import * as ActionTypes from '../ActionTypes';
import { createReducer } from '../lib/utils';
const Resource = 'session'

const initialState = Immutable.fromJS({
  resource: null,
  isRequesting: false,
  isSuccessed: false,
  error: null
})

export default createReducer(initialState, {

  [`FETCH_${Resource.toLocaleUpperCase()}_REQUEST`](state, action) {
    return state.withMutations(map => {
      map.set('isRequesting', true)
    })
  },

  [`FETCH_${Resource.toLocaleUpperCase()}_SUCCESS`](state, action) {
    return state.withMutations(map => {
      map.set('isRequesting', false)
        .set('isSuccessed', true)
        .set('resource', action.payload.data)
    })
  },

  [`FETCH_${Resource.toLocaleUpperCase()}_FAILURE`](state, action) {
    return state.withMutations(map => {
      const error = action.payload.error
      map.set('isRequesting', false)
        .set('isSuccessed', false)
        .set('error', error)
    })
  },
})
