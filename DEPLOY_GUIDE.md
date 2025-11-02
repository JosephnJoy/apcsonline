# 🚀 快速部署到 Cloudflare Pages

## 一、推送到 GitHub

```bash
# 1. 初始化 Git（如果還沒有）
git init

# 2. 添加所有檔案
git add .

# 3. 提交
git commit -m "feat: 完成 APCS Online 網站 - 包含完整課程內容"

# 4. 連接到 GitHub（替換為您的 GitHub 使用者名稱）
git remote add origin https://github.com/[YOUR-USERNAME]/apcsonline.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 二、在 Cloudflare Pages 建立專案

### 1️⃣ 登入 Cloudflare
前往：https://dash.cloudflare.com/

### 2️⃣ 建立 Pages 專案
1. 左側選單點擊 **"Workers & Pages"**
2. 點擊 **"Create application"** 按鈕
3. 選擇 **"Pages"** 標籤
4. 點擊 **"Connect to Git"**

### 3️⃣ 連接 GitHub
1. 授權 Cloudflare 訪問 GitHub
2. 選擇 `apcsonline` 倉庫
3. 點擊 **"Begin setup"**

### 4️⃣ 設定構建配置

**重要！請確認以下設定：**

```
Project name:           apcsonline
Production branch:      main
Framework preset:       VitePress (或選擇 None)
Build command:          npm run build
Build output directory: docs/.vitepress/dist
Root directory:         (留空)
```

### 5️⃣ 部署
點擊 **"Save and Deploy"** 開始首次部署

⏱️ 等待 2-3 分鐘讓構建完成

---

## 三、設定自訂域名 apcsonline.org

### 方案 A：域名已在 Cloudflare（最簡單）✅

1. 部署完成後，在專案中點擊 **"Custom domains"**
2. 點擊 **"Set up a custom domain"**
3. 輸入 `apcsonline.org`
4. Cloudflare 自動添加 DNS 記錄
5. 等待 SSL 憑證配置（約 5 分鐘）
6. ✅ 完成！訪問 https://apcsonline.org

### 方案 B：域名在其他註冊商

#### 步驟 1：將域名加入 Cloudflare
1. Cloudflare Dashboard 點擊 **"Add site"**
2. 輸入 `apcsonline.org`
3. 選擇 Free 方案
4. Cloudflare 掃描現有 DNS 記錄

#### 步驟 2：更新 Nameservers
前往您的域名註冊商（如 GoDaddy、Namecheap），將 Nameservers 更新為：

```
示例（Cloudflare 會提供實際的 NS）：
arya.ns.cloudflare.com
tim.ns.cloudflare.com
```

#### 步驟 3：等待 DNS 傳播
- 通常需要 24-48 小時
- 使用 https://dnschecker.org 檢查進度

#### 步驟 4：添加自訂域名
完成後，按照「方案 A」的步驟設定

---

## 四、驗證部署

### ✅ 檢查清單

訪問以下 URL 確認正常：

- [ ] https://apcsonline.pages.dev（Cloudflare 預設域名）
- [ ] https://apcsonline.org（您的自訂域名）
- [ ] https://apcsonline.org/zh/（中文首頁）
- [ ] https://apcsonline.org/zh/course/module-1/（課程頁面）

### 🔒 SSL 檢查

確認網址列顯示 🔒 鎖頭圖示，表示 SSL 正常運作

### 📱 響應式測試

在手機上訪問網站，確認顯示正常

---

## 五、設定 www 子域名（推薦）

1. 在 Custom domains 添加 `www.apcsonline.org`
2. Cloudflare 自動設定 DNS
3. 建議設定重定向：`www.apcsonline.org` → `apcsonline.org`

---

## 🎯 快速命令參考

### 本地測試
```bash
npm run dev          # 開發伺服器
npm run build        # 構建網站
npm run preview      # 預覽構建結果
```

### 推送更新
```bash
git add .
git commit -m "update: 新增課程內容"
git push origin main
# Cloudflare 自動部署！
```

### 檢查 DNS
```bash
# macOS/Linux
nslookup apcsonline.org

# 或使用 dig
dig apcsonline.org
```

---

## ❗ 常見問題

### Q1: 構建失敗怎麼辦？
**A:** 查看 Cloudflare Dashboard 中的構建日誌，通常是路徑設定錯誤。確認 Build output directory 為 `docs/.vitepress/dist`

### Q2: 為什麼顯示 404？
**A:** 檢查 `docs/.vitepress/config.mts` 中的 `base` 設定，應該是 `base: '/'`

### Q3: DNS 多久生效？
**A:** Cloudflare DNS 通常 2-5 分鐘，外部 NS 更新需 24-48 小時

### Q4: 如何查看部署狀態？
**A:** Cloudflare Dashboard > Workers & Pages > apcsonline > Deployments

---

## 📊 部署資訊

| 項目 | 資訊 |
|------|------|
| **平台** | Cloudflare Pages |
| **框架** | VitePress 1.6.4 |
| **Node.js** | 20.x |
| **構建時間** | ~2-3 分鐘 |
| **全球 CDN** | ✅ 自動啟用 |
| **SSL/TLS** | ✅ 自動配置 |
| **自動部署** | ✅ 推送到 main 分支 |

---

## 🎉 完成！

您的 APCS Online 網站現已部署到：

🌐 **主網站**: https://apcsonline.org  
🌐 **Cloudflare**: https://apcsonline.pages.dev  

### 下一步

1. ✅ 測試所有頁面功能
2. 📱 在不同裝置上測試
3. 📢 分享給學生使用
4. 📝 持續更新課程內容

**需要幫助？** 參考 `CLOUDFLARE_DEPLOYMENT.md` 詳細文件。
