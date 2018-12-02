import {
    SET_MESSAGES,
    GET_CHANNELS
 } from './mutation-types'

export default {
    [SET_MESSAGES](state, message) {
        state.messages.push(message)
    },
    [GET_CHANNELS](state, channels) {
        state.channels = channels
    }
}