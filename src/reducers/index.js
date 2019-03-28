import { GET_TOKEN_ID, DO_PAYMENT } from '../actions/types';

const INITIAL_STATE = {
  tokenId: '',
  paymentResponse: {}
};

function paymentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TOKEN_ID:
      return {
        ...state,
        tokenId: action.payload.id
      };

    case DO_PAYMENT:
      return {
        ...state,
        paymentResponse: action.payload
      };

    default:
      return state;
  }
}

export default paymentReducer;
