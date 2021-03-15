import {put, all, select, takeLeading} from 'redux-saga/effects';

import {getPictures, getPictureDetails, getAuth} from '../../../api/api';
import {
  GET_PHOTOS,
  GET_PHOTOS_SAGA,
  LOAD_MORE_PHOTOS,
  LOAD_MORE_PHOTOS_SAGA,
  LOAD_DETAILS_PHOTO,
  LOAD_DETAILS_PHOTO_SAGA,
  GET_TOKEN,
  GET_TOKEN_SAGA,
} from '../constants';
import {setError, isLoading} from '../actions/photoActions';
import {
  errorTextGetToken,
  errorTextGetPhotos,
  errorTextMorePhoto,
  errorTextPhotoDetails,
} from '../constants';

function* getToken() {
  try {
    const response = yield getAuth();
    yield put({
      type: GET_TOKEN,
      token: response.data?.token,
      error: response.error?.message,
    });
  } catch (e) {
    yield put(setError(errorTextGetToken));
  }
}

function* getPhotosThunk() {
  try {
    yield put(isLoading(true));
    const response = yield getPictures();
    if (response.data) {
      yield put({
        type: GET_PHOTOS,
        pictures: response.data.pictures,
        page: response.data.page,
        pageCount: response.data.pageCount,
      });
    } else {
      yield put(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    yield put(setError(errorTextGetPhotos));
  }
}

function* loadMoreUsersThunk({page}) {
  try {
    yield put(isLoading(true));
    const response = yield getPictures(page + 1);
    if (response.data) {
      yield put({
        type: LOAD_MORE_PHOTOS,
        pictures: response.data.pictures,
        page: response.data.page,
        pageCount: response.data.pageCount,
      });
    } else {
      yield put(setErrorAndLoading(response.error.message));
    }
  } catch (e) {
    yield put(setError(errorTextMorePhoto));
  }
}

function* getPhotoDetailsThunk({id}) {
  try {
    const {pictures, picturesDetails} = yield select((state) => state.photoAPI);
    const index = pictures.findIndex((item) => {
      return item.id === id;
    });
    if (!picturesDetails?.[index]?.details) {
      const response = yield getPictureDetails(id);
      if (response.data) {
        yield put({
          type: LOAD_DETAILS_PHOTO,
          indexPhoto: index,
          details: response.data,
        });
      } else {
        yield put(setError(response.error?.message));
      }
    }
  } catch (e) {
    yield put(setError(errorTextPhotoDetails));
  }
}

export function* setErrorAndLoading(errorText) {
  yield put(isLoading(false));
  yield put(setError(errorText));
}

function* actionWatcher() {
  yield takeLeading(LOAD_DETAILS_PHOTO_SAGA, getPhotoDetailsThunk);
  yield takeLeading(LOAD_MORE_PHOTOS_SAGA, loadMoreUsersThunk);
  yield takeLeading(GET_PHOTOS_SAGA, getPhotosThunk);
  yield takeLeading(GET_TOKEN_SAGA, getToken);
}
export function* rootSaga() {
  yield all([actionWatcher()]);
}
