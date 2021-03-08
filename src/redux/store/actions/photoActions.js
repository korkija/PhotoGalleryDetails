import {getAuth, getPictures, getPictureDetails} from '../../../api/api';
import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  GET_TOKEN,
  GET_TOKEN_IS_LOADING,
  IS_LOADING,
  LOAD_DETAILS_PHOTO,
} from '../constants';

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

export const getPhotosThunk = () => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      isLoading: true,
    });
    const response = await getPictures();
    if (response.data) {
      dispatch({
        type: GET_PHOTOS,
        pictures: response.data.pictures,
        page: response.data.page,
        pageCount: response.data.pageCount,
      });
    } else {
      dispatch({
        type: IS_LOADING,
        isLoading: false,
      });
    }
  } catch (e) {
    //console.log('getUsersThunk', e);
  }
};

export const loadMoreUsersThunk = (page) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      isLoading: true,
    });
    const response = await getPictures(page + 1);
    console.log('<<loadMoreUsersThunk', response);
    if (response.data) {
      dispatch({
        type: LOAD_MORE_PHOTOS,
        pictures: response.data.pictures,
        page: response.data.page,
        pageCount: response.data.pageCount,
      });
    } else {
      dispatch({
        type: IS_LOADING,
        isLoading: false,
      });
    }
  } catch (e) {
    //console.log('getUsersThunk', e);
  }
};
export const getPhotoDetailsThunk = (id) => async (dispatch, getState) => {
  try {
    const pictures = getState().photoAPI.pictures;
    const index = pictures.findIndex((item) => {
      return item.id === id;
    });
    const response = await getPictureDetails(id);
    if (response.data) {
      dispatch({
        type: LOAD_DETAILS_PHOTO,
        indexPhoto: index,
        details: response.data,
      });
    }
  } catch (e) {
    //console.log('getUsersThunk', e);
  }
};
