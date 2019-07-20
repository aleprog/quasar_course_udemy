<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    Nothing to do today, great !
    <template v-slot:action>
      <q-btn
          @click="$root.$emit('showAddTask')"
          flat color="primary"
          label="Add tasks"
      />
    </template>
  </q-banner>
</template>

<script>
export default {
  name: 'NoTasks'
}
</script>

<style scoped>

</style>
