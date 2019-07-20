<template>
  <q-page class="q-pa-md">

    <div class="row q-mb-lg">
      <search />

      <sort />
    </div>

    <p v-if="search
              && !Object.keys(tasksToDo).length
              && !Object.keys(tasksCompleted).length "
    >No search results.</p>

    <no-tasks
        v-if="Object.keys(tasksToDo).length == 0 && !search"
    ></no-tasks>

    <tasks-to-do
        v-if="Object.keys(tasksToDo).length > 0"
        :tasks="tasksToDo"></tasks-to-do>

    <tasks-completed
        v-if="Object.keys(tasksCompleted).length > 0"
        :tasks="tasksCompleted"></tasks-completed>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn round
             color="primary"
             size="24px"
             icon="add"
             @click="showAddTasks = true"/>
    </div>

    <q-dialog v-model="showAddTasks" persistent>
      <add-task @close="showAddTasks = false"/>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NoTasks from '../components/NoTasks'
import Search from '../components/Search'
export default {
  data () {
    return {
      showAddTasks: false
    }
  },
  computed: {
    // dal modulo tasks prendo un elenco, array, di
    // singoli getter da importare ... wow !
    ...mapGetters('tasks', ['tasksToDo', 'tasksCompleted']),
    ...mapState('tasks', ['search'])
    /*
    tasks () {
      return this.$store.getters['tasks/tasks']
    }
     */
  },
  components: {
    Search,
    NoTasks,
    'tasks-to-do': require('components/TasksToDo.vue').default,
    'tasks-completed': require('components/TasksCompleted.vue').default,
    'add-task': require('components/AddTask.vue').default,
    'sort': require('components/Sort.vue').default
  },
  mounted () {
    this.$root.$on('showAddTask', () => {
      this.showAddTasks = true
    })
  }
}
</script>

<style>

</style>
