<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          Awesome Toolbar
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer >
      <q-tabs>
        <q-route-tab
                v-for="nav in navs"
                :key="nav.id"
                clickable
                :to="nav.to"
                exact
                :icon="nav.icon"
                :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-primary"
      :breakpoint="767"
      :width="230"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
                v-for="nav in navs"
                :key="nav.id"
                clickable
                :to="nav.to"
                exact
                class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
            <q-item-label caption>{{ nav.description }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          id: 1,
          label: 'To Do',
          icon: 'list',
          to: '/',
          description: 'Pagina principale'
        },
        {
          id: 2,
          label: 'Settings',
          icon: 'settings',
          to: '/settings',
          description: 'Impostazioni'
        }
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
    .q-drawer {
      .q-router-link--exact-active {
        color: white !important;;
        font-weight: bold;
      }
    }
  }
</style>
