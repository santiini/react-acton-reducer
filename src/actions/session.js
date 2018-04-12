import {Request, Success, Failure} from './pureAction'
import { setLocalToken, removeLocalToken } from '../lib/utils';
import { push } from 'react-router-redux'
import HttpClient from '../lib/httpClient'
import config from '../config'
const Resource = 'session'
import api  from '../lib/api'

export function fetch() {
  return async(dispatch, state) => {
    dispatch(Request(Resource, 'FETCH'))
    try {
      const response = await api.social.get(`/${Resource}`)
      // session 的数据结构处理
      dispatch(Success(response.data, Resource, 'FETCH'))

     if(state().routing.locationBeforeTransitions.pathname !== '/kol/app') return
      const teams = _.map(response.data.joins, (v, k) => v)
      let teamId
      if(localStorage.getItem('current_team')) {
        teamId = localStorage.getItem('current_team')
      } else {
        teamId = teams[0].id
      }
      const currentTeam = _.find(teams, v => v.id === +teamId)
      const disabledModules = currentTeam.permission.disabledModules ? currentTeam.permission.disabledModules : []
      const defaultModule = !disabledModules.includes('planning') ? 'planning' : 'campaign'
      const refer = sessionStorage.getItem('refer')
      const path = refer ? refer : `/kol/app/team/${teamId}/ranking`
      dispatch(push(path))
      sessionStorage.removeItem('refer')
    } catch(error) {
      dispatch(Failure(error, Resource, 'FETCH'))
      //removeLocalToken()
      location.href = `${location.origin}/kol/signin`
    }
  }
}

export function add(code) {
  return (dispatch, state) => {
    dispatch(Request(Resource, 'ADD'))
    const promise = HttpClient.post(`/${Resource}`, {client_id: config.oAuth.ClientId, code: code})
    .then(response => {
      dispatch(Success(response, Resource, 'ADD'))

      //及策埋点
      _jcq.push(['_track', "login"])

      setLocalToken(response)
      dispatch(push('/kol/app'))
    })
    .catch(error => {
      dispatch(Failure(error, Resource, 'ADD'))
      dispatch(push('/kol/signin'))
    })
  }
}
