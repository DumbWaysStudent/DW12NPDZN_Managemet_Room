
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger, promise } from './middleware'

import room from '../_reducers/room'
import customer from '../_reducers/customer'

const reducers = combineReducers({
    room,
    customer
})
  
const store = createStore(
  reducers,
  applyMiddleware(logger, promise));

export default store

