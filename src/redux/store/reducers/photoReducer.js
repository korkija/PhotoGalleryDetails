import produce from 'immer';
import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  // GET_TOKEN,
  IS_LOADING,
  // GET_TOKEN_IS_LOADING,
  LOAD_DETAILS_PHOTO,
} from '../constants';

const initialState = {
  pictures: [],
  picturesDetails: [],
  page: 1,
  pageCount: null,
  // token: '',
  // tokenIsLoading: false,
  isLoading: false,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      console.log('GET_PHOTOS');
      return {
        ...state,
        pictures: action.pictures,
        picturesDetails: action.pictures,
        page: action.page,
        pageCount: action.pageCount,
        isLoading: false,
      };
    case LOAD_MORE_PHOTOS:
      console.log('LOAD_MORE_PHOTOS');
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
      console.log('<<<<<<0000');
      return produce(state, (draftState) => {
        draftState.picturesDetails[action.indexPhoto].details = action.details;
      });
    default:
      return state;
  }
};
