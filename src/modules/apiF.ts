import axios from "axios";

export const dataOnly = (res) => (res ? res.data : res);

export const readError = (error) => {
  if (axios.isCancel(error)) {
    console.log("Request canceled", error);
    return Promise.reject(error);
  }
};
const defaultOptions = {
  timeout: 300000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    'Content-Type': "application/json"
  },
};

export const axiosPost = (
  relativeUrl,
  params,
  cancelToken,
) => {
  const optionsPost = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
  }
  return axios.post(
    `http://localhost:8888/${relativeUrl}`,{
       data: params.value
  }, optionsPost
    )
  .catch(readError);
};

export const axiosGet = (relativeUrl, cancelToken) => {
  const optionsGet = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
    params: {
      data: ''
    }
  }
  return axios.get(`http://localhost:8888/${relativeUrl}`, optionsGet).catch(readError);
};

export const axiosGetWParams = (relativeUrl, params = {}, cancelToken) => {
  const optionsGet = {
    ...defaultOptions,
    cancelToken: cancelToken ? cancelToken.value : null,
    params: {
      data: params
    }
  }
  return axios.get(`http://localhost:8888/${relativeUrl}`, optionsGet).catch(readError);
};
