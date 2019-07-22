<template>
  <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
          v-if="!settings.showTasksInOneList"
          bgColor="bg-orange-4"
      >Things To Do !</list-header>

      <q-list v-if="Object.keys(tasks).length >0"
              bordered
      >

        <task
            v-for="(task, key) in tasks"
            :key="key"
            :task="task"
            :id="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import ListHeader from './ListHeader'
export default {
  name: 'TasksToDo',
  props: [ 'tasks' ],
  components: {
    ListHeader,
    'task': require('components/Tasks.vue').default
  },
  computed: {
    ...mapGetters('settings', ['settings'])
  }
}
</script>

<style scoped>

</style>
