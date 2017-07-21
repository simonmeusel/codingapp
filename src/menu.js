const { app, Menu, shell } = require('electron')
const settings = require('electron-settings');

const timeouts = [10, 30, 60, 120, 1800, 3600]

function setTime (time) {
  settings.set('time', time)
}

function generateReloadSubmenu () {
  const submenu = []
  timeouts.forEach((time) => {
    submenu.push({
      label: time + 's',
      click () { setTime(time * 1000) }
    })
  })
  return submenu
}

const template = [
  {
    label: 'Reload',
    submenu: generateReloadSubmenu()
  },
  {
    label: 'View',
    submenu: [
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Website',
        click () { shell.openExternal('https://github.com/simonmeusel/codingapp') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

module.exports = Menu.buildFromTemplate(template)
