import {GET_TOKEN, SET_ERROR} from '../constants';

type initialStateType = {
  token: string;
  error: string;
};

export type action1Type = {
  type: typeof SET_ERROR;
  error: string;
};
export type action2Type = {
  type: typeof GET_TOKEN;
  token: string;
  error: string;
};

export type actionsAuthType = action1Type | action2Type;

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
