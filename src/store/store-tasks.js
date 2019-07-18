import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    '101': {
      name: 'Fai shopping',
      completed: true,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    '102': {
      name: 'Compra banane',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    '103': {
      name: 'Compra le mele',
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    }
  }
}
const mutations = {
  updateTask (state, payload) {
    Object.assign(
      state.tasks[payload.id],
      payload.updates
    )
  },
  deleteTask (state, id) {
    console.log('must delete ', id)
    Vue.delete(state.tasks, id)
  },
  addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  }
}

const actions = {
  updateTask ({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask ({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask ({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
