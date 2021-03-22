import produce from 'immer';
import {
  GET_PHOTOS,
  LOAD_MORE_PHOTOS,
  IS_LOADING,
  LOAD_DETAILS_PHOTO,
} from '../constants';

type pictureItem = {
  id: string;
  cropped_picture: string;
};
type detailsType = {
  id: string;
  author: string;
  camera: string;
  tags: string;
  full_picture: string;
  cropped_picture: string;
};
type pictureDetailsItem = {
  id: string;
  cropped_picture: string;
  details?: detailsType;
};

type stateType = {
  pictures: [pictureItem] | [];
  picturesDetails: [pictureDetailsItem] | [];
  page: number;
  pageCount: number | null;
  isLoading: boolean;
};

const initialState: stateType = {
  pictures: [],
  picturesDetails: [],
  page: 1,
  pageCount: null,
  isLoading: false,
};

export type actionTokenType = {
  type: typeof LOAD_MORE_PHOTOS | typeof GET_PHOTOS;
  pictures: string;
  page: number;
  pageCount: number;
};
export type actionLoadingType = {
  type: typeof IS_LOADING;
  isLoading: boolean;
};
export type actionDetailsPhotoType = {
  type: typeof LOAD_DETAILS_PHOTO;
  indexPhoto: number;
  details: detailsType;
};

type actionsPhotoType =
  | actionTokenType
  | actionLoadingType
  | actionDetailsPhotoType;

export const photoReducer = (
  state = initialState,
  action: actionsPhotoType,
) => {
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
