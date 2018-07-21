<template>
  <div>
  {{roomName}}
  <hr>
  <q-progress class="stats-progress-bar" :percentage="hitPerc" color="positive" height="12px" />
  <q-progress class="stats-progress-bar" :percentage="manaPerc" color="teal-4" height="12px" />
  <q-progress class="stats-progress-bar" :percentage="movePerc" color="warning" height="12px" />
  <hr>

  <span class="numpad">
    <span class="numpad-block" @click="onNumpadKeyClick(109)">- <span v-html="getNumpadKeyCommand(109)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(0)">*</span>
    <span class="numpad-block" @click="onNumpadKeyClick(0)">/</span>
    <span class="numpad-block" @click="onNumpadKeyClick(0)">Num<br>Lock</span>
    <span class="numpad-block numpad-block-big" v2="" @click="onNumpadKeyClick(107)">+<span v-html="getNumpadKeyCommand(107)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(105)">9<span v-html="getNumpadKeyCommand(105)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(104)">8<span v-html="getNumpadKeyCommand(104)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(103)">7<span v-html="getNumpadKeyCommand(103)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(102)">6<span v-html="getNumpadKeyCommand(102)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(101)">5<span v-html="getNumpadKeyCommand(101)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(100)">4<span v-html="getNumpadKeyCommand(100)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(13)" v2="">Enter</span>
    <span class="numpad-block" @click="onNumpadKeyClick(99)">3<span v-html="getNumpadKeyCommand(99)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(98)">2<span v-html="getNumpadKeyCommand(98)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(97)">1<span v-html="getNumpadKeyCommand(97)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(46)">. <span v-html="getNumpadKeyCommand(46)"></span></span>
    <span class="numpad-block" @click="onNumpadKeyClick(96)" h2="">0<span v-html="getNumpadKeyCommand(96)"></span></span>
  </span>

  <q-btn :disable="(isAltKey ? false : true)" :color="(isAltKey ? 'green' : '')" outline>Alt</q-btn>
  <q-btn :disable="(isCtrlKey ? false : true)" :color="(isCtrlKey ? 'green' : '')" outline>Ctrl</q-btn>
  <q-btn :disable="(isShiftKey ? false : true)" :color="(isShiftKey ? 'green' : '')" outline>Shift</q-btn>
  </div>
</template>

<script>
import { date, QBtn, QProgress, QItemSeparator } from 'quasar'

export default {
  name: 'ControlsComponent',
  components: {date, QBtn, QProgress, QItemSeparator},
  data () {
    return {
    }
  },
  methods: {
    getNumpadKeyCommand (key) {
      let alt, ctrl, shift, command
      [alt, ctrl, shift] = [this.isAltKey, this.isCtrlKey, this.isShiftKey]
      this.preset.hotkey.forEach(settings => {
        let _alt, _ctrl, _shift, _key, _command
        [_alt, _ctrl, _shift, _key, _command] = settings
        if (key === _key && alt === _alt && ctrl === _ctrl && shift === _shift) {
          command = _command
        }
      })
      return command
    },
    onNumpadKeyClick (key) {
      let command = this.getNumpadKeyCommand(key)
      console.log('GOING TO SEND')
      console.log(command)
      window.SEND(command)
    }
  },
  computed: {
    hitPerc () {
      return (this.stats.hit / this.stats.max_hit) * 100
    },
    manaPerc () {
      return (this.stats.mana / this.stats.max_mana) * 100
    },
    movePerc () {
      return (this.stats.move / this.stats.max_move) * 100
    },
    preset () {
      return this.presets[this.currentPresetId]
    },
    presets: {
      get () {
        return this.$store.state.common.presets
      },
      set (data) {
        this.$store.commit('common/updatePresets', data)
      }
    },
    isAltKey: {
      get () {
        return this.$store.state.common.isAltKey
      },
      set (val) {
        this.$store.commit('common/updateAltKey', val)
      }
    },
    isCtrlKey: {
      get () {
        return this.$store.state.common.isCtrlKey
      },
      set (val) {
        this.$store.commit('common/updateCtrlKey', val)
      }
    },
    isShiftKey: {
      get () {
        return this.$store.state.common.isShiftKey
      },
      set (val) {
        this.$store.commit('common/updateShiftKey', val)
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
    stats: {
      get () {
        return this.$store.state.common.stats
      },
      set (val) {
        this.$store.commit('common/updateStats', val)
      }
    },
    roomName () {
      return this.$store.state.common.roomName
    }
  }
}

</script>

<style>
.numpad {
    width: 100%;
    border: 1px solid black;
    display: inline-block;
    height:  330px;
}
.numpad-block span {
  position: relative;
  top:  30px;
  left: -10px;
  color: #888;
  font-size: 12px;
}
.numpad-block {
    display: inline-block;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: calc(25% - 10px);
    height: 55px;
    margin: 5px;
    float: right;
    border:  1px solid #ccc;
    padding-left:  5px;
    cursor: pointer;
}
.numpad-block:active {
  border: 2px  solid #00823F;
  top: 0px;
}
.numpad-block:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
}
.numpad-block-big span {
  position: relative;
  top:  95px;
}
.numpad-block[v2] {
    height: 120px;
}
.numpad-block[h2] {
    width: calc(50% - 10px);
}
.stats-progress-bar {
  margin-bottom: 4px;
  border:1px solid #ccc;
}
</style>
