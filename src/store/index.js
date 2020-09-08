import Vue from 'vue'
import Vuex from 'vuex'
import contacts from './modules/contacts'
import svg from './modules/svg'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    contacts,
    svg,
  }
})
