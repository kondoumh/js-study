import {
    SET_MESSAGE,
    GET_CHANNELS
} from './mutation-types'

export default {
    [SET_MESSAGE] ({commit}, message) {
        commit(SET_MESSAGE, message)
    },
    [GET_CHANNELS] ({commit}) {
        async function fetch_api() {
            const response = await fetch('https://us-central1-demoapp-cc44a.cloudfunctions.net/v1/channels')
            const json = await response.json()
            commit(GET_CHANNELS, json.channels)
        }
        fetch_api()
        /*fetch('https://us-central1-demoapp-cc44a.cloudfunctions.net/v1/channels').then((response)=>{
            return response.json()
        }).then((json)=>{
            commit(GET_CHANNELS, json.channels)
        })*/
    }
}