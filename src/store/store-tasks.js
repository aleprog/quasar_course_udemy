import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'a101': {
      name: 'C Fai shopping',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'a102': {
      name: 'A Compra banane',
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '14:00'
    },
    'a103': {
      name: 'N Compra le mele',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '16:00'
    }
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
  sort: 'dueDate'
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
  },
  setSearch (state, value) {
    state.search = value
  },
  setSort (state, value) {
    state.sort = value
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
  },
  setSearch ({ commit }, value) {
    commit('setSearch', value)
  },
  setSort ({ commit }, value) {
    commit('setSort', value)
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {}
    let keyOrdered = Object.keys(state.tasks)

    keyOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase()
      let taskBProp = state.tasks[b][state.sort].toLowerCase()

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
