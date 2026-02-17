import axios from 'axios';

export const dataOnly = (res: any) => (res ? res.data : res);

export const readError = (error: any) => {
  if (axios.isCancel(error)) {
    console.log('Request canceled', error);
    return Promise.reject(error);
  }
};
const defaultOptions = {
  timeout: 300000,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const axiosPost = (
  relativeUrl: string,
  params: { value: any },
  cancelToken: { value: any },
) => {
  const optionsPost = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
  };
  return axios
    .post(
      `http://192.168.70.10:3000/${relativeUrl}`,
      {
        data: params.value,
      },
      optionsPost,
    )
    .catch(readError);
};

export const axiosGet = (relativeUrl: string, cancelToken: { value: any }) => {
  const optionsGet = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
    params: {
      data: '',
    },
  };
  return axios.get(`http://192.168.70.10:3000/${relativeUrl}`, optionsGet).catch(readError);
};

export const axiosGetWParams = (relativeUrl: string, params = {}, cancelToken: { value: any }) => {
  const optionsGet = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
    params: {
      data: params,
    },
  };
  return axios.get(`http://192.168.70.10:3000/${relativeUrl}`, optionsGet).catch(readError);
};
