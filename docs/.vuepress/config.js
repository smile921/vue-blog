const utils = require('./utils')

module.exports = {
  title: '一个小白工程师的个人成长笔记',
  description:
    'If you think that the life of a developer is a bed of roses you’d better read on.',
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    serviceWorker: {
      updatePopup: true // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是:
      // updatePopup: {
      //    message: "New content is available.",
      //    buttonText: "Refresh"
      // }
    },
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'Java',
        link: '/java/'
      },
      {
        text: '笔记',
        link: '/docs/'
      },
      // { text: '工具', link: 'https://google.com' },
      {
        text: '前端',
        link: '/front/'
      },
      {
        text: '后端',
        link: '/backend/'
      },
      {
        text: '其它',
        link: '/other/'
      }
    ],
    sidebar: utils.inferSiderbars(),
    lastUpdated: '上次更新',
    repo: 'smile921/vue-blog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 3
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  },
  ga: 'UA-109340118-1',
  serviceWorker: true,
  markdown: {
    lineNumbers: true,
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-include'))
    }
  }
}
