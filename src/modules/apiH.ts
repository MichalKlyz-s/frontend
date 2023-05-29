import { axiosGet, axiosPost, dataOnly } from "./apiF.ts"


export const midiTest =async (args) => {
    return axiosGet('midi', args)
}
export const midiRegister =async (args) => {
    return axiosPost('midi_register', args)
}
export const midiOutputsTest =async (args) => {
    return axiosGet('connect', args)
}
export const midiChosenOutputTest =async (args) => {
    return axiosGet('choseOutput', args)
}
