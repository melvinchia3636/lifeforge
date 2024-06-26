import { type IRoutes } from '@interfaces/routes_interfaces'

export const ROUTES: IRoutes[] = [
  {
    title: '',
    items: [
      {
        name: 'Dashboard',
        icon: 'tabler:dashboard',
        routes: { dashboard: 'dashboard' },
        togglable: false
      }
    ]
  },
  {
    title: 'Productivity',
    items: [
      {
        name: 'Projects (M)',
        icon: 'tabler:clipboard',
        provider: 'projects-m-provider',
        routes: {
          'projects-m': '',
          'projects-m-id': ':id'
        },
        togglable: true
      },
      {
        name: 'Projects (K)',
        icon: 'tabler:clipboard',
        routes: {
          'projects-k': 'projects-k',
          'projects-k-id': 'projects-k/:id'
        },
        togglable: true
      },
      {
        name: 'Idea Box',
        icon: 'tabler:bulb',
        routes: {
          'idea-box': 'idea-box',
          'idea-box-id': 'idea-box/:id',
          'idea-box-folder': 'idea-box/:id/:folderId'
        },
        togglable: true
      },
      {
        name: 'Todo List',
        icon: 'tabler:list-check',
        routes: { 'todo-list': 'todo-list' },
        togglable: true,
        hasAI: true
      },
      {
        name: 'Calendar',
        icon: 'tabler:calendar',
        routes: { calendar: 'calendar' },
        togglable: true
      },
      {
        name: 'Spotify',
        icon: 'tabler:brand-spotify',
        routes: { spotify: 'spotify' },
        togglable: true
      },
      {
        name: 'Code Time',
        icon: 'tabler:code',
        routes: { 'code-time': 'code-time' },
        togglable: true
      }
    ]
  },
  {
    title: 'Study',
    items: [
      {
        name: 'Pomodoro Timer',
        icon: 'tabler:clock-bolt',
        routes: { 'pomodoro-timer': 'pomodoro-timer' },
        togglable: true
      },
      {
        name: 'Flashcards',
        icon: 'tabler:cards',
        routes: { flashcards: 'flashcards', 'flashcards-id': 'flashcards/:id' },
        togglable: true
      },
      {
        name: 'Notes',
        icon: 'tabler:notebook',
        routes: {
          notes: 'notes',
          'notes-workspace': 'notes/:workspace',
          'notes-file': 'notes/:workspace/:subject/file/:id',
          'notes-subject': 'notes/:workspace/:subject/*'
        },
        togglable: true
      },
      {
        name: 'Books Library',
        icon: 'tabler:books',
        routes: { 'books-library': 'books-library' },
        togglable: true
      }
    ]
  },
  {
    title: 'Lifestyle',
    items: [
      {
        name: 'Journal',
        icon: 'tabler:book',
        hasAI: true,
        routes: {
          journal: 'journal'
        },
        togglable: true
      },
      {
        name: 'Achievements',
        icon: 'tabler:award',
        routes: {
          achievements: 'achievements',
          'achievements-id': 'achievements/:id'
        },
        togglable: true
      }
    ]
  },

  {
    title: 'Finance',
    items: [
      {
        name: 'Wallet',
        icon: 'tabler:currency-dollar',
        provider: 'wallet-provider',
        subsection: [
          ['Dashboard', 'tabler:dashboard', ''],
          ['Transactions', 'tabler:arrows-exchange', 'transactions'],
          ['Assets', 'tabler:wallet', 'assets'],
          ['Ledgers', 'tabler:book', 'ledgers']
        ],
        routes: {
          wallet: '',
          transactions: 'transactions',
          assets: 'assets',
          ledgers: 'ledgers'
        },
        togglable: true
      },
      {
        name: 'Budgets',
        icon: 'tabler:credit-card',
        routes: {},
        togglable: true
      },
      {
        name: 'Wish List',
        icon: 'tabler:heart',
        routes: {},
        togglable: true
      }
    ]
  },
  {
    title: 'Storage',
    items: [
      {
        name: 'Photos',
        icon: 'tabler:camera',
        provider: 'photos-provider',
        routes: {
          'photos-main-gallery': '',
          'photos-album-list': 'album',
          'photos-album-gallery': 'album/:id',
          'photos-album-favourites': 'favourites',
          'photos-locked-folder-gallery': 'locked-folder',
          'photos-trash': 'trash'
        },
        togglable: true
      },
      {
        name: 'Music',
        icon: 'tabler:music',
        routes: { music: 'music' },
        togglable: true
      },
      {
        name: 'Repositories',
        icon: 'tabler:git-branch',
        routes: { repositories: 'repositories' },
        togglable: true
      },
      {
        name: 'Guitar Tabs',
        icon: 'mingcute:guitar-line',
        routes: {
          'guitar-tabs': 'guitar-tabs'
        },
        togglable: true
      }
    ]
  },
  {
    title: 'External Management',
    items: [
      {
        name: 'Mail Inbox',
        icon: 'tabler:mail',
        routes: {
          'mail-inbox': 'mail-inbox'
        },
        togglable: true
      },
      {
        name: 'DNS Records',
        icon: 'tabler:cloud',
        routes: {
          'dns-records': 'dns-records'
        },
        togglable: true
      },
      {
        name: 'Blog Posts',
        icon: 'tabler:file-text',
        routes: {},
        togglable: true
      }
    ]
  },
  {
    title: 'Confidential',
    items: [
      {
        name: 'Contacts',
        icon: 'tabler:users',
        routes: {},
        togglable: true
      },
      {
        name: 'Passwords',
        icon: 'tabler:key',
        routes: { passwords: 'passwords' },
        togglable: true
      }
    ]
  },
  {
    title: 'Aviation',
    prefix: 'aviation',
    items: [
      {
        name: 'Airports',
        icon: 'ic:round-connecting-airports',
        routes: {
          airports: 'aviation/airports',
          'airports-countries': 'aviation/airports/:continentID',
          'airports-regions': 'aviation/airports/:continentID/:countryID',
          'airports-airports':
            'aviation/airports/:continentID/:countryID/:regionID',
          'airports-airport':
            'aviation/airports/:continentID/:countryID/:regionID/:airportID'
        },
        togglable: true,
        hasAI: true
      },
      {
        name: 'Changi Flight Status',
        icon: 'tabler:plane',
        routes: {
          'changi-flight-status': 'aviation/changi-flight-status'
        },
        togglable: true
      },
      {
        name: 'Changi Airline Information',
        icon: 'tabler:line',
        routes: {},
        togglable: true
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        name: 'Personalization',
        icon: 'tabler:palette',
        routes: { personalization: 'personalization' },
        togglable: false
      },
      {
        name: 'Modules',
        icon: 'tabler:plug',
        routes: { modules: 'modules' },
        togglable: false
      },
      {
        name: 'Data Backup',
        icon: 'tabler:database',
        routes: { 'data-backup': 'data-backup' },
        togglable: false
      },
      {
        name: 'Server Status',
        icon: 'tabler:server',
        routes: { 'server-status': 'server-status' },
        togglable: false
      }
    ]
  },
  {
    title: 'sso',
    items: [
      {
        name: 'Localization Manager',
        icon: 'mingcute:translate-line',
        routes: { 'localization-manager': 'localization-manager' },
        togglable: false
      }
    ]
  },
  {
    title: '',
    items: [
      {
        name: 'Change Log',
        icon: 'tabler:file-text',
        routes: { 'change-log': 'change-log' },
        togglable: false
      },
      {
        name: 'Documentation',
        icon: 'tabler:info-circle',
        routes: { documentation: 'documentation' },
        togglable: false
      },
      {
        name: 'Account Settings',
        icon: 'tabler:user-cog',
        routes: { account: 'account' },
        togglable: false,
        hidden: true
      }
    ]
  }
]
