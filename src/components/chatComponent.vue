<template>
<div class="no-padding no-margin">
  <q-tabs>
  <q-tab default slot="title" name="tab-chat-private" label="Private" />
  <q-tab slot="title" name="tab-chat-ooc" label="OOC" />
  <q-tab slot="title" name="tab-chat-ic" label="IC" />

  <!-- private -->
  <q-tab-pane name="tab-chat-private">

  <template v-if="activeChat">
    <q-btn icon="keyboard_arrow_left" class="full-width" outline align="left" @click="activeChat = false"> &nbsp;Назад</q-btn>
    <q-item-separator/>
  </template>

  <template v-if="!activeChat">
    <q-btn v-for="(chat, name) in chatPrivate" :key="name" outline class="full-width" align="left" @click="toggleChat(name)">{{name}}</q-btn>
  </template>
  <template v-else>
    <q-chat-message :name="(chat.type === 0 ? 'me' : currentChat)" :sent="(chat.type === 0)" :stamp="chat.date" :text="chat.text" v-for="(chat, timestamp) in chatPrivate[currentChat].messages" :key="timestamp"></q-chat-message>

    <q-input v-model="chatInput" :after="[{icon: 'send'}]" @enter="chatSend" style="border-top: 1px solid #cecece; height: 40px;"/>

  </template>

  </q-tab-pane>

  <q-tab-pane name="tab-chat-ooc">
    <q-chat-message :name="chat.name" :sent="(chat.type === 0)" :stamp="chat.date" :text="chat.text" v-for="chat in ooc" :key="chat.date"></q-chat-message>

  <div class="absolute-bottom">
    <q-input v-model="chatInput" :after="[{icon: 'send'}]" @enter="chatSend" style="border-top: 1px solid #cecece; height: 40px;"/>
  </div>
  </q-tab-pane>

  <q-tab-pane name="tab-chat-ic">
    IC
  </q-tab-pane>

</q-tabs>
</div>
</template>

<script>
import { QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemTile, QItemMain, QTabs, QTab, QTabPane, QChatMessage, QItemSeparator, QInput, QScrollArea } from 'quasar'

export default {
  name: 'rightDrawerComponent',
  components: {QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemTile, QItemMain, QTabs, QTab, QTabPane, QChatMessage, QItemSeparator, QInput, QScrollArea},
  data () {
    return {
      activeChat: false,
      currentChat: '',
      chatInput: '',
      chatPrivate: {
        'Filths': {unread: 1, messages: [{date: '2018-01-01 12:00', type: 0, text: ['test']}, {date: '2018-01-01 11:01', type: 0, text: ['test 2']}, {date: '2018-01-01 11:02', type: 1, text: ['test to']}, {date: '2018-01-01 12:00', type: 0, text: ['test']}, {date: '2018-01-01 11:01', type: 0, text: ['test 2']}, {date: '2018-01-01 11:02', type: 1, text: ['test to']}, {date: '2018-01-01 12:00', type: 0, text: ['test']}, {date: '2018-01-01 11:01', type: 0, text: ['test 2']}, {date: '2018-01-01 11:02', type: 1, text: ['test to']}, {date: '2018-01-01 12:00', type: 0, text: ['test']}, {date: '2018-01-01 11:01', type: 0, text: ['test 2']}, {date: '2018-01-01 11:02', type: 1, text: ['test to']}]}
      },
      ooc: [{date: '2018-01-01 12:00', name: 'Filths', unread: 1, text: ['test 1', 'test 2']}],
      ic: [{date: '2018-01-01 12:00', name: 'Filths', unread: 1, text: ['test 3', 'test 4 ']}]
    }
  },
  computed: {
  },
  methods: {
    toggleChat (name) {
      console.log('TOGGLE ' + name)
      this.currentChat = name
      this.activeChat = true
    },
    chatSend () {
      console.log('chatSend')
    }
  },
  mounted () {
    console.log('HELLO THERE')
  }
}
</script>

<style>

</style>
