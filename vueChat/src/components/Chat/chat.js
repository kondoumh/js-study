import { mapGetters, mapActions} from 'vuex'
import {
    GET_CHANNELS,
    SET_MESSAGE
} from '../../store/mutation-types'

export default {
    name: 'chat',
    mounted() {
        this.GET_CHANNELS()
    },
    computed: {
     ...mapGetters([
            'messages',
            'channels'
        ]),
    },
    methods: {
     ...mapActions([
        SET_MESSAGE,
        GET_CHANNELS
     ]),
     send_message() {
            this.SET_MESSAGE(this.message) // this.messages.push(this.message)
            this.message = ""
        }
    },
    data() {
        return {
            message: ""
        }
    }
}