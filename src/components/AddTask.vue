<template>
  <q-card>
    <modal-header >Add task</modal-header>
    <q-form @submit.prevent="submitForm">

      <q-card-section>

        <modal-task-name
            :name.sync="taskToSubmit.name"
            ref="modalTaskName"
        />

        <modal-task-due-date
            :dueDate.sync="taskToSubmit.dueDate"
            @clear="clearDueDate"
        />

        <modal-task-due-time
            v-if="taskToSubmit.dueDate"
            :dueTime.sync="taskToSubmit.dueTime"
        />

      </q-card-section>

      <modal-task-buttons />

    </q-form>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

export default {
  name: 'AddTask.vue',
  mixins: [ mixinAddEditTask ],
  data () {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitTask () {
      console.log('Verrà inviato allo store')
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
