import { axiosGet, axiosPost, axiosGetWParams, dataOnly } from "./apiF.ts";
import Axios from 'axios';
export const getNewCancelToken = () => {
  return Axios.CancelToken.source();
}
export const midiPlay = async (args, cancelToken) => {
  return axiosGetWParams("midi", args, cancelToken);
};
export const midiOutputsList = async (cancelToken) => {
  return axiosGet("getoutputs", cancelToken).then(dataOnly);
};
export const setChosenOutPut = async (args, cancelToken) => {
  return axiosGetWParams("choseoutput", args, cancelToken).then(dataOnly);
};
export const setChosenInPut = async (args, cancelToken) => {
  return axiosGetWParams("choseinput", args, cancelToken).then(dataOnly);
};
export const getInputs = async (cancelToken) => {
  return axiosGet("getinputs",cancelToken).then(dataOnly);
}
export const configuration = async (cancelToken) => {
  return axiosGet("getData", cancelToken).then(dataOnly);
};
export const listenChosenInPut = async(args, cancelToken) => {
  return axiosGetWParams("listentoinput", args, cancelToken).then(dataOnly);
}
export const saveSetting = async (args, cancelToken) => {
  return axiosPost("savesetting", args, cancelToken);
};
export const getSetting = async (args, cancelToken) => {
  return axiosGetWParams("getsetting", args, cancelToken).then(dataOnly);
};
export const getAllFiles = async (cancelToken) => {
  return axiosGet("getallsettingsfiles", cancelToken).then(dataOnly);
};
export const useSetting = async (args, cancelToken) => {
  return axiosGetWParams("usesetting", args, cancelToken).then(dataOnly);
};

