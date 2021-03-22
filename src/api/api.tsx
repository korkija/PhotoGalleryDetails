import AsyncStorage from '@react-native-community/async-storage';
const ENDPOINT = 'http://interview.agileengine.com';
const apiKey = '23567b218376f79d9415';
let token = '';
const initDataPost = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    apiKey: apiKey,
  }),
};

type objectNullType = {};
type dataAuthType = {
  auth: boolean;
  token: string;
};
type dataType = {
  pictures: any;
  page: number;
  pageCount: number;
};
type errorType = {
  message: string;
};
export type requestPhotosType =
  | {
      data: dataType | dataAuthType;
      error: objectNullType;
    }
  | {
      data: objectNullType;
      error: errorType;
    }
  | {
      data: objectNullType;
      error: objectNullType;
    };

export async function getAuth(): Promise<requestPhotosType> {
  const endpoint = ENDPOINT + '/auth';
  let response: requestPhotosType = {
    error: {},
    data: {},
  };
  try {
    const apiResponse = await fetch(endpoint, initDataPost);
    const apiResponseData = await apiResponse.json();
    token = apiResponseData.token;
    await AsyncStorage.setItem('@token', token);
    response.data = apiResponseData;
  } catch (error) {
    response.error = error;
  }
  return response;
}
export async function getPictures(
  page: number = 1,
): Promise<requestPhotosType> {
  const endpoint = `${ENDPOINT}/images?page=${page}`;
  return await requestGet(endpoint);
}

export async function getPictureDetails(
  id: number,
): Promise<requestPhotosType> {
  const endpoint = `${ENDPOINT}/images/${id}`;
  return await requestGet(endpoint);
}
async function requestGet(endpoint: string): Promise<requestPhotosType> {
  let response: requestPhotosType = {
    error: {},
    data: {},
  };
  try {
    const apiResponse = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (apiResponse.ok) {
      // const apiResponseData = await apiResponse.json();
      response.data = await apiResponse.json();
      // response.data = apiResponseData;
    } else {
      response.error = {message: apiResponse.status};
    }
  } catch (error) {
    response.error = error;
  }
  return response;
}
