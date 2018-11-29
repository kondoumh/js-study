import Vue from 'Vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    messages: []
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
