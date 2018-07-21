<template>
  <div>
    <q-field
      label="Preset"
    >
      <q-select v-model="currentPresetId" :options="presetsOptions" />
      <br>
    </q-field>
    <q-field
      v-if="!addMode"
      label=" "
      class="text-right"
    >
      <q-btn outline class="full-width" icon="add" color="primary" @click="addMode = true">New preset</q-btn>
  </q-field>

  <template v-if="addMode">
    <q-field
      label="Name"
    >
      <q-input v-model="profileName" />
    </q-field>
  <br>
    <q-field
      label="Parent"
    >
      <q-select v-model="currentPresetId" :options="parentPresetOptions" />
      <br>
    </q-field>

    <q-field
      label=" "
    >
      <q-btn outline color="secondary">Save</q-btn>
      <q-btn outline @click="addMode = false">Cancel</q-btn>
    </q-field>
  </template>

    <q-item-separator/>
    <q-field
      label="Import"
    >
      <q-btn outline class="full-width" icon="import_export" color="primary" @click="importSettings">Load settings</q-btn>
    </q-field>
    <br>
    <q-field
      label="Export"
    >
      <q-btn outline class="full-width" icon="save" color="primary" @click="exportSettings">Save settings</q-btn>
    </q-field>
  </div>
</template>

<script>
import { QBtn, QIcon, QField, QSelect, QItemSeparator, QInput } from 'quasar'

export default {
  name: 'profileSettingsComponent',
  components: {QBtn, QIcon, QField, QSelect, QItemSeparator, QInput},
  data () {
    return {
      parentPresetId: '',
      profileName: '',
      addMode: false
    }
  },
  methods: {
    importSettings () {
      console.log('importSettings')
    },
    exportSettings () {
      console.log('exportSettings')
      let settings = {
        version: '0.0.1',
        presets: this.presets
      }
      console.log(settings)
      alert(JSON.stringify(settings))
    },
    getPresetsOptions () {
      let options = []
      this.presets.forEach(preset => {
        options.push({value: preset.id, label: preset.name})
      })
      return options
    }
  },
  computed: {
    presets: {
      get () {
        return this.$store.state.common.presets
      },
      set (data) {
        this.$store.commit('common/updatePresets', data)
      }
    },
    currentPresetId: {
      get () {
        return this.$store.state.common.currentPresetId
      },
      set (id) {
        this.$store.commit('common/updateCurrentPresetId', id)
      }
    },
    parentPresetOptions () {
      let options = this.getPresetsOptions()
      options.push({value: 'none', label: 'None'})
      return options
    },
    presetsOptions () {
      return this.getPresetsOptions()
    }
  }
}
</script>

<style>

</style>
