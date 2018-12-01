import {
    SET_MESSAGE
} from './mutation-types'

export default {
    [SET_MESSAGE] ({commit}, message) {
        commit(SET_MESSAGE, message)
    },
}