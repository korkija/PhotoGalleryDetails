import {
  GET_PHOTOS_SAGA,
  LOAD_MORE_PHOTOS_SAGA,
  IS_LOADING,
  SET_ERROR,
  LOAD_DETAILS_PHOTO_SAGA,
} from '../constants';

export const setError = (errorText) => ({
  type: SET_ERROR,
  error: errorText,
});
export const isLoading = ({isLoading}) => ({
  type: IS_LOADING,
  isLoading: isLoading,
});

export const getPhotosThunk = () => ({
  type: GET_PHOTOS_SAGA,
});

export const loadMoreUsersThunk = (page) => ({
  type: LOAD_MORE_PHOTOS_SAGA,
  page: page,
});

export const getPhotoDetailsThunk = (id) => ({
  type: LOAD_DETAILS_PHOTO_SAGA,
  id: id,
});
