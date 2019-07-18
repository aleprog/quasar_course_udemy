<template>
  <div
       class="row q-mb-sm"
  >
    <q-input outlined
             :value="dueTime"
             @input="$emit('update:dueTime', $event)"
             clearable
             label="Due Time">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="dueTime"
                    @input="$emit('update:dueTime', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'ModalTaskDueTime',
  props: [ 'dueTime' ]
}
</script>

<style scoped>

</style>
