// import {PostOptions } from '../types/api'
import axios from 'axios'
// import { getCurrenHeaders } from './server_config.ts';


export const dataOnly = (res) => (res ? res.data : res);

// const defaultOptions: { timeout: number } = { timeout: 155000 };
export const readError = (error) => {
    if(axios.isCancel(error)){
        console.log("Request canceled", error);
        return Promise.reject(error);
    }
}

export const axiosPost = (
    relativeUrl,
     params,
    //  options: PostOptions = {},
     options = {},

) =>{
    // const defaultOptions: PostOptions = {
    const defaultOptions = {
        timeout: 155000,
        // headers: getCurrenHeaders(),
        withCredentials: true,
        isPureData: false,
    }
    const postOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            // ...defaultOptions.headers,
            // ...options.headers,
        },
    };

    return axios.post( `http://192.168.0.3:8888/${relativeUrl}`, 
    postOptions.isPureData ? params : { ...params, user: 'MK'}, postOptions,).catch(readError);
};

export const axiosGet = (relativeUrl, params = {}) => {
    let config= {
        headers: {
            'Accept': 'application/json'
        }
    }
    return axios.get(`http://192.168.0.3:8888/${relativeUrl}`, config)
    // return Axios.get( `http://192.168.0.3:8888/${relativeUrl}`, {
    //     ...{
    //         timeout: 155000},
    //     params:{
    //         ...params,
    //         user: 'MK',
    //     },
    // });
};