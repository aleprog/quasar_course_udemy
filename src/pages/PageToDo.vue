<template>
  <q-page class="q-pa-md">

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
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showAddTasks: false
    }
  },
  computed: {
    // dal modulo tasks prendo un elenco, array, di
    // singoli getter da importare ... wow !
    ...mapGetters('tasks', ['tasks'])
    /*
    tasks () {
      return this.$store.getters['tasks/tasks']
    }
     */
  },
  components: {
    'task': require('components/Tasks.vue').default,
    'add-task': require('components/AddTask.vue').default
  }
}
</script>

<style>

</style>
