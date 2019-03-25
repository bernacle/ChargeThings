import { DO_PAYMENT, GET_TOKEN_ID } from './types';
import * as API from '../utils/api';

export const fetchToken = card => {
  return dispatch => {
    API.getToken(card)
      .then(res => {
        dispatch({ type: GET_TOKEN_ID, payload: res });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
