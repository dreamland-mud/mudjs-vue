export const updatePresets = (state, presets) => {
  state.presets = presets
}

export const updateAltKey = (state, val) => {
  // console.log('updateAltKey val = ' + val)
  state.isAltKey = val
}

export const updateCtrlKey = (state, val) => {
  // console.log('updateCtrlKey val = ' + val)
  state.isCtrlKey = val
}

export const updateShiftKey = (state, val) => {
  // console.log('updateShiftKey val = ' + val)
  state.isShiftKey = val
}

export const updateCurrentPresetId = (state, id) => {
  // console.log('updateCurrentPresetId id = ' + id)
  state.currentPresetId = id
}

export const updateCurrentTab = (state, tab) => {
  // console.log('updateCurrentTab tab = ' + tab)
  state.currentTab = tab
}

export const updateStats = (state, obj) => {
  // console.log('updateStats obj = ' + obj)
  state.stats = obj
}

export const updateRoomName = (state, name) => {
  // console.log('updateRoomName name = ' + name)
  state.roomName = name
}
