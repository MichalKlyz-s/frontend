import type {AxiosRequestConfig} from 'axios'

export type PostOptions = AxiosRequestConfig & {
    isPureData?: boolean;
};