export default {
  methods: {
    submitForm () {
      this.$refs.modalTaskName.$refs.name.validate()
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    clearDueDate () {
      this.taskToSubmit.dueDate = ''
      this.taskToSubmit.dueTime = ''
    }
  },
  components: {
    'modal-header': require('src/components/ModalHeader.vue').default,
    'modal-task-name': require('src/components/ModalTaskName.vue').default,
    'modal-task-due-date': require('src/components/ModalTaskDueDate.vue').default,
    'modal-task-due-time': require('src/components/ModalTaskDueTime.vue').default,
    'modal-task-buttons': require('src/components/ModalTaskButtons.vue').default
  }
}
