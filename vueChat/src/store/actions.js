import {
    GET_CHANNELS,
    SET_MESSAGE
} from './mutation-types'

export default {
    [GET_CHANNELS] ({commit}) {
        async function fetch_api() {
            const response = await fetch('https://us-central1-demoapp-cc44a.cloudfunctions.net/v1/channels')
            const json = await response.json()
            commit(GET_CHANNELS, json.channels)
        }
        fetch_api()
    },
    async GET_MESSAGE
}