<template>
  <q-card>
    <modal-header >Edit task</modal-header>
    <q-form @submit.prevent="submitForm">

      <q-card-section>

        <modal-task-name
            :name.sync="taskToSubmit.name"
            ref="modalTaskName"
        />

        <modal-task-due-date :dueDate.sync="taskToSubmit.dueDate" />

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
export default {
  name: 'EditTask.vue',
  props: [ 'task', 'id' ],
  components: {
    'modal-header': require('components/ModalHeader.vue').default,
    'modal-task-name': require('components/ModalTaskName.vue').default,
    'modal-task-due-date': require('components/ModalTaskDueDate.vue').default,
    'modal-task-due-time': require('components/ModalTaskDueTime.vue').default,
    'modal-task-buttons': require('components/ModalTaskButtons.vue').default
  },
  data () {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitForm () {
      this.$refs.modalTaskName.$refs.name.validate()
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask () {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      this.$emit('close')
    }
  },
  mounted () {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>

<style scoped>

</style>
