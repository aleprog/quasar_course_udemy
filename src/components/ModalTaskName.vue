<template>

  <div class="row q-mb-sm">
    <q-input class="col"
             clearable
             outlined
             autofocus
             v-select-all
             :value="name"
             @input="$emit('update:name', $event)"
             ref="name"
             :rules="[val => !!val || 'Field is required']"
             label="Task Name" />
  </div>

</template>

<script>
import { selectAll } from 'src/directives/directive-select-all.js'
export default {
  name: 'ModalTaskName',
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>

<style scoped>

</style>
