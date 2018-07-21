export default {
  currentTab: '',
  currentPresetId: 0,
  presets: [
    {
      id: 0,
      name: 'Default',
      isDefault: true,
      hotkey: [
        [0, 0, 0, 96, 'recall'],
        [0, 0, 0, 97, 'scan'],
        [0, 0, 0, 101, 'look'],
        [0, 0, 0, 104, 'north'],
        [0, 0, 0, 98, 'south'],
        [0, 0, 0, 100, 'west'],
        [0, 0, 0, 102, 'east'],
        [0, 0, 0, 105, 'up'],
        [0, 0, 0, 99, 'down'],
        [0, 1, 0, 104, 'scan n'],
        [0, 1, 0, 98, 'scan s'],
        [0, 1, 0, 100, 'scan w'],
        [0, 1, 0, 102, 'scan e'],
        [0, 1, 0, 103, 'scan u'],
        [0, 1, 0, 97, 'scan d'],
        [1, 1, 0, 104, 'open n'],
        [1, 1, 0, 98, 'open s'],
        [1, 1, 0, 100, 'open w'],
        [1, 1, 0, 102, 'open e'],
        [1, 1, 0, 103, 'open u'],
        [1, 1, 0, 97, 'open d'],
        [0, 0, 0, 107, 'wake'],
        [0, 0, 0, 109, 'sleep'],
        [0, 0, 0, 46, 'flee'],
        [0, 0, 0, 103, 'bash'],
        [1, 0, 0, 103, 'kick']
      ],
      alias: [
        ['gac', 'get all corpse'],
        ['sac', 'sacr all'],
        ['lp', 'look in pit'],
        ['lc', 'look in corpse'],
        ['food', 'cast \'create food\''],
        ['water', 'cast \'create spring\''],
        ['qr', 'quest request'],
        ['qc', 'quest complete'],
        ['qcan', 'quest cancel']
      ],
      trigger: [
        ['Ты хочешь есть.', 'eat mush'],
        ['Ты хочешь пить.', 'dr bar']
      ]
    },
    {
      id: 1,
      name: 'Warrior',
      hotkey: [
        [0, 0, 0, 96, 'recall 2'],
        [0, 0, 0, 97, 'scan 2'],
        [0, 0, 0, 101, 'look 2'],
        [0, 0, 0, 104, 'north 2'],
        [0, 0, 0, 98, 'south 2'],
        [0, 0, 0, 100, 'west'],
        [0, 0, 0, 102, 'east'],
        [0, 0, 0, 105, 'up'],
        [0, 0, 0, 99, 'down'],
        [0, 1, 0, 104, 'scan n'],
        [0, 1, 0, 98, 'scan s'],
        [0, 1, 0, 100, 'scan w'],
        [0, 1, 0, 102, 'scan e'],
        [0, 1, 0, 103, 'scan u'],
        [0, 1, 0, 97, 'scan d'],
        [1, 1, 0, 104, 'open n'],
        [1, 1, 0, 98, 'open s'],
        [1, 1, 0, 100, 'open w'],
        [1, 1, 0, 102, 'open e'],
        [1, 1, 0, 103, 'open u'],
        [1, 1, 0, 97, 'open d'],
        [0, 0, 0, 107, 'wake'],
        [0, 0, 0, 109, 'sleep'],
        [0, 0, 0, 110, 'flee']
      ],
      alias: [
        ['gac2', 'get all corpse'],
        ['sac2', 'sacr all']
      ],
      trigger: [
        ['Ты хочешь есть.', 'eat mush'],
        ['Ты хочешь пить.', 'dr bar']
      ]
    }
  ],
  isAltKey: 0,
  isCtrlKey: 0,
  isShiftKey: 0,
  commandQueueLength: 50,
  stats: {
    max_hit: 0,
    max_mana: 0,
    max_move: 0,
    hit: 0,
    mana: 0,
    move: 0
  },
  roomName: ''
}
