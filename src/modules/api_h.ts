import { axiosGet, dataOnly } from "./api_f.ts"


export const midiTest =async (args) => {
    return axiosGet('midi', args)
    
}