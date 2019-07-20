<template>
  <q-item
      :class="!task.completed ? 'bg-orange-1' : 'bg-green-1' "
      @click="updateTask({ id: id, updates: { completed: !task.completed} })"
      clickable
      v-ripple
      v-touch-hold:1000.mouse="showEditTasks"
  >

    <q-item-section side top>
      <q-checkbox
          :value="task.completed"
          class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
          :class="{ 'text-striketrough': task.completed }"
          v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon class="q-mr-sm" name="event" size="18px"/>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label caption class="row justify-end"><small>{{ task.dueTime }}</small></q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side >
      <div class="row">
        <q-btn @click.stop="showEditTasks"
               color="primary" dense flat
               icon="edit"
               round
        ></q-btn>
        <q-btn @click.stop="promptToDelete(id)"
               color="red" dense flat
               icon="delete"
               round
        ></q-btn>
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask" persistent>
      <edit-task
          :task="task"
          :id="id"
          @close="showEditTask = false"
      />
    </q-dialog>

  </q-item>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import { date } from 'quasar'
const { formatDate } = date
export default {
  name: 'Tasks',
  components: {
    'edit-task': require('components/EditTask.vue').default
  },
  props: ['task', 'id'],
  data () {
    return {
      showEditTask: false
    }
  },
  computed: {
    ...mapState('tasks', [ 'search' ])
  },
  methods: {
    ...mapActions('tasks', [
      'updateTask', 'deleteTask'
    ]),
    showEditTasks () {
      this.showEditTask = true
    },
    promptToDelete (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really want to delete it?',
        ok: {
          color: 'primary'
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.deleteTask(id)
      })
    }
  },
  filters: {
    niceDate (value) {
      return formatDate(value, 'MMM D')
    },
    searchHighlight (value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, 'i')

        console.log('Task name', value)
        console.log('Cerca', search)

        let out = value.replace(
          searchRegExp, (match) => {
            return '<span class="bg-yellow-6">' + match + '</span>'
          }

        )
        console.log('out', out)
        return out
      } else {
        return value
      }
    }
  }
}
</script>

<style scoped>

</style>
