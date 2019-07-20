<template>
  <div>
    <list-header
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
</template>

<script>
import ListHeader from './ListHeader'
export default {
  name: 'TasksToDo',
  props: [ 'tasks' ],
  components: {
    ListHeader,
    'task': require('components/Tasks.vue').default
  }
}
</script>

<style scoped>

</style>
