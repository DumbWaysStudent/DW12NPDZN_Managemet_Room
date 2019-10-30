const initialState = {
    customer: [],
    error: null,
    isLoading: true,
  }
  
  const customer = (state = initialState, action) => {
    switch (action.type) {
      case `GET_CUSTOMERS_PENDING`:
        return {
          ...state,
          isLoading: true,
        };
      case `GET_CUSTOMERS_FULFILLED`:
        return {
          ...state,
          customer: action.payload.data,
          isLoading: false,
        };
      case `GET_CUSTOMERS_REJECTED`:
        return {
          ...state,
          error: true,
          isLoading: false,
        };
      case `ADD_CUSTOMER_PENDING`:
          return {
            ...state,
            isLoading: true,
          };
      case `ADD_CUSTOMER_FULFILLED`:
        return {
          ...state,
          customer: state.customer.concat(action.payload.data.data),
          isLoading: false,
        };
      case `ADD_CUSTOMER_REJECTED`:
        return {
          ...state,
          error: true,
          isLoading: false,
        };
      default:
        return state;
    }
  }
  
  export default customer