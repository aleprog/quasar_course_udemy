<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted () {
    // Dovendo ricevere un evento dal menu 'Settings' di Electron,
    // mi occorre questo ponte tra la webapp Vue interna e il container Electron
    // per prima cosa chiedo all'istanza di Quasar di determinare se sono
    // dentro ad un'app Electron
    if (this.$q.platform.is.electron) {
      // A quel punto creo un apposito listener per il nome di evento definito
      // nel menu di Electron stesso
      // vedi src-electron\main-process\electron-main-menu-template.js

      console.log('Ciao io sono electron')
      const electron = require('electron')
      const ipcRenderer = electron.ipcRenderer
      ipcRenderer.on('show-settings', () => {
        this.$router.push('/settings')
      })
    }

    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>

<style>
</style>
