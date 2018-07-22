<template>
  <q-layout view="lHr LpR lfr">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          DreamLand MUD
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <!-- showRight is a model attached to right side drawer below -->
        <q-btn
          flat round dense
          @click="rightDrawerOpen = !rightDrawerOpen"
          :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
          icon="menu"
        />

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Полезные ссылки</q-list-header>
        <q-item @click.native="openURL('https://dreamland.rocks')">
          <q-item-side icon="home" />
          <q-item-main label="Главная" sublabel="https://dreamland.rocks" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/maps.html')">
          <q-item-side icon="map" />
          <q-item-main label="Карты" sublabel="https://dreamland.rocks/maps.html" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/searcher.html')">
          <q-item-side icon="search" />
          <q-item-main label="Поиск вещей" sublabel="https://dreamland.rocks/searcher.html" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/guide.html')">
          <q-item-side icon="info" />
          <q-item-main label="Учебник" sublabel="https://dreamland.rocks/guide.html" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/dev')">
          <q-item-side icon="check" />
          <q-item-main label="Ресурсы строителей" sublabel="https://dreamland.rocks/dev" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/mudjs/build.html')">
          <q-item-side icon="check" />
          <q-item-main label="Стройплощадка" sublabel="https://dreamland.rocks/build.html" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/ruffinakoza/mudjs-vue')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub этого проекта" sublabel="https://github.com/ruffinakoza/mudjs-vue" />
        </q-item>
        <q-item @click.native="openURL('https://dreamland.rocks/mudjs')">
          <q-item-side icon="check" />
          <q-item-main label="Другой клиент" sublabel="https://dreamland.rocks/mudjs" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-layout-drawer side="right" v-model="rightDrawerOpen">
      <right-drawer-component></right-drawer-component>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
import { openURL, date, QLayout, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemMain, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QCardSeparator, QBtnGroup, QChip, QSearch, QSelect, QInnerLoading, QSpinnerGears, QSpinner, QSpinnerAudio, QScrollArea, QChatMessage, QInput, QField, QCarousel, QCarouselSlide, QVideo, QTabs, QTab, QTabPane, QRouteTab, QTable, QTh, QTr, QTd, QTableColumns } from 'quasar'

import rightDrawerComponent from '../components/rightDrawerComponent.vue'

export default {
  name: 'LayoutDefault',
  components: {date, QLayout, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QListHeader, QItem, QItemSide, QItemMain, QCard, QCardTitle, QCardMain, QCardMedia, QCardActions, QCardSeparator, QBtnGroup, QChip, QSearch, QSelect, QInnerLoading, QSpinnerGears, QSpinner, QSpinnerAudio, QScrollArea, QChatMessage, QInput, QField, QCarousel, QCarouselSlide, QVideo, QTabs, QTab, QTabPane, QRouteTab, QTable, QTh, QTr, QTd, QTableColumns, rightDrawerComponent},
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    loadPresets () {

    }
  }
}
</script>

<style>

</style>
