<template>
    <q-input
        outlined
        v-model="searchField"
        label="Search"
        class="col"
        v-select-all
        @keyup.esc="searchField = ''"
    >
    <template v-slot:append>
      <q-icon
          v-if="searchField !== ''"
          name="close"
          @click="searchField = ''"
          class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>

  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { selectAll } from 'src/directives/directive-select-all.js'
export default {
  name: 'Search',
  methods: {
    ...mapActions('tasks', [ 'setSearch' ])
  },
  computed: {
    ...mapState('tasks', [ 'search' ]),
    searchField: {
      get () {
        return this.search
      },
      set (value) {
        this.setSearch(value)
      }
    }
  },
  directives: {
    selectAll
  }
}
</script>

<style scoped>

</style>
