---
layout: doc
---

# 安裝與執行指南

本文件說明如何在本地端安裝與執行 APCS Online 網站。

## 系統需求

- Node.js 18.0 或更高版本
- npm 或 yarn 套件管理器
- Git

## 安裝步驟

### 1. 克隆儲存庫

```bash
git clone https://github.com/apcsonline/apcsonline.git
cd apcsonline
```

### 2. 安裝依賴

使用 npm：
```bash
npm install
```

或使用 yarn：
```bash
yarn install
```

### 3. 啟動開發服務器

```bash
npm run dev
```

網站將在 `http://localhost:5173` 啟動。

## 開發指令

### 開發模式
啟動本地開發服務器，支援熱重載：
```bash
npm run dev
```

### 建置生產版本
生成靜態網站檔案：
```bash
npm run build
```

建置完成後，靜態檔案將輸出到 `docs/.vitepress/dist` 目錄。

### 預覽生產版本
在本地預覽建置後的網站：
```bash
npm run preview
```

## 專案結構

```
apcsonline/
├── docs/                      # 文檔目錄
│   ├── .vitepress/           # VitePress 配置
│   │   ├── config.mts        # 主要配置檔案
│   │   └── theme/            # 主題自訂
│   ├── zh/                   # 繁體中文內容
│   │   ├── index.md          # 首頁
│   │   ├── about-apcs.md     # 關於 APCS
│   │   ├── course/           # 課程內容
│   │   ├── problems/         # 題庫
│   │   ├── admissions.md     # 升學指南
│   │   └── news.md           # 最新消息
│   └── en/                   # 英文內容（待完成）
├── .github/                  # GitHub 配置
│   └── workflows/            # GitHub Actions
├── package.json              # 專案依賴
└── README.md                # 專案說明
```

## 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 內容撰寫規範

- 使用 Markdown 格式
- 程式碼區塊需標註語言（如 \`\`\`python）
- 確保內容準確性與教學品質
- 提供清晰的範例與解說

## 部署

### GitHub Pages
專案已配置 GitHub Actions，推送到 `main` 分支後會自動部署到 GitHub Pages。

### Cloudflare Pages
1. 連結 GitHub 儲存庫到 Cloudflare Pages
2. 設定建置指令：`npm run build`
3. 設定輸出目錄：`docs/.vitepress/dist`

詳細說明請參考 [CLOUDFLARE_DEPLOYMENT.md](../CLOUDFLARE_DEPLOYMENT.md)

## 疑難排解

### 開發服務器無法啟動
- 確認 Node.js 版本是否符合要求
- 刪除 `node_modules` 並重新安裝依賴
- 檢查端口 5173 是否被佔用

### 建置失敗
- 檢查是否有語法錯誤
- 確認所有連結是否正確
- 查看建置日誌以獲取詳細錯誤訊息

## 授權

本專案採用 MIT License - 詳見 [LICENSE](../LICENSE) 檔案

## 聯絡方式

- 網站：[apcsonline.org](https://apcsonline.org)
- GitHub：[apcsonline/apcsonline](https://github.com/apcsonline/apcsonline)
- Email：contact@apcsonline.org
