import { GET_TOKEN_ID } from '../actions/types';

const INITIAL_STATE = {
  tokenId: ''
};

function paymentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TOKEN_ID:
      return {
        ...state,
        tokenId: action.payload.id
      };

    default:
      return state;
  }
}

export default paymentReducer;
