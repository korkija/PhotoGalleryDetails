import {GET_TOKEN, GET_TOKEN_IS_LOADING} from '../constants';

const initialState = {
  token: '',
  tokenIsLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case GET_TOKEN_IS_LOADING:
      return {
        ...state,
        tokenIsLoading: action.tokenIsLoading,
      };

    default:
      return state;
  }
};
