<template>
  <q-select
      filled
      emit-value
      map-options
      class="col q-ml-sm"
      v-model="sortBy"
      :options="options"
      label="Sort by"
      stack-label
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Sort',
  data () {
    return {
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'dueDate' }
      ]

    }
  },
  computed: {
    ...mapState('tasks', [ 'sort' ]),
    sortBy: {
      get () {
        return this.sort
      },
      set (value) {
        this.setSort(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', [ 'setSort' ])
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>
