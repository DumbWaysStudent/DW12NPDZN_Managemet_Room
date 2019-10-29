import axios from 'axios'
import config from '../../config-env'


export const getRoom = (token) => {
    return {
      type: 'GET_ROOMS',
      payload: axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
        url: `${config.API_URL}/rooms`
      })
    }}
  
export const getCustomer = (token) => {
  return {
    type: 'GET_CUSTOMERS',
    payload: axios({
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
        },
      url: `${config.API_URL}/customers`
    })
  }}

  export const getOrder = (token) => {
    return {
      type: 'GET_ORDERS',
      payload: axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
        url: `${config.API_URL}/checkin`
      })
    }}
