<template>
  <div class="q-mt-lg">
    <list-header
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

</template>

<script>
export default {
  name: 'TasksToDo',
  props: [ 'tasks' ],
  components: {
    'task': require('components/Tasks.vue').default,
    'list-header': require('components/ListHeader.vue').default
  }
}
</script>

<style scoped>

</style>
