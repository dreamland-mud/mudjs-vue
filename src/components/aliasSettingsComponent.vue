<template>
    <div>
    <q-table
      class="no-shadow"
      selection="single"
      :selected.sync="selectedEntry"
      :data="tableData"
      :columns="tableColumns"
      :rows-per-page-options="[10, 25, 50, 100]"
      row-key="alias"
    />
    <hr>
    <p class="text-right">
    <q-btn outline icon="save" v-if="isTableEntrySelected || editMode" color="primary" @click="save">Save</q-btn>
    <q-btn outline icon="add" v-if="!isTableEntrySelected && !editMode" color="secondary" @click="add">Add</q-btn>
    <q-btn outline icon="refresh" v-if="isTableEntrySelected || editMode" @click="reset">Reset</q-btn>
    <q-btn outline icon="delete" v-if="isTableEntrySelected || editMode" @click="remove"></q-btn>
    </p>
    <template v-if="isTableEntrySelected || editMode">
    <p>
    <q-field
      label="Shortcut"
      helper="Enter alias shortcut"
    >
      <q-input v-model="inputValue" @keyup="onInputChange"/>
    </q-field>
    <q-field
      label="Command"
      helper="Enter command to execute."
    >
      <q-input v-model="commandValue" />
    </q-field>
    </p>
    </template>
    </div>
</template>
<script>

import { QField, QSelect, QTable, QBtn, QInput } from 'quasar'

export default {
  name: 'ComponentSettings',
  components: {QField, QSelect, QTable, QBtn, QInput},
  data () {
    return {
      tableData: [],
      tableColumns: [
        {
          name: 'alias',
          required: true,
          label: 'Alias',
          align: 'left',
          field: 'alias',
          sortable: true
        },
        {
          name: 'command',
          required: true,
          label: 'Command',
          align: 'left',
          field: 'command',
          sortable: true
        }
      ],
      selectedEntry: [],
      inputValue: '',
      commandValue: '',
      editMode: false
    }
  },
  methods: {
    onInputChange (e) {
      let index = this.currentPreset.alias.findIndex(alias => alias[0] === this.inputValue)
      if (index !== -1) {
        this.commandValue = this.currentPreset.alias[index][1]
      }
    },
    setInputs () {
      if (this.selectedEntry.length) {
        let index = this.tableData.findIndex(column => column.alias === this.selectedEntry[0].alias)
        if (index !== -1) {
          this.inputValue = this.tableData[index].alias
          this.commandValue = this.tableData[index].command
        }
      } else {
        this.inputValue = ''
        this.commandValue = ''
      }
    },
    loadTableData () {
      let data = []
      this.currentPreset.alias.forEach(entry => {
        let alias, command
        [alias, command] = entry
        data.push({alias, command})
      })
      console.log(data)
      this.tableData = data
    },
    add () {
      this.inputValue = ''
      this.commandValue = ''
      this.editMode = true
    },
    save () {
      this.reset()
      this.loadTableData()
    },
    reset () {
      this.editMode = false
      this.selectedEntry = []
    },
    remove () {
      this.currentPreset.alias.splice(this.selectedEntry[0].id, 1)
      this.reset()
      this.loadTableData()
    }
  },
  watch: {
    selectedEntry () {
      this.selectedEntry.length === 0 || this.setInputs()
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
    currentPreset () {
      return this.presets[this.currentPresetId]
    },
    isTableEntrySelected () {
      return this.selectedEntry.length > 0
    }
  },
  mounted () {
    this.loadTableData()
  }
}
</script>

<style>
</style>
