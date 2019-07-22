<template>
  <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoonmOut"
  >
    <div :class="{ 'q-mt-lg' : !settings.showTasksInOneList }">
      <list-header
          v-if="!settings.showTasksInOneList"
          bgColor="bg-green-4"
      >Things Completed !</list-header>
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
export default {
  name: 'TasksToDo',
  props: [ 'tasks' ],
  components: {
    'task': require('components/Tasks.vue').default,
    'list-header': require('components/ListHeader.vue').default
  },
  computed: {
    ...mapGetters('settings', ['settings'])
  }
}
</script>

<style scoped>

</style>
