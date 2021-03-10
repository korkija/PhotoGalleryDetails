import {getAuth} from '../../../api/api';
import {GET_TOKEN} from '../constants';
import {setError} from './photoActions';

export const getToken = () => async (dispatch) => {
  try {
    const response = await getAuth();
    dispatch({
      type: GET_TOKEN,
      token: response.data?.token,
      error: response.error?.message,
    });
  } catch (e) {
    dispatch(setError('Error with getting Token'));
  }
};
