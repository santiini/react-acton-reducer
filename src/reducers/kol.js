import { createReducer } from '../lib/utils';

const initialState = {
  total: 0,
  data: [],
  fetchError: null,
  fetchPending: false,
}

const Resource = 'kol'

export default createReducer(initialState, {
  [`FETCH_KOL_REQUEST`](state, action) {
    return {
      ...state,
      fetchPending: true,
      fetchError: null,
    }
  },
  [`FETCH_KOL_SUCCESS`](state, action) {
    return {
      ...state,
      fetchPending: false,
      fetchError: null,
      data: action.payload.data.data,
      total: action.payload.data.headers['x-content-record-total'],
    }
  },

  [`FETCH_KOL_FAILURE`](state, action) {
    return {
      ...state,
      fetchPending: false,
      fetchError: action.payload.error.error,
    }
  },

  [`ADD_${Resource.toLocaleUpperCase()}_REQUEST`](state, action) {
    return {
      ...state,
      fetchPending: true,
      fetchError: null,
    }
  },

  [`ADD_${Resource.toLocaleUpperCase()}_SUCCESS`](state, action) {
    return {
      ...state,
      fetchPending: false,
      fetchError: null,
      data: [action.payload.data.data],
      total: 1,
    }
  },

  [`ADD_${Resource.toLocaleUpperCase()}_FAILURE`](state, action) {
    return {
      ...state,
      fetchPending: false,
      fetchError: action.payload.error.error,
    }
  },
})
