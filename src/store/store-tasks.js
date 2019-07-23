import Vue from 'vue'
import { uid } from 'quasar'
import {
  firebaseAuth,
  firebaseDb
} from '../boot/firebase'

const state = {
  tasks: {
    // 'a101': {
    //   name: 'C Fai shopping',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'a102': {
    //   name: 'A Compra banane',
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '14:00'
    // },
    // 'a103': {
    //   name: 'N Compra le mele',
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '16:00'
    // }
    // ,
    // 'a104': {
    //   name: 'C Fai shopping',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'a105': {
    //   name: 'A Compra banane',
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '14:00'
    // },
    // 'a106': {
    //   name: 'N Compra le mele',
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '16:00'
    // },
    // 'a107': {
    //   name: 'C Fai shopping',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'a108': {
    //   name: 'A Compra banane',
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '14:00'
    // },
    // 'a109': {
    //   name: 'N Compra le mele',
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '16:00'
    // },
    // 'a110': {
    //   name: 'C Fai shopping',
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'a111': {
    //   name: 'A Compra banane',
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '14:00'
    // },
    // 'a112': {
    //   name: 'N Compra le mele',
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '16:00'
    // }
  },
  search: '',
  sort: 'dueDate',
  tasksDownloaded: false
}
const mutations = {
  updateTask (state, payload) {
    Object.assign(
      state.tasks[payload.id],
      payload.updates
    )
  },

  deleteTask (state, id) {
    Vue.delete(state.tasks, id)
  },

  addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },

  setSearch (state, value) {
    state.search = value
  },

  setSort (state, value) {
    state.sort = value
  },

  setTasksDownloaded (state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  updateTask ({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload)
  },

  deleteTask ({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },

  addTask ({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    // commit('addTask', payload)
    dispatch('fbAddTask', payload)
  },

  setSearch ({ commit }, value) {
    commit('setSearch', value)
  },

  setSort ({ commit }, value) {
    commit('setSort', value)
  },

  fbReadData ({ commit }, value) {
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    userTasks.on('child_added', (snapshot) => {
      let payload = {
        id: snapshot.key,
        task: snapshot.val()
      }
      commit('addTask', payload)
    })

    userTasks.on('child_changed', (snapshot) => {
      let payload = {
        id: snapshot.key,
        updates: snapshot.val()
      }
      commit('updateTask', payload)
    })

    userTasks.on('child_removed', (snapshot) => {
      commit('deleteTask', snapshot.key)
    })

    userTasks.once('value', _ => {
      commit('setTasksDownloaded', true)
    })
  },

  fbAddTask (_, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(
      'tasks/' + userId + '/' + payload.id
    )
    taskRef.set(payload.task)
  },

  fbUpdateTask (_, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(
      'tasks/' + userId + '/' + payload.id
    )
    taskRef.update(payload.updates)
  },

  fbDeleteTask (_, id) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(
      'tasks/' + userId + '/' + id
    )
    taskRef.remove()
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {}
    let keyOrdered = Object.keys(state.tasks)

    keyOrdered.sort((a, b) => {
      let taskAProp = typeof state.tasks[a][state.sort] !== 'undefined'
        ? state.tasks[a][state.sort].toLowerCase()
        : ''
      let taskBProp = typeof state.tasks[b][state.sort] !== 'undefined'
        ? state.tasks[b][state.sort].toLowerCase()
        : ''

      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    keyOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key]
    })
    return tasksSorted
  },

  tasksFiltered: (state, getters) => {
    let tasksFiltered = {}
    let tasks = getters.tasksSorted

    if (state.search) {
      Object.keys(tasks)
        .forEach(key => {
          let task = tasks[key]
          if (task.name
            .toLowerCase()
            .includes(state.search.toLowerCase()
            )) {
            tasksFiltered[key] = task
          }
        })
      return tasksFiltered
    }
    return tasks
  },

  tasksToDo: (state, getters) => {
    let tasks = {}
    let tasksFiltered = getters.tasksFiltered

    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },

  tasksCompleted: (state, getters) => {
    let tasks = {}
    let tasksFiltered = getters.tasksFiltered

    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
