import produce from 'immer';
import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  IS_LOADING,
  LOAD_DETAILS_PHOTO,
} from '../constants';

const initialState = {
  pictures: [],
  picturesDetails: [],
  page: 1,
  pageCount: null,
  isLoading: false,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        pictures: action.pictures,
        picturesDetails: action.pictures,
        page: action.page,
        pageCount: action.pageCount,
        isLoading: false,
      };
    case LOAD_MORE_PHOTOS:
      return {
        ...state,
        pictures: [...state.pictures, ...action.pictures],
        picturesDetails: [...state.picturesDetails, ...action.pictures],
        page: action.page,
        pageCount: action.pageCount,
        isLoading: false,
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case LOAD_DETAILS_PHOTO:
      return produce(state, (draftState) => {
        draftState.picturesDetails[action.indexPhoto].details = action.details;
      });
    default:
      return state;
  }
};
