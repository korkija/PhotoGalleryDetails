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
export type requestAuthType = {
  data?: dataAuthType;
  error?: errorType;
};

export type requestPhotosType = {
  data?: dataType;
  error?: errorType;
};

export async function getAuth(): Promise<requestAuthType> {
  const endpoint = ENDPOINT + '/auth';
  try {
    const apiResponse = await fetch(endpoint, initDataPost);
    const apiResponseData = await apiResponse.json();
    token = apiResponseData.token;
    await AsyncStorage.setItem('@token', token);
    return {data: apiResponseData};
  } catch (error) {
    return {error};
  }
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
  try {
    const apiResponse = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (apiResponse.ok) {
      return {data: await apiResponse.json()};
    } else {
      return {error: {message: apiResponse.status.toString()}};
    }
  } catch (error) {
    return {error: {message: error}};
  }
}
