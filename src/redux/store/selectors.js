// import { createSelector } from 'reselect';

const rootPhotoSelector = (state) => state.photoAPI;
const rootAuthSelector = (state) => state.authAPI;

export const getPageSelector = (state) => rootPhotoSelector(state).page;
export const getPageCountSelector = (state) =>
  rootPhotoSelector(state).pageCount;
export const getPicturesSelector = (state) => rootPhotoSelector(state).pictures;
export const getIsLoadingSelector = (state) =>
  rootPhotoSelector(state).isLoading;
export const getPicturesDetailsSelector = (state) =>
  rootPhotoSelector(state).picturesDetails;

export const getTokenSelector = (state) => rootAuthSelector(state).token;
export const getErrorSelector = (state) => rootAuthSelector(state).error;
