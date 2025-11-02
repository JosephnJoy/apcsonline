import { defineConfig } from 'vitepress'

// 共用的導航配置
const navZh = [
  { text: '首頁', link: '/zh/' },
  { text: '關於 APCS', link: '/zh/about-apcs' },
  {
    text: 'Python 學習課程',
    items: [
      { text: '課程導覽', link: '/zh/course/' },
      { text: '模組一：奠定基石 (1-2級分)', link: '/zh/course/module-1/' },
      { text: '模組二：構築核心結構 (3級分)', link: '/zh/course/module-2/' },
      { text: '模組三：安裝高速電梯 (4級分)', link: '/zh/course/module-3/' },
      { text: '模組四：封頂豪華頂層 (5級分)', link: '/zh/course/module-4/' }
    ]
  },
  { text: '實戰題庫', link: '/zh/problems/' },
  { text: '升學指南', link: '/zh/admissions' },
  { text: '最新消息', link: '/zh/news' }
]

const navEn = [
  { text: 'Home', link: '/en/' },
  { text: 'About APCS', link: '/en/about-apcs' },
  {
    text: 'Python Course',
    items: [
      { text: 'Course Overview', link: '/en/course/' },
      { text: 'Module 1: Foundation (Level 1-2)', link: '/en/course/module-1/' },
      { text: 'Module 2: Core Structure (Level 3)', link: '/en/course/module-2/' },
      { text: 'Module 3: High-Speed Elevator (Level 4)', link: '/en/course/module-3/' },
      { text: 'Module 4: Luxury Penthouse (Level 5)', link: '/en/course/module-4/' }
    ]
  },
  { text: 'Problem Set', link: '/en/problems/' },
  { text: 'Admissions Guide', link: '/en/admissions' },
  { text: 'News', link: '/en/news' }
]

const sidebarZh = {
  '/zh/course/': [
    {
      text: '課程導論',
      items: [
        { text: '課程介紹', link: '/zh/course/' }
      ]
    },
    {
      text: '模組一：奠定基石',
      collapsed: false,
      items: [
        { text: 'A1: 高速 I/O', link: '/zh/course/module-1/a1-io' },
        { text: 'A2: 控制流程', link: '/zh/course/module-1/a2-control-flow' },
        { text: 'A3: 一維陣列', link: '/zh/course/module-1/a3-list' }
      ]
    },
    {
      text: '模組二：構築核心結構',
      collapsed: true,
      items: [
        { text: 'B1: 字串', link: '/zh/course/module-2/b1-string' },
        { text: 'B2: 二維陣列', link: '/zh/course/module-2/b2-2d-array' },
        { text: 'B3: 函式', link: '/zh/course/module-2/b3-function' }
      ]
    },
    {
      text: '模組三：安裝高速電梯',
      collapsed: true,
      items: [
        { text: 'C1: 堆疊與佇列', link: '/zh/course/module-3/c1-stack-queue' },
        { text: 'C2: 遞迴與回溯', link: '/zh/course/module-3/c2-recursion' },
        { text: 'C3: 排序與搜尋', link: '/zh/course/module-3/c3-sorting' }
      ]
    },
    {
      text: '模組四：封頂豪華頂層',
      collapsed: true,
      items: [
        { text: 'D1: 圖論', link: '/zh/course/module-4/d1-graph' },
        { text: 'D2: 動態規劃', link: '/zh/course/module-4/d2-dp' },
        { text: 'D3: 進階演算法', link: '/zh/course/module-4/d3-advanced' }
      ]
    }
  ]
}

const sidebarEn = {
  '/en/course/': [
    {
      text: 'Course Introduction',
      items: [
        { text: 'Overview', link: '/en/course/' }
      ]
    }
  ]
}

export default defineConfig({
  title: 'APCS Online',
  description: 'APCS 程式設計檢定準備網站',
  lang: 'zh-TW',
  
  themeConfig: {
    siteTitle: 'APCS Online',
    
    search: {
      provider: 'local'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/apcsonline/apcsonline' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 APCS Online'
    },
    
    locales: {
      root: {
        label: '繁體中文',
        lang: 'zh-TW'
      },
      '/zh/': {
        label: '繁體中文',
        lang: 'zh-TW',
        nav: navZh,
        sidebar: sidebarZh
      },
      '/en/': {
        label: 'English',
        lang: 'en-US',
        nav: navEn,
        sidebar: sidebarEn
      }
    }
  },
  
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  
  // 忽略死連結檢查（因為部分頁面尚未建立）
  ignoreDeadLinks: true,
  
  outDir: '../dist',
  base: '/'
})
