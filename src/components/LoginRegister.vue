<template>
  <q-form @submit.prevent="submitForm">

    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }}
        Register to access To Do everywhere.
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
          class="col"
          outlined
          v-model="formData.email"
          label="Email"
          ref="email"
          stack-label
          :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address']"
          lazy-rules
      />
    </div>

    <div class="row q-mb-md">

      <q-input
          :rules="[val => val.length >= 6 || 'Please enter at least 6 chars']"
          lazy-rules
          type="password"
          class="col"
          outlined
          v-model="formData.passwordl"
          label="Password"
          ref="password"
          stack-label
      />
    </div>

    <div class="row">
      <q-space />
      <q-btn
          type="submit"
          color="primary"
          :label="tab"
      />
    </div>

  </q-form>

</template>

<script>
export default {
  name: 'Register',
  props: [
    'tab'
  ],
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError &&
          !this.$refs.password.hasError
      ) {
        console.log('all valid')
        if (this.tab === 'login') {
          console.log('log in the user')
        } else {
          console.log('Register the user')
        }
      }
    },
    isValidEmailAddress (email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  },
  filters: {
    titleCase (value) {
      return value.charAt(0).toUpperCase() +
        value.slice(1)
    }
  }
}
</script>

<style scoped>

</style>
