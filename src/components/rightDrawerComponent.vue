<template>

<q-tabs v-model="currentTab">
  <!-- Tabs - notice slot="title" -->
  <q-tab slot="title" name="tab-controls" icon="games" />
  <q-tab count="5" slot="title" name="tab-chat" icon="message" />
  <q-tab default slot="title" name="tab-settings" icon="settings" />

  <!-- Targets -->
  <q-tab-pane name="tab-controls">
    <controls-component/>
  </q-tab-pane>

  <q-tab-pane name="tab-chat" class="no-padding no-margin">
    <chat-component />
  </q-tab-pane>

<!-- settings -->
  <q-tab-pane name="tab-settings" class="no-padding no-margin">
  <q-tabs>
  <q-tab default slot="title" name="tab-settings-profile" label="Profile" />
  <q-tab slot="title" name="tab-settings-alias" label="Alias" />
  <q-tab slot="title" name="tab-settings-hotkey" label="Hotkey" />
  <q-tab slot="title" name="tab-settings-trigger" label="Trigger" />
  <q-tab slot="title" name="tab-settings-script" label="Script" />

  <!-- profile -->
  <q-tab-pane name="tab-settings-profile">
    <profile-settings-component />
  </q-tab-pane>

  <!-- alias -->
  <q-tab-pane name="tab-settings-alias">
    <alias-settings-component />
  </q-tab-pane>

  <!-- hotkey -->
  <q-tab-pane name="tab-settings-hotkey" class="no-margin no-padding">
    <hotkey-settings-component />
  </q-tab-pane>

  <!-- trigger -->
  <q-tab-pane name="tab-settings-trigger">
    <trigger-settings-component />
  </q-tab-pane>

  <q-tab-pane name="tab-settings-script">TAB SCRIPT</q-tab-pane>
  </q-tabs>
  </q-tab-pane>
</q-tabs>

</template>

<script>
import { QBtn, QIcon, QTabs, QTab, QTabPane } from 'quasar'

import aliasSettingsComponent from '../components/aliasSettingsComponent.vue'
import hotkeySettingsComponent from '../components/hotkeySettingsComponent.vue'
import profileSettingsComponent from '../components/profileSettingsComponent.vue'
import triggerSettingsComponent from '../components/triggerSettingsComponent.vue'
import chatComponent from '../components/chatComponent.vue'

import controlsComponent from '../components/controlsComponent.vue'

export default {
  name: 'rightDrawerComponent',
  components: {QBtn, QIcon, QTabs, QTab, QTabPane, aliasSettingsComponent, hotkeySettingsComponent, profileSettingsComponent, triggerSettingsComponent, controlsComponent, chatComponent},
  data () {
    return {
    }
  },
  computed: {
    currentTab: {
      get () {
        return this.$store.state.common.currentTab
      },
      set (tab) {
        this.$store.commit('common/updateCurrentTab', tab)
      }
    }
  }
}
</script>

<style>

</style>
