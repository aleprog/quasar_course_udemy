<template>
  <div class="row q-mb-sm">

    <q-input outlined
             clearable
             label="Due Date"
             :value="dueDate"
             @input="$emit('update:dueDate', $event)">

      <template v-slot:append>
        <q-icon name="event"
                class="cursor-pointer">
          <q-popup-proxy>
            <q-date
                :value="dueDate"
                @input="$emit('update:dueDate', $event)"
            />
          </q-popup-proxy>
        </q-icon>
      </template>

    </q-input>

  </div>

</template>

<script>
export default {
  name: 'ModalDueDate',
  props: [ 'dueDate' ]
}
</script>

<style scoped>

</style>
