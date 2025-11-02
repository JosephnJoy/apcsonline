# APCS Online - Cloudflare Pages 部署指南

本專案支援自動部署到 Cloudflare Pages。

## 設定步驟

1. **連結 GitHub 儲存庫**
   - 登入 Cloudflare Dashboard
   - 進入 Pages 頁面
   - 選擇「建立專案」
   - 選擇你的 GitHub 儲存庫

2. **建置設定**
   - **建置指令**: `npm run build`
   - **建置輸出目錄**: `docs/.vitepress/dist`
   - **根目錄**: `/`（預設）
   - **環境變數**: Node.js 版本 20

3. **自動部署**
   - 每次推送到 `main` 分支時，Cloudflare Pages 會自動部署
   - 部署狀態可在 Cloudflare Dashboard 查看

## 自訂網域設定

如果要使用 apcsonline.org 網域：

1. 在 Cloudflare Pages 專案設定中選擇「自訂網域」
2. 添加 `apcsonline.org` 和 `www.apcsonline.org`
3. Cloudflare 會自動配置 DNS 記錄

## 預覽部署

每個 Pull Request 都會自動建立預覽部署，方便在合併前檢查變更。
