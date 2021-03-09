import {getAuth} from '../../../api/api';
import {GET_TOKEN, GET_TOKEN_IS_LOADING} from '../constants';

export const getToken = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOKEN_IS_LOADING,
      tokenIsLoading: true,
    });
    const response = await getAuth();
    dispatch({
      type: GET_TOKEN,
      token: response.data.token,
    });
    dispatch({
      type: GET_TOKEN_IS_LOADING,
      tokenIsLoading: false,
    });
  } catch (e) {
    //console.log('getUsersThunk', e);
  }
};
