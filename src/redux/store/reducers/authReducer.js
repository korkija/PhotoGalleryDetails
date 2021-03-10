import {GET_TOKEN, SET_ERROR} from '../constants';

const initialState = {
  token: '',
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
        error: action.error,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
