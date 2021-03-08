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

export async function getAuth() {
  const endpoint = ENDPOINT + '/auth';
  let response = {
    error: null,
    data: null,
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
export async function getPictures(page = 1) {
  const endpoint = `${ENDPOINT}/images?page=${page}`;
  let response = {
    error: null,
    data: null,
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
      const apiResponseData = await apiResponse.json();
      response.data = apiResponseData;
    }
  } catch (error) {
    response.error = error;
  }
  return response;
}

export async function getPictureDetails(id) {
  const endpoint = `${ENDPOINT}/images/${id}`;
  let response = {
    error: null,
    data: null,
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
      const apiResponseData = await apiResponse.json();
      response.data = apiResponseData;
    }
  } catch (error) {
    response.error = error;
  }
  return response;
}
