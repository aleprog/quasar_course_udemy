import { firebaseAuth } from '../boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from '../functions/function-show-error-message'

const state = {
  loggedIn: false
}
const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}
const actions = {
  registerUser (_, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    ).then(response => {
      // nothing to do
    }).catch(error => {
      showErrorMessage(error.message)
    })
  },
  loginUser (_, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    ).then(response => {
      // nothing to do
    }).catch(error => {
      showErrorMessage(error.message)
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/')
        dispatch('tasks/fbReadData', null, { root: true })
      } else {
        commit('tasks/clearTasks', null, { root: true })
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth')
      }
    })
  }
}
const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
