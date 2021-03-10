import {getPictures, getPictureDetails} from '../../../api/api';
import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  IS_LOADING,
  LOAD_DETAILS_PHOTO,
  SET_ERROR,
} from '../constants';

export const setError = (errorText) => {
  return {
    type: SET_ERROR,
    error: errorText,
  };
};

const setErrorAndLoading = (errorText) => (dispatch) => {
  dispatch({
    type: IS_LOADING,
    isLoading: false,
  });
  dispatch(setError(errorText));
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
      dispatch(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    dispatch(setError('Error with getting Photos'));
  }
};

export const loadMoreUsersThunk = (page) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      isLoading: true,
    });
    const response = await getPictures(page + 1);
    if (response.data) {
      dispatch({
        type: LOAD_MORE_PHOTOS,
        pictures: response.data.pictures,
        page: response.data.page,
        pageCount: response.data.pageCount,
      });
    } else {
      dispatch(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    dispatch(setError('Error with getting More photos'));
  }
};

export const getPhotoDetailsThunk = (id) => async (dispatch, getState) => {
  try {
    const {pictures, picturesDetails} = getState().photoAPI;
    const index = pictures.findIndex((item) => {
      return item.id === id;
    });
    if (!picturesDetails[index].details) {
      const response = await getPictureDetails(id);
      if (response.data) {
        dispatch({
          type: LOAD_DETAILS_PHOTO,
          indexPhoto: index,
          details: response.data,
        });
      } else {
        dispatch(setError(response.error?.message));
      }
    }
  } catch (e) {
    dispatch(setError('Error with getting photo Details'));
  }
};
