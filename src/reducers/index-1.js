import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import session from './session'
import team from './team'
import site from  './site'
import employee from './employee'
import planning from './planning'
import planningDetail from './planningDetail'
import kolFansDistribution from './kolFansDistribution'
import ta from './ta'
import campaign from './campaign'
import campaignKol from './campaignKol'
import campaignContent from './campaignContent'
import kolContent from './kolContent'
import kol from './kol'
import kolDetail from './kolDetail'
import result from './result'
import benchmark from './benchmark'
import notification from './notification'
import organization from './organization'
import task from './task'
import taskResult from './taskResult'
import consumerlog from './consumerlog'

const rootReducer = combineReducers({
  routing,
  notification,
  session,
  team,
  site,
  employee,
  planning,
  planningDetail,
  kolFansDistribution,
  ta,
  campaign,
  campaignKol,
  campaignContent,
  kolContent,
  kol,
  kolDetail,
  result,
  benchmark,
  organization,
  task,
  taskResult,
  consumerlog,
})

export default rootReducer
