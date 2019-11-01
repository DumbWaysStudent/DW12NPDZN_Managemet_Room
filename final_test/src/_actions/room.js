import axios from 'axios'
import config from '../../config-env'

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri  
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

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

    export const addRoom = (token, name) => {
      return {
        type:  'ADD_ROOM',
        payload:  axios({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/room`,
          data: {
            name: name,
          }
        })
      }
    }

    export const editRoom = (token,name,roomId) => {
      return {
        type: 'EDIT_ROOM',
        payload: axios({
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/room/${roomId}`,
          data: {
            name: name,
          }
        })
      }
    }

    export const addCustomer = (token,name,identity_number,phone_number,photo) => {
      
      return {
        type: 'ADD_CUSTOMER',
        payload: axios({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/customer`,
          data: createFormData(photo,
            {
              name: name,
              identity_number: identity_number,
              phone_number: phone_number
            })
        })
      }
    }

    export const editCustomer = (token,customerId,name,identity_number,phone_number,photoEdit) => {
      return {
        type: 'EDIT_CUSTOMER',
        payload: axios({
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/customer/${customerId}`,
          data: createFormData(photoEdit,
            {
              name: name,
              identity_number: identity_number,
              phone_number: phone_number,
            }
            )
        })
      }
    }

    export const checkin = (token,roomId,customerId,duration) => {
      return {
        type: 'CHECKIN',
        payload: axios({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/checkin`,
          data: {
            room_id: roomId,
            customer_id: customerId,
            duration: duration
          }
        })
      }
    }

    export const checkout = (token,orderId) => {
      return {
        type: 'CHECKOUT',
        payload: axios({
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          url: `${config.API_URL}/order/${orderId}`
        })
      }
    }



    