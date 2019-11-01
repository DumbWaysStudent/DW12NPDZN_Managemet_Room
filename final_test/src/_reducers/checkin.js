const initialState = {
    order: [],
    error: null,
    isLoading: true,
  }
  
  const order = (state = initialState, action) => {
    switch (action.type) {
      case `GET_ORDERS_PENDING`:
        return {
          ...state,
          isLoading: true,
        };
      case `GET_ORDERS_FULFILLED`:
        return {
          ...state,
          order: action.payload.data,
          isLoading: false,
        };
      case `GET_ORDERS_REJECTED`:
        return {
          ...state,
          error: true,
          isLoading: false,
        };
      case `CHECKIN_PENDING`:
        return {
          ...state,
          isLoading: true,
        };
      case `CHECKIN_FULFILLED`:
        return {
          ...state,
          order: action.payload.data,
          isLoading: false,
        };
      case `CHECKIN_REJECTED`:
        return {
          ...state,
          error: true,
          isLoading: false,
        };
      case `CHECKOUT_PENDING`:
        return {
          ...state,
          isLoading: true,
        };
      case `CHECKOUT_FULFILLED`:
        return {
          ...state,
          order: action.payload.data,
          isLoading: false,
        };
      case `CHECKOUT_REJECTED`:
        return {
          ...state,
          error: true,
          isLoading: false,
        };
      
      default:
        return state;
    }
  }
  
  export default order