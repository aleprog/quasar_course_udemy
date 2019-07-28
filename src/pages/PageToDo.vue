<template>
  <q-page>
    <div class='q-pa-md absolute full-width full-height column'>
      <template v-if='tasksDownloaded'>
        <div class='row q-mb-lg'>
          <search />
          <sort />
        </div>

        <p
          v-if='search
                && !Object.keys(tasksToDo).length
                && !Object.keys(tasksCompleted).length '
        >No search results.</p>

        <q-scroll-area class='q-scroll-area-tasks'>
          <no-tasks
            v-if='Object.keys(tasksToDo).length == 0 && !search && !settings.showTasksInOneList'
          ></no-tasks>

          <tasks-to-do v-if='Object.keys(tasksToDo).length > 0' :tasks='tasksToDo'></tasks-to-do>

          <tasks-completed
            v-if='Object.keys(tasksCompleted).length > 0'
            :tasks='tasksCompleted'
            class='q-mb-xl'
          />
        </q-scroll-area>

        <div class='absolute-bottom text-center q-mb-lg no-pointer-events'>
          <q-btn
            round
            color='primary'
            size='24px'
            class='all-pointer-events'
            icon='add'
            @click='showAddTasks = true'
          />
        </div>
      </template>

      <template v-else>
        <span class='absolute-center'>
          <q-spinner color='primary' size='3em' />
        </span>
      </template>
    </div>

    <q-dialog v-model='showAddTasks' persistent>
      <add-task @close='showAddTasks = false' />
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
    ...mapState('tasks', ['search', 'tasksDownloaded']),
    ...mapGetters('settings', ['settings'])
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
    sort: require('components/Sort.vue').default
  },
  mounted () {
    this.$root.$on('showAddTask', () => {
      this.showAddTasks = true
    })
  }
}
</script>

<style lang='scss'>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
.electron {
  .q-scroll-area-tasks {
    .scroll {
      height: auto !important;
    }
  }
}
</style>
