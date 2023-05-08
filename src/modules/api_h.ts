import { axiosGet, dataOnly } from "./api_f.ts"


export const midiTest =async (args) => {
    return axiosGet('midi', args)
}
export const midiOutputsTest =async (args) => {
    return axiosGet('connect', args)
}
export const midiChosenOutputTest =async (args) => {
    return axiosGet('choseOutput', args)
}
