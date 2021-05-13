import {getPictures, getPictureDetails} from '../../../api/api';
import {actionErrorType} from '../reducers/authReducer';
import {Dispatch} from 'redux';

import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  IS_LOADING,
  LOAD_DETAILS_PHOTO,
  SET_ERROR,
} from '../constants';
import {pictureItem} from '~/redux/store/reducers/photoReducer';

export const setError = (errorText: string): actionErrorType => {
  return {
    type: SET_ERROR,
    error: errorText,
  };
};

const setErrorAndLoading = (errorText: string) => (
  dispatch: Dispatch,
): void => {
  dispatch({
    type: IS_LOADING,
    isLoading: false,
  });
  dispatch(setError(errorText));
};

export const getPhotosThunk = () => async (dispatch: Dispatch<any>) => {
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
    } else if (response.error) {
      dispatch(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    dispatch(setError('Error with getting Photos'));
  }
};

export const loadMoreUsersThunk = (page: number) => async (
  dispatch: Dispatch<any>,
) => {
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
    } else if (response.error) {
      dispatch(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    dispatch(setError('Error with getting More photos'));
  }
};

export const getPhotoDetailsThunk = (id: number) => async (
  dispatch: Dispatch,
  getState: Function,
) => {
  try {
    const {pictures, picturesDetails} = getState().photoAPI;
    const index = pictures.findIndex((item: pictureItem) => {
      return item.id === id.toString();
    });
    if (!picturesDetails[index].details) {
      const response = await getPictureDetails(id);
      if (response.data) {
        dispatch({
          type: LOAD_DETAILS_PHOTO,
          indexPhoto: index,
          details: response.data,
        });
      } else if (response.error) {
        dispatch(setError(response.error?.message));
      }
    }
  } catch (e) {
    dispatch(setError('Error with getting photo Details'));
  }
};
