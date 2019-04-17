<template>
<q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <div id="page" class="full-width full-height absolute-top">
            <div id="terminal-wrap">
                <div id="terminal">
                  <pre>
</pre>
</div>
            </div>
          </div>
        </div>
      <div class="col-12 absolute-bottom">
        <q-input ref="command" @focus="inputFocused = true" @blur="inputFocused = false" v-model="userInput" :after="[{icon: 'send'}]" @keyup="onUserInputChange"/>
      </div>
    </div>
</q-page>

</template>

<style>
</style>

<script>
import $ from 'jquery'
import { date, QLayout, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemMain, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QCardSeparator, QBtnGroup, QChip, QSearch, QSelect, QInnerLoading, QSpinnerGears, QSpinner, QSpinnerAudio, QScrollArea, QChatMessage, QInput, QField, QCarousel, QCarouselSlide, QVideo, QTabs, QTab, QTabPane, QRouteTab } from 'quasar'

window.jQuery = $
window.$ = $

export default {
  name: 'PageIndex',
  components: {date, QLayout, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemMain, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QCardSeparator, QBtnGroup, QChip, QSearch, QSelect, QInnerLoading, QSpinnerGears, QSpinner, QSpinnerAudio, QScrollArea, QChatMessage, QInput, QField, QCarousel, QCarouselSlide, QVideo, QTabs, QTab, QTabPane, QRouteTab},
  data () {
    return {
      userInput: '',
      defaultPreset: 0,
      globalConfig: [],
      inputFocused: false,
      inputQueue: [],
      inputQueueTemplate: '',
      inputQueueLastId: -1,
      newAlias: null,
      newAction: null
    }
  },
  methods: {
    onUserInputChange (e) {
      console.log('onUserInputChange')
      console.log(e.keyCode)
      if (e.keyCode === 13) {
        console.log('SEND1 (' + this.userInput + ' ' + typeof this.userInput + ')')

        if (!this.userInput.length) {
          send('')
          return
        }

        if (typeof this.userInput === 'undefined') return

        let command, aliasId = this.currentPreset.alias.findIndex(alias => alias[0] === this.userInput)
        if (aliasId !== -1) {
          command = this.currentPreset.alias[aliasId][1]
        } else {
          command = this.userInput
        }

        send(command)

        if (this.inputQueue.slice(-1) !== this.userInput) {
          this.inputQueue.push(this.userInput)
          if (this.inputQueue.length > this.commandQueueLength) {
            this.inputQueue.shift()
          }
        }

        console.log(this.inputQueue)

        this.inputQueueLastId = -1
        this.userInput = ''
        this.inputQueueTemplate = ''
        this.$refs.command.blur()
      } else if (e.keyCode === 27) {
        console.log('ESC')
        this.userInput = ''
        this.$refs.command.blur()
      } else if (e.key === 'Enter') {
        this.userInput = ''
        send('')
      } else if (e.key === 'ArrowUp') {
        if (this.inputQueueTemplate === '' && this.inputQueueLastId === -1 && this.userInput !== '') {
          this.inputQueueTemplate = this.userInput
        }

        if (this.inputQueueTemplate === '' && this.inputQueueLastId !== -1) {
          if (this.inputQueueLastId > 0) {
            this.inputQueueLastId--
            this.userInput = this.inputQueue[this.inputQueueLastId]
          }
          return
        }

        let i, match, id = (this.inputQueueLastId !== -1 ? this.inputQueueLastId - 1 : this.inputQueue.length - 1)

        for (i = id, match = 0; i >= 0; i--) {
          let previousCommand = this.inputQueue[i]
          if (previousCommand === '' || previousCommand === this.userInput) continue
          if (previousCommand.indexOf(this.inputQueueTemplate) === 0 &&
            (this.inputQueueLastId === -1 || id < this.inputQueueLastId)) {
            this.userInput = previousCommand
            this.inputQueueLastId = id
            match++
            break
          }
          id--
        }

        if (!match) {
          this.userInput = this.inputQueueTemplate
          this.inputQueueLastId = -1
        }
      } else if (e.key === 'ArrowDown') {
        if (this.inputQueueTemplate === '' && this.inputQueueLastId !== -1) {
          if (this.inputQueueLastId <= this.inputQueue.length) {
            this.inputQueueLastId++
            this.userInput = this.inputQueue[this.inputQueueLastId]
          }
          return
        }

        let i, match, id = (this.inputQueueLastId !== -1 ? this.inputQueueLastId + 1 : 0)

        for (i = id, match = 0; i < this.inputQueue.length; i++) {
          let previousCommand = this.inputQueue[i]
          if (previousCommand === '' || previousCommand === this.userInput) continue
          if (previousCommand.indexOf(this.inputQueueTemplate) === 0 && (id > this.inputQueueLastId)) {
            this.userInput = previousCommand
            this.inputQueueLastId = id
            match++
            break
          }
          id++
        }

        if (!match) {
          this.userInput = this.inputQueueTemplate
          this.inputQueueLastId = this.inputQueue.length
        }
      }
    },
    onKeyPress (e) {
      console.log('onKeyPress')
      this.handleControlKeysEvents(e)
    },
    onKeyDown (e) {
      console.log('onKeyDown')
      this.handleControlKeysEvents(e)
      if (document.activeElement.tagName === 'BODY' && !this.isAltKey && !this.isCtrlKey && !this.isControlsTabActive) {
        this.$refs.command.focus()
      }
    },
    onKeyUp (e) {
      console.log('onKeyUp ' + this.inputFocused + ' ' + this.isControlsTabActive + ' ' + this.currentTab)

      if (this.inputFocused || !this.isControlsTabActive) {
        e.preventDefault()
        return false
      }

      let alt, ctrl, shift, code
      [alt, ctrl, shift, code] = this.handleControlKeysEvents(e)

      if (e.key === 'Enter') {
        if (this.userInput !== '') {
          send(this.userInput)
          this.userInput = ''
        } else {
          send('')
        }
        e.preventDefault()
        return false
      } else if (e.key === 'ArrowUp') {
        if (this.userInput === '') {
          console.log('SETTING FIRST TEMPLATE ' + this.inputQueue.length + ' ' + this.userInput)
          this.userInput = this.inputQueue.slice(-1)
          this.inputQueueLastId = this.inputQueue.length - 1
          this.inputQueueTemplate = ''
          this.$refs.command.focus()
          e.preventDefault()
          return false
        }
      } else if (['ArrowDown', 'Alt', 'Control', 'Shift', 'Home', 'End', 'Delete', 'Escape', 'Backspace', 'Meta', 'Tab'].indexOf(e.key) !== -1) {
        e.preventDefault()
        return false
      }

      let found = 0
      if (code in this.globalConfig) {
        this.globalConfig[code].forEach(config => {
          let _alt, _ctrl, _shift, _code, _text
          [_alt, _ctrl, _shift, _code, _text] = config
          if (code === _code && alt === _alt && ctrl === _ctrl && shift === _shift) {
            send(_text)
            found++
          }
        })
      }

      if (found) {
        e.preventDefault()
        return false
      } else {
        if (!alt && !ctrl) {
          this.$refs.command.focus()
          this.userInput += e.key
        }
      }
    },
    handleControlKeysEvents (e) {
      let alt = (e.altKey ? 1 : 0)
      let ctrl = (e.ctrlKey ? 1 : 0)
      let shift = (e.shiftKey ? 1 : 0)
      let code = (e.keyCode || e.which)

      this.isAltKey = alt
      this.isCtrlKey = ctrl
      this.isShiftKey = shift

      return [alt, ctrl, shift, code]
    },
    loadPreset () {
      console.log('LOAD')
      let self = this
      this.presets[this.defaultPreset].hotkey.forEach(config => {
        let code = config[3]
        if (!(code in self.globalConfig)) {
          self.globalConfig[code] = []
        }
        self.globalConfig[code].push(config)
      })
    }
  },
  watch: {
    inputFocused () {
      console.log('inputFocused')
      // console.log(this.inputFocused)
    },
    userInput () {
      if (this.userInput === '') {
        this.inputQueueLastId = -1
        this.inputQueueTemplate = ''
      }
    },
    newAlias () {
      if (this.newAlias !== null) {
        console.log('GOT ALIAS')
        console.log(this.newAlias)
        this.currentPreset.alias.push(this.newAlias)
        this.newAlias = null
      }
    },
    newAction () {
      if (this.newAction !== null) {
        console.log('GOT ACTION')
        console.log(this.newAction)
        this.currentPreset.trigger.push(this.newAction)
        this.newAction = null
      }
    }
  },
  computed: {
    presets: {
      get () {
        return this.$store.state.common.presets
      },
      set (val) {
        this.$store.commit('common/updatePresets', val)
      }
    },
    currentTab: {
      get () {
        return this.$store.state.common.currentTab
      },
      set (tab) {
        this.$store.commit('common/updateCurrentTab', tab)
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
    stats: {
      get () {
        return this.$store.state.common.stats
      },
      set (val) {
        this.$store.commit('common/updateStats', val)
      }
    },
    roomName: {
      get () {
        return this.$store.state.common.roomName
      },
      set (val) {
        this.$store.commit('common/updateRoomName', val)
      }
    },
    commandQueueLength () {
      return this.$store.state.common.commandQueueLength
    },
    isControlsTabActive () {
      return this.$store.state.common.currentTab === 'tab-controls'
    },
    currentPresetId () {
      return this.$store.state.common.currentPresetId
    },
    currentPreset () {
      return this.presets[this.currentPresetId]
    }
  },
  mounted () {
    console.log('INDEX MOUNTED')
    // �[1;37mРыночная Площадь�[0m�[0;37m �[1;36m[Выходы: north east south west]�[0m�[0;37m �[1;32mКолючая зеленая елка (fir) хочет быть украшенной.�[0m�[0;37m �[1;33mВалькирия (Valkyrie) сидит посреди площади и вершит суд от имени богов. �[0m�[0;37m�[1;33mA dark summoned shadow is here. �[0m�[0;37mВалькирия произносит '�[0;32mПривет Terran!�[0m�[0;37m'
    this.loadPreset()
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('keydown', this.onKeyDown)
  },
  created () {
    var self = this
    setInterval(function () {
      if (typeof $.stats === 'object') {
        self.roomName = $.roomName
        self.stats = $.stats
      }
      if ($.alias !== null) {
        self.newAlias = $.alias
        $.alias = null
      }
      if ($.action !== null) {
        self.newAction = $.action
        $.action = null
      }
      $.preset = self.currentPreset
      // console.log(self.stats)
    }, 1000)
  },
  beforeMount () {
    console.log('BEFORE')
    $.triggers = this.currentPreset.trigger
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp, true)
    window.removeEventListener('keydown', this.onKeyDown, true)
  }
}

var PROTO_VERSION = 'DreamLand Web Client/1.7'
var wsUrl = 'wss://dreamland.rocks/dreamland',
  msgs = [],
  send = function () {},
  echo = function () {},
  notify = function () {}

$.action = $.alias = null

$(document).ready(function () {
  function connect () {
    var ws = new WebSocket(wsUrl, ['binary'])

    var telnet = new Telnet()

    telnet.handleRaw = function (s) {
      process(s)
    }

    var handlers = {
      'console_out': function (b) {
        telnet.process(b)
      },
      'notify': function (b) {
        notify(b)
      },
      'alert': function (b) {
        alert(b)
      },
      'prompt': function (b) {
      },
      'version': function (b) {
        if (b !== PROTO_VERSION) {
          process('BAD PROTOCOL VERSION')
          ws.close()
        }
      }
    }

    ws.binaryType = 'arraybuffer'

    ws.onmessage = function (e) {
      var b = new Uint8Array(e.data)
      b = String.fromCharCode.apply(null, b)
      b = decodeURIComponent(escape(b))
      b = JSON.parse(b)
      console.log(b)
      msgs.push(b)
      // handlers[b.command].apply(handlers, b.args)
      var h = handlers[b.command]
      if (h) {
        h.apply(handlers, b.args)
      } else {
        console.log('Dont know how to handle ' + b.command)
      }
      b.args.forEach(obj => {
        console.log('LINE')
        console.log(obj)
        switch (typeof obj) {
          case 'string':
            let roomName = getRoomName(obj)
            if (roomName !== null) {
              $.roomName = roomName
            }
            $.triggers.forEach(trigger => {
              let [actionText, command] = trigger
              if (obj.indexOf(actionText) !== -1) {
                console.log('FOUND TRIGGER')
                send(command)
              }
            })
            break

          case 'object':
            $.stats = obj
            break
        }
      })
      console.log(b)
    }

    ws.rpccmd = function (cmd) {
      console.log('rcpcmd ' + cmd)
      ws.send(JSON.stringify({
        command: cmd,
        args: Array.prototype.slice.call(arguments, 1)
      }))
    }

    ws.onopen = function (e) {
      send('1')
    }

    ws.onclose = function (e) {
      process('\u001b[1;31m#################### DISCONNECTED ####################\n')
      $('#reconnect').show()
      $('#input input').hide()
      ws = null
    }

    send = function (text) {
      console.log('SEND2 (' + text + ')')

      if (text === '') {
        console.log('SENDING ENTER')
        ws.rpccmd('console_in', '\n')
        return
      }

      if (text.indexOf('#') === 0) {
        let space = text.substr(1).indexOf(' ')
        if (space === -1) {
          space = text.length
        }
        console.log('GOT ALIAS 0')
        let data, command
        let cmd = text.substr(1, space).toLowerCase()
        let params = text.substr(1 + cmd.length + 1)
        console.log('cmd = ' + cmd)
        console.log('params = ' + params)
        switch (cmd) {
          case 'help':
            echo('Available commands:\n')
            echo('\n')
            echo('#ACTION [text] [command] - add action\n')
            echo('#UNACTION [text] - remove action\n')
            echo('#ALIAS [text] [command] - add alias\n')
            echo('#UNALIAS [text] - remove alias\n')
            echo('#EXPORT - export current preset\n')
            echo('#HELP - this message\n')
            echo('\n')
            break
          case 'action':
            data = params.substr(0, params.indexOf(' '))
            command = params.substr(data.length + 1)
            console.log('data = ' + data + ' command = ' + command)
            $.action = [data, command]
            echo(data + '\n')
            echo('OK')
            break
          case 'alias':
            data = params.substr(0, params.indexOf(' '))
            command = params.substr(data.length + 1)
            console.log('data = ' + data + ' command = ' + command)
            $.alias = [data, command]
            echo(text + '\n')
            echo('OK')
            break
          case 'export':
            console.log('EXPORT')
            let config = []
            $.preset.trigger.forEach(trigger => {
              let [text, command] = trigger
              config.push('#action {' + text + '} {' + command + '}')
            })
            $.preset.alias.forEach(alias => {
              let [text, command] = alias
              config.push('#alias {' + text + '} {' + command + '}')
            })
            $.preset.hotkey.forEach(hotkey => {
              let [alt, ctrl, shift, key, command] = hotkey
              let hotkeyValue = getHotkeyValue(alt, ctrl, shift, key)
              config.push('#hot {' + hotkeyValue + '} {' + command + '}')
            })
            alert(config.join('\n'))
            break
        }
        return
      }

      if (ws === null) return

      let speedWalkPath = parseSpeedWalk(text)
      if (speedWalkPath !== null) {
        speedWalkPath.forEach(path => {
          console.log(path)
          ws.rpccmd('console_in', path + '\n')
          echo(path + '\n')
        })
        return
      }

      if (text.indexOf(';') !== -1) {
        let commands = text.split(';')
        commands.forEach(command => {
          ws.rpccmd('console_in', command + '\n')
          echo(command + '\n')
        })
      } else {
        ws.rpccmd('console_in', text + '\n')
        echo(text + '\n')
      }
    }

    window.SEND = send

    process('Connecting....\n')
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
      case 107: name = 'NUM+'; break
      case 109: name = 'NUM-'; break
      case 46: name = 'NUM.'; break
    }
    return (name !== undefined ? (alt ? 'Alt+' : '') + (ctrl ? 'Ctrl+' : '') + (shift ? 'Shift+' : '') + name : '')
  }

  function parseSpeedWalk (text) {
    var isSpeedWalk = /^(\d*[neswud])*$/.test(text)
    if (!isSpeedWalk) return null
    var pathDirections = text.split(/(\d*[neswud])/).filter(function (v) {
      return v !== ''
    })
    var paths = []
    pathDirections.forEach(function (path) {
      var pathEntry = path.match(/^(\d)+([neswud])$/)
      if (pathEntry !== null) {
        for (var i = 0; i < parseInt(pathEntry[1]); i++) {
          paths.push(pathEntry[2])
        }
      } else {
        paths.push(path)
      }
    })
    return paths
  }

  function getRoomName (text) {
    if (typeof text !== 'string' || text.indexOf('Выходы') === -1 || text.indexOf('\u001b') === -1) return null
    return text.split('\u001b')[1].substr(6)
  }

  function process (s) {
    $('#terminal').trigger('output', [
      s
    ])
  }

  if ('Notification' in window) {
    Promise.resolve(Notification.permission).then(function (perm) {
      if (perm === 'granted') {
        return perm
      } else {
        return Notification.requestPermission()
      }
    }).then(function (perm) {
      if (perm === 'granted') {
        notify = function (text) {
          if (document.hidden) {
            Notification(text)
          }
        }
      }
    })
  }

  connect()

  var terminal = $('#terminal')
  var txt = ''
  var x = 0
  var ansi = ''

  var bold = false,
    fg = 7,
    bg = 0
  var desiredClass = 'fg-ansi-dark-color-7'
  var actualClass

  function processAnsi (start, params, cmd) {
    if (start !== '[') {
      return
    }
    var i
    switch (cmd) {
      case 'm':
        for (i in params) {
          if (params[i] === '0') {
            bold = false
          }
          if (params[i] === '1') {
            bold = true
          }
          if (params[i] >= 40 && params[i] <= 49) {
            bg = params[i] - 40
            console.log('background ignored: ' + bg)
          }
          if (params[i] >= 30 && params[i] <= 39) {
            fg = params[i] - 30
          }
          if (bold) {
            desiredClass = 'fg-ansi-bold fg-ansi-bright-color-' + fg
          } else {
            desiredClass = 'fg-ansi-dark-color-' + fg
          }
        }
        break
      case 'J':
        txt = ''
        // terminal.empty();
        break
      case 'H':
        console.log('move cursor')
        break
      default:
        console.log('wtf: ' + cmd + ', ' + params)
    }
  }

  echo = function (b) {
    actualClass = ''
    txt = ''
    function addText (t) {
      if (desiredClass !== actualClass) {
        if (txt) {
          txt += '</span>'
        }
        txt += '<span class="' + desiredClass + '">'
        actualClass = desiredClass
      }
      txt += t
    }
    for (var i in b) {
      if (ansi) {
        ansi += b[i]
        var m = ansi.match('.(.)([0-9;]*)([A-Za-z])')
        if (m) {
          ansi = ''
          processAnsi(m[1], m[2].split(';'), m[3])
        }
      } else {
        var c = b.charCodeAt(i)

        switch (c) {
          case 0xa:
            addText('\n')
            x = 0
            break
          case 0x9:
            while ((++x % 8) !== 0) {
              addText(' ')
            }
            break
          case 0x1b:
            ansi += b[i]
            break
          default:
            if (c >= 0x20) {
              addText(b[i])
              x++
            }
        }
      }
    }
    if (txt) {
      if (actualClass !== '') {
        txt += '</span>'
      }

      var span = $('<span/>')
      span.html(txt)
      // Replace colour "<c c='fgbr'/>" tags coming from the server with spans.
      span.find('c').each(function (index) {
        var style = $(this).attr('c')
        $(this).replaceWith(function () {
          var result = $('<span/>').append($(this).contents())
          result.addClass(style)
          return result
        })
      })

      // Ignore all manip tags "<m/>" coming from the server.
      span.find('m').each(function (index) {
        $(this).replaceWith(function () {
          return $('<span/>').append($(this).contents())
        })
      })

      var atBottom = $('#terminal-wrap').scrollTop() > ($('#terminal').height() - $('#terminal-wrap').height() - 10)
      var lines = span.appendTo(terminal).text().replace(/\xa0/g, ' ').split('\n')
      $(lines).each(function () {
        $('.trigger').trigger('text', [
          '' + this
        ])
      })

      // only autoscroll if near the bottom of the page
      if (atBottom) {
        $('#terminal-wrap').scrollTop($('#terminal').height())
      }
    }
  }
  terminal.on('output', function process (e, b) {
    echo(b)
  })
})

//
// TELNET
//
// these are not real telnet characters, but rather koi2utf versions of them
var TELNET_IAC = 'Ъ' /* interpret as command: */
var TELNET_DONT = 'Ч' /* you are not to use option */
var TELNET_DO = 'Щ' /* please, you use option */
var TELNET_WONT = 'Э' /* I won't use option */
var TELNET_WILL = 'Ш' /* I will use option */
var TELNET_SB = 'З' /* interpret as subnegotiation */
// var TELNET_GA = 'Ы' /* you may reverse the line */
// var TELNET_EL = 'Ь' /* erase the current line */
// var TELNET_EC = 'В' /* erase the current character */
// var TELNET_AYT = 'Ж' /* are you there */
// var TELNET_AO = 'У' /* abort output--but let prog finish */
// var TELNET_IP = 'Т' /* interrupt process--permanently */
// var TELNET_BREAK = 'С' /* break */
// var TELNET_DM = 'Р' /* data mark--for connect. cleaning */
// var TELNET_NOP = 'Я' /* nop */
var TELNET_SE = 'П' /* end sub negotiation */
// var TELNET_EOR = 'О' /* end of record (transparent mode) */

var TNS_NORMAL = 0
var TNS_SUBNEG = 1
var TNS_SUBNEG_IAC = 2

function Telnet () {
  this.telnet_state = TNS_NORMAL
  this.subneg = ''
}

Telnet.prototype.process = function (b) {
  var s = ''

  for (var i = 0; i < b.length; i++) {
    switch (this.telnet_state) {
      case TNS_NORMAL:
        switch (b.charAt(i)) {
          case TELNET_IAC:
            this.telnet_state = TELNET_IAC
            break
          default:
            s += b.charAt(i)
        }
        break

      case TELNET_IAC:
        switch (b.charAt(i)) {
          case TELNET_DONT:
          case TELNET_DO:
          case TELNET_WONT:
          case TELNET_WILL:
            this.telnet_state = b.charAt(i)
            break

          case TELNET_SB:
            this.subneg = ''
            this.telnet_state = TNS_SUBNEG
            break

          case TELNET_IAC:
            s += b.charAt(i)
            /* fall through */

          default:
            // ignore all unknown commands
            this.telnet_state = TNS_NORMAL
        }
        break

      case TNS_SUBNEG:
        switch (b.charAt(i)) {
          case TELNET_IAC:
            this.telnet_state = TNS_SUBNEG_IAC
            break

          default:
            this.subneg += b.charAt(i)
        }
        break

      case TNS_SUBNEG_IAC:
        switch (b.charAt(i)) {
          case TELNET_IAC:
            this.subneg += b.charAt(i)
            this.telnet_state = TNS_SUBNEG
            break

          case TELNET_SE:
            this.handleSubneg(this.subneg)
            this.telnet_state = TNS_NORMAL
            break
        }
        break

      case TELNET_DONT:
        this.handleDont(b.charAt(i))
        this.telnet_state = TNS_NORMAL
        break
      case TELNET_DO:
        this.handleDo(b.charAt(i))
        this.telnet_state = TNS_NORMAL
        break
      case TELNET_WONT:
        this.handleWont(b.charAt(i))
        this.telnet_state = TNS_NORMAL
        break
      case TELNET_WILL:
        this.handleWill(b.charAt(i))
        this.telnet_state = TNS_NORMAL
        break
    }
  }

  if (s) {
    this.handleRaw(s)
  }
}

// Override these:
Telnet.prototype.handleRaw = function (b) {}
Telnet.prototype.handleDont = function (b) {}
Telnet.prototype.handleDo = function (b) {}
Telnet.prototype.handleWont = function (b) {}
Telnet.prototype.handleWill = function (b) {}
Telnet.prototype.handleSubneg = function (b) {}

</script>
<style>
html, body{
    height:100%;
    margin:0;
    padding:0;
}

#editor {
    flex: 1 1 auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

#settings-button {
    position: fixed;
    top: 0;
    right: 0;
}

#settings-panel {
    display: flex;
    flex-flow: column;
    height: 80%;
    width: 30%;

    position: fixed;
    top: 0;
    right: 0;

    background-color: black;
    color: white;
    z-index: 1;
}

#settings-panel > button {
    flex: 0 1 auto;
}

#page {
    min-height: 100%;
    height: 100%;
    width: 100%;
    flex-direction: column;
}

#terminal-wrap {
    overflow-y: auto;
    background-color: #2e3436;
    height: calc(100% - 40px);
}

#terminal {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.3em;
    background-color: #2e3436;
    color: #d3d7cf;
    white-space: pre-wrap;
}

#input {
    width: 100%;
    font-family: 'Roboto Mono', monospace;
    font-size: 1.3em;
    color: #ccc;
}

/* dark: */
.fg-ansi-dark-color-0, .fgdd { color: #2e3436; } /* background  */
.fg-ansi-dark-color-1, .fgdr { color: #cc0000; } /* r */
.fg-ansi-dark-color-2, .fgdg { color: #4e9a06; } /* g */
.fg-ansi-dark-color-3, .fgdy { color: #c4a000; } /* y */
.fg-ansi-dark-color-4, .fgdb { color: #3465a4; } /* b */
.fg-ansi-dark-color-5, .fgdm { color: #75507b; } /* m */
.fg-ansi-dark-color-6, .fgdc { color: #06989a; } /* c */
.fg-ansi-dark-color-7, .fgdw { color: #d3d7cf; } /* w, d */
/* bright: */
.fg-ansi-bright-color-0, .fgbd { color: #555753; } /* D */
.fg-ansi-bright-color-1, .fgbr { color: #ef2929; } /* R */
.fg-ansi-bright-color-2, .fgbg { color: #8ae234; } /* G */
.fg-ansi-bright-color-3, .fgby { color: #fce94f; } /* Y */
.fg-ansi-bright-color-4, .fgbb { color: #729fcf; } /* B */
.fg-ansi-bright-color-5, .fgbm { color: #ad7fa8; } /* M */
.fg-ansi-bright-color-6, .fgbc { color: #34e2e2; } /* C */
.fg-ansi-bright-color-7, .fgbw { color: #eeeeec; } /* W */

.fg-ansi-bold {
/*    font-weight: bold; */
}
</style>
