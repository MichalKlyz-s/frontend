import { axiosGet, axiosPost, axiosGetWParams, dataOnly } from './apiF.ts';
import Axios from 'axios';
export const getNewCancelToken = () => {
  return Axios.CancelToken.source();
};
export const midiPlay = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('midi', args, cancelToken);
};
export const midiOutputsList = async (cancelToken: any) => {
  return axiosGet('getoutputs', cancelToken).then(dataOnly);
};
export const setChosenOutPut = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('choseoutput', args, cancelToken).then(dataOnly);
};
export const setChosenInPut = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('choseinput', args, cancelToken).then(dataOnly);
};
export const getInputs = async (cancelToken: any) => {
  return axiosGet('getinputs', cancelToken).then(dataOnly);
};
export const configuration = async (cancelToken: any) => {
  return axiosGet('getData', cancelToken).then(dataOnly);
};
export const listenChosenInPut = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('listentoinput', args, cancelToken).then(dataOnly);
};
export const saveSetting = async (args: any, cancelToken: any) => {
  return axiosPost('savesetting', args, cancelToken);
};
export const getSetting = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('getsetting', args, cancelToken).then(dataOnly);
};
export const getAllFiles = async (cancelToken: any) => {
  return axiosGet('getallsettingsfiles', cancelToken).then(dataOnly);
};
export const useSetting = async (args: {} | undefined, cancelToken: any) => {
  return axiosGetWParams('usesetting', args, cancelToken).then(dataOnly);
};
