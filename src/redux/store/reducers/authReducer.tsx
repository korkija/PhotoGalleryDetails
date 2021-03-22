import {GET_TOKEN, SET_ERROR} from '../constants';

type initialStateType = {
  token: string;
  error: string;
};

export type actionErrorType = {
  type: typeof SET_ERROR;
  error: string;
};
export type actionTokenType = {
  type: typeof GET_TOKEN;
  token: string;
  error: string;
};

export type actionsAuthType = actionTokenType | actionErrorType;

const initialState: initialStateType = {
  token: '',
  error: '',
};

export const authReducer = (state = initialState, action: actionsAuthType) => {
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
