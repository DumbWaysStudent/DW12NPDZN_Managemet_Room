
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger, promise } from './middleware'

import room from '../_reducers/room'
import customer from '../_reducers/customer'
import user from '../_reducers/user'


const reducers = combineReducers({
    room,
    customer,
    user
})
  
const store = createStore(
  reducers,
  applyMiddleware(logger, promise));

export default store

