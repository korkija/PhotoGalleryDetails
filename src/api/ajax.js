import {getPictures, getAuth} from './api';

export const photoAPI = {
  getPhotos(page = 1) {
    // const formdata = new FormData();
    // if (key) {
    //   formdata.append('name', key);
    //   return getPictures(`search/users?page=${page}`, formdata);
    // }
    // getAuth();
    return getPictures(page);
  },
};
