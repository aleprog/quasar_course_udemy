<template>

  <div class="row q-mb-sm">
    <q-input class="col"
             clearable
             outlined
             autofocus
             :value="name"
             @input="$emit('update:name', $event)"
             ref="name"
             :rules="[val => !!val || 'Field is required']"
             label="Task Name" />
  </div>

</template>

<script>
export default {
  name: 'ModalTaskName',
  props: ['name']
}
</script>

<style scoped>

</style>
