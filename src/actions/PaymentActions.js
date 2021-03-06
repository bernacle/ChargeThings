import { DO_PAYMENT, GET_TOKEN_ID, ERROR } from './types';
import * as API from '../utils/api';

export const fetchToken = card => {
  return dispatch => {
    API.getToken(card)
      .then(res => {
        dispatch({ type: GET_TOKEN_ID, payload: res });
      })
      .catch(err => {
        //dispatch({ type: ERROR, payload: err });
      });
  };
};

export const doPayment = paymentBody => {
  return dispatch => {
    API.pay(paymentBody)
      .then(res => {
        dispatch({ type: DO_PAYMENT, payload: res });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
