<template>
    <div>
    <q-table
      class="no-shadow"
      selection="single"
      :selected.sync="tableSelectedEntry"
      :data="tableData"
      :columns="tableColumns"
      :rows-per-page-options="[10, 25, 50, 100]"
      row-key="hotkey"
    />
    <hr>
    <p class="text-right">
    <q-btn outline icon="save" v-if="tableSelectedEntry.length > 0 || editMode" color="primary" @click="save">Save</q-btn>
    <q-btn outline icon="add" v-if="!tableSelectedEntry.length > 0 && !editMode" color="secondary" @click="editMode = true">Add</q-btn>
    <q-btn outline icon="refresh" v-if="tableSelectedEntry.length > 0 || editMode" @click="resetEdit">Reset</q-btn>
    <q-btn outline icon="delete" v-if="tableSelectedEntry.length > 0 || editMode" @click="removeEntry"></q-btn>
    </p>
    <template v-if="tableSelectedEntry.length > 0 || editMode">
    <p>
    <q-field
      label="Hotkey"
      helper="Press any key."
    >
      <q-input v-model="inputValue" @keydown="hotkeyPressHandler"/>
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
          name: 'hotkey',
          required: true,
          label: 'Hotkey',
          align: 'left',
          field: 'hotkey',
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
      tableSelectedEntry: [],
      inputValue: '',
      commandValue: '',
      selectedPreset: 0,
      presetsOptions: [
        {value: 0, label: 'Default'}
      ],
      editMode: false,
      hotkeyPressed: []
    }
  },
  methods: {
    hotkeyPressHandler (e) {
      console.log('hotkeyPressHandler')
      console.log(e)
      let hotkey = getHotkeyValue(e.altKey, e.ctrlKey, e.shiftKey, e.keyCode)
      this.hotkeyPressed = [e.altKey ? 1 : 0, e.ctrlKey ? 1 : 0, e.shiftKey ? 1 : 0, e.keyCode]
      this.inputValue = hotkey
    },
    showEditDialog () {
      if (this.tableSelectedEntry.length) {
        let self = this
        let hotkey, command
        this.tableData.forEach(column => {
          if (column.hotkey === self.tableSelectedEntry[0].hotkey) {
            self.hotkeyPressed = this.presets[this.currentPresetId].hotkey[column.id]
            hotkey = column.hotkey
            command = column.command
          }
        })
        this.inputValue = hotkey
        this.commandValue = command
      }
    },
    setEditDialogInputs () {
      let self = this
      let hotkey, command
      this.tableData.forEach(column => {
        if (column.hotkey === self.tableSelectedEntry[0].hotkey) {
          self.hotkeyPressed = this.presets[this.currentPresetId].hotkey[column.id]
          hotkey = column.hotkey
          command = column.command
        }
      })
      this.inputValue = hotkey
      this.commandValue = command
    },
    resetEdit () {
      console.log('resetEdit')
      this.editMode = false
      this.tableSelectedEntry = []
    },
    save () {
      console.log('save')
      let entryId = -1
      let id = 0

      let alt, ctrl, shift, key
      [alt, ctrl, shift, key] = this.hotkeyPressed

      this.presets[this.currentPresetId].hotkey.forEach(settings => {
        let _alt, _ctrl, _shift, _key
        [_alt, _ctrl, _shift, _key] = settings
        if (key === _key && alt === _alt && ctrl === _ctrl && shift === _shift) {
          entryId = id
        }
        id++
      })

      if (entryId !== -1) {
        this.presets[this.currentPresetId].hotkey[entryId] = [alt, ctrl, shift, key, this.commandValue]
      } else {
        this.presets[this.currentPresetId].hotkey.unshift([alt, ctrl, shift, key, this.commandValue])
      }

      this.resetEdit()
      this.loadTableData()
    },
    removeEntry () {
      console.log('removeEntry')
      this.presets[this.currentPresetId].hotkey.splice(this.tableSelectedEntry[0].id, 1)
      this.resetEdit()
      this.loadTableData()
    },
    loadTableData () {
      console.log('loadTableData')
      this.tableData = []
      let id = 0
      let data = []
      this.presets[this.currentPresetId].hotkey.forEach(settings => {
        let alt, ctrl, shift, key, command
        [alt, ctrl, shift, key, command] = settings
        let hotkey = getHotkeyValue(alt, ctrl, shift, key)
        data.push({id, hotkey, command})
        id++
      })
      console.log(data)
      this.tableData = data
    }
  },
  watch: {
    tableSelectedEntry () {
      if (this.tableSelectedEntry.length) {
        this.showEditDialog()
      }
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
    }
  },
  mounted () {
    console.log('SETTING PRESETS')
    console.log(this.presets)
    this.loadTableData()
  }
}

function getHotkeyValue (alt, ctrl, shift, key) {
  var name
  switch (key) {
    case 49: name = '1'; break
    case 50: name = '2'; break
    case 51: name = '3'; break
    case 52: name = '3'; break
    case 53: name = '4'; break
    case 54: name = '5'; break
    case 55: name = '6'; break
    case 56: name = '7'; break
    case 57: name = '8'; break
    case 48: name = '0'; break
    case 45: name = 'NUM0'; break
    case 35: name = 'NUM1'; break
    case 40: name = 'NUM2'; break
    case 34: name = 'NUM3'; break
    case 37: name = 'NUM4'; break
    case 12: name = 'NUM5'; break
    case 39: name = 'NUM6'; break
    case 36: name = 'NUM7'; break
    case 38: name = 'NUM8'; break
    case 33: name = 'NUM9'; break
    case 96: name = 'NUM0'; break
    case 97: name = 'NUM1'; break
    case 98: name = 'NUM2'; break
    case 99: name = 'NUM3'; break
    case 100: name = 'NUM4'; break
    case 101: name = 'NUM5'; break
    case 102: name = 'NUM6'; break
    case 103: name = 'NUM7'; break
    case 104: name = 'NUM8'; break
    case 105: name = 'NUM9'; break
  }
  return (name !== undefined ? (alt ? 'Alt+' : '') + (ctrl ? 'Ctrl+' : '') + (shift ? 'Shift+' : '') + name : '')
}
</script>

<style>
</style>
