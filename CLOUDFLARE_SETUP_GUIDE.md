# 🚀 Cloudflare Pages 部署步驟（圖文教學）

## ✅ 已完成
- [x] GitHub 倉庫創建完成：https://github.com/JosephnJoy/apcsonline
- [x] 程式碼已推送到 GitHub

---

## 步驟一：登入 Cloudflare Dashboard

1. 前往：**https://dash.cloudflare.com/**
2. 使用您的 Cloudflare 帳號登入

---

## 步驟二：建立 Cloudflare Pages 專案

### 1. 進入 Pages 介面

- 在左側選單找到並點擊：**"Workers & Pages"**
- 或直接前往：https://dash.cloudflare.com/pages

### 2. 開始建立專案

點擊右上角的 **"Create application"** 按鈕

### 3. 選擇 Pages

- 確保選擇的是 **"Pages"** 標籤（不是 Workers）
- 點擊 **"Connect to Git"** 按鈕

### 4. 授權 GitHub

第一次使用會要求授權：
- 點擊 **"Connect GitHub"**
- 在彈出視窗中登入 GitHub 帳號 `JosephnJoy`
- 授權 Cloudflare Pages 訪問您的倉庫
- 可以選擇授權所有倉庫或只授權 `apcsonline`

### 5. 選擇倉庫

- 在倉庫列表中找到 **"JosephnJoy/apcsonline"**
- 點擊右側的 **"Begin setup"** 按鈕

---

## 步驟三：設定構建配置 ⚙️

### 關鍵設定（請仔細核對）：

| 設定項目 | 填入內容 | 說明 |
|---------|---------|------|
| **Project name** | `apcsonline` | 專案名稱（會影響預設域名） |
| **Production branch** | `main` | 生產環境使用的分支 |
| **Framework preset** | `None` | 選擇 None 或 VitePress |
| **Build command** | `npm run build` | 構建命令 ⭐ |
| **Build output directory** | `docs/.vitepress/dist` | 輸出目錄 ⭐ |
| **Root directory (optional)** | 留空 | 專案根目錄 |

### 重要提醒：

:::danger 注意
**Build output directory** 必須填寫：`docs/.vitepress/dist`  
這是最容易出錯的地方！
:::

### 環境變數（通常不需要）

如果構建時需要指定 Node.js 版本（通常會自動偵測）：
- 變數名稱：`NODE_VERSION`
- 值：`20`

---

## 步驟四：部署 🚀

### 1. 開始部署

- 檢查所有設定無誤後
- 點擊底部綠色按鈕：**"Save and Deploy"**

### 2. 等待構建

- 構建過程通常需要 **2-3 分鐘**
- 您會看到即時的構建日誌
- 構建步驟：
  1. Initialize build environment
  2. Install dependencies (`npm install`)
  3. Build application (`npm run build`)
  4. Deploy to Cloudflare network

### 3. 構建成功

看到以下訊息表示成功：
```
✅ Success! Deployed to https://apcsonline.pages.dev
```

### 4. 測試預設域名

- 點擊提供的連結：`https://apcsonline.pages.dev`
- 或訪問：`https://apcsonline-xxx.pages.dev`（xxx 是隨機生成的）
- 確認網站正常顯示

---

## 步驟五：設定自訂域名 apcsonline.org 🌐

### 前提條件

確認 `apcsonline.org` 域名的管理方式：

#### 情況 A：域名已在 Cloudflare（最簡單）✅

如果 apcsonline.org 已經在 Cloudflare 管理：

1. 在 Pages 專案頁面，點擊頂部的 **"Custom domains"** 標籤
2. 點擊 **"Set up a custom domain"** 按鈕
3. 輸入：`apcsonline.org`
4. 點擊 **"Continue"**
5. Cloudflare 會自動：
   - 添加 CNAME 記錄
   - 配置 SSL 憑證
   - 設定 CDN
6. 等待 2-5 分鐘完成配置
7. ✅ 完成！訪問 https://apcsonline.org

#### 情況 B：域名在其他註冊商

##### B1. 將域名加入 Cloudflare（推薦）

1. 在 Cloudflare Dashboard 首頁點擊 **"Add site"**
2. 輸入域名：`apcsonline.org`
3. 選擇 **Free** 方案
4. Cloudflare 會掃描現有的 DNS 記錄
5. 檢查並確認記錄
6. 點擊 **"Continue"**

7. **更新 Nameservers**：
   - Cloudflare 會提供兩個 Nameserver，例如：
     ```
     arya.ns.cloudflare.com
     tim.ns.cloudflare.com
     ```
   - 前往您的域名註冊商（GoDaddy/Namecheap/Google Domains 等）
   - 找到 DNS 設定或 Nameserver 設定
   - 將原有的 Nameservers 替換為 Cloudflare 提供的
   - 儲存變更

8. **等待 DNS 傳播**：
   - 通常需要 2-48 小時
   - 在 Cloudflare 完成驗證前會顯示 "Pending"
   - 使用工具檢查：https://dnschecker.org

9. 完成後，返回「情況 A」的步驟設定自訂域名

##### B2. 保持在原註冊商（手動設定 DNS）

1. 在 Pages 專案點擊 **"Custom domains"**
2. 點擊 **"Set up a custom domain"**
3. 輸入 `apcsonline.org`
4. Cloudflare 會顯示需要添加的 DNS 記錄

5. **前往您的域名註冊商**，添加以下記錄：

   **對於支援 CNAME 的根域名**：
   ```
   Type:   CNAME
   Name:   @ (或 apcsonline.org)
   Target: apcsonline.pages.dev
   TTL:    自動或 3600
   ```

   **對於不支援 CNAME 的根域名**（使用 A 記錄）：
   Cloudflare 會提供 IP 位址，添加：
   ```
   Type:   A
   Name:   @
   Target: [Cloudflare 提供的 IP]
   TTL:    自動或 3600
   ```

6. 等待 DNS 生效（通常 5-30 分鐘）
7. 返回 Cloudflare Pages 驗證

---

## 步驟六：設定 www 子域名（可選但推薦）

### 1. 添加 www 子域名

1. 在 **"Custom domains"** 點擊 **"Set up a custom domain"**
2. 輸入：`www.apcsonline.org`
3. Cloudflare 自動設定 DNS
4. SSL 憑證會自動配置

### 2. 設定重定向（推薦）

將 `www.apcsonline.org` 重定向到 `apcsonline.org`：

**方法 A：使用 Page Rules（免費方案有 3 個規則）**

1. 前往 Cloudflare Dashboard
2. 選擇 `apcsonline.org` 域名
3. 左側選單點擊 **"Rules"** → **"Page Rules"**
4. 點擊 **"Create Page Rule"**
5. 設定：
   ```
   URL: www.apcsonline.org/*
   
   選擇設定：Forwarding URL
   狀態碼：301 - Permanent Redirect
   目標 URL：https://apcsonline.org/$1
   ```
6. 點擊 **"Save and Deploy"**

**方法 B：使用 Bulk Redirects（更靈活）**

1. 左側選單點擊 **"Rules"** → **"Redirect Rules"**
2. 按照指示設定重定向

---

## 步驟七：驗證與測試 ✅

### 檢查清單

- [ ] **預設域名**：`https://apcsonline.pages.dev` 可正常訪問
- [ ] **自訂域名**：`https://apcsonline.org` 可正常訪問
- [ ] **SSL 憑證**：網址列顯示 🔒 鎖頭圖示
- [ ] **HTTPS 強制**：訪問 `http://` 會自動跳轉到 `https://`
- [ ] **首頁載入**：首頁內容正確顯示
- [ ] **中文頁面**：`/zh/` 可訪問
- [ ] **課程頁面**：`/zh/course/module-1/` 可訪問
- [ ] **導航功能**：選單和連結正常運作
- [ ] **搜尋功能**：站內搜尋正常
- [ ] **響應式設計**：手機上顯示正常

### 測試工具

1. **DNS 檢查**：https://dnschecker.org
   - 輸入 `apcsonline.org`
   - 確認全球 DNS 已傳播

2. **SSL 檢查**：https://www.ssllabs.com/ssltest/
   - 輸入 `https://apcsonline.org`
   - 確認 SSL 評級為 A 或 A+

3. **效能測試**：https://pagespeed.web.dev/
   - 測試載入速度和效能分數

---

## 步驟八：設定自動部署 🔄

好消息！**已自動設定完成** ✅

Cloudflare Pages 已經自動配置：
- ✅ 每次推送到 `main` 分支自動部署
- ✅ Pull Request 自動建立預覽環境
- ✅ 支援多個分支預覽

### 測試自動部署

1. 修改任意檔案：
   ```bash
   echo "更新測試" >> README.md
   ```

2. 提交並推送：
   ```bash
   git add .
   git commit -m "test: 測試自動部署"
   git push origin main
   ```

3. 前往 Cloudflare Dashboard：
   - **Workers & Pages** → **apcsonline** → **Deployments**
   - 查看構建進度
   - 等待完成（約 2 分鐘）

4. 刷新網站確認更新

---

## 步驟九：優化設定（可選）🔧

### 1. 啟用安全功能

在 Cloudflare Dashboard → `apcsonline.org` 域名：

**SSL/TLS 設定**：
- 進入 **"SSL/TLS"** → **"Overview"**
- 加密模式選擇：**"Full (strict)"**
- 啟用 **"Always Use HTTPS"**
- 最低 TLS 版本：**TLS 1.2**

**安全性設定**：
- **"Security"** → **"Settings"**
- 安全級別：**Medium** 或 **High**
- 挑戰通過期限：**4 小時**

### 2. 啟用效能優化

**自動壓縮**：
- **"Speed"** → **"Optimization"**
- 啟用 **"Auto Minify"**（HTML, CSS, JavaScript）
- 啟用 **"Brotli"** 壓縮

**快取設定**（已自動優化）：
- Cloudflare Pages 已自動配置最佳快取策略
- 靜態資源（CSS/JS/圖片）自動快取

### 3. 設定分析（可選）

**Cloudflare Web Analytics**（免費且注重隱私）：
1. **"Analytics & Logs"** → **"Web Analytics"**
2. 點擊 **"Add site"**
3. 輸入 `apcsonline.org`
4. 取得追蹤代碼（可選，Pages 已內建基本分析）

---

## 🎉 完成！

您的 APCS Online 網站現已成功部署：

### 🌐 網站連結

- **主站點**：https://apcsonline.org
- **預設域名**：https://apcsonline.pages.dev
- **GitHub**：https://github.com/JosephnJoy/apcsonline

### 📊 管理面板

- **Cloudflare Pages**：https://dash.cloudflare.com/pages/apcsonline
- **部署記錄**：查看所有部署歷史和狀態
- **分析數據**：流量、請求數、頻寬使用

### 🔄 日常維護

**更新內容**：
```bash
# 1. 編輯檔案
# 2. 提交變更
git add .
git commit -m "update: 更新課程內容"
git push origin main

# 3. Cloudflare 自動部署（2-3 分鐘）
```

**檢查部署**：
- 前往 Cloudflare Dashboard
- Workers & Pages → apcsonline → Deployments
- 查看最新部署狀態

---

## ❓ 常見問題排解

### Q1: 構建失敗 - "Build failed"

**檢查步驟**：
1. 查看構建日誌中的錯誤訊息
2. 確認 Build command: `npm run build`
3. 確認 Build output directory: `docs/.vitepress/dist`
4. 本地測試：`npm run build` 確認能成功構建

### Q2: 顯示 404 Not Found

**可能原因**：
- Build output directory 設定錯誤
- 應該是 `docs/.vitepress/dist` 而非 `dist` 或其他

**解決方法**：
1. 進入 Pages 專案設定
2. 修正 Build output directory
3. 重新部署

### Q3: 域名無法訪問

**檢查步驟**：
1. 確認 DNS 記錄已添加
2. 使用 https://dnschecker.org 檢查 DNS 傳播
3. 等待 DNS 完全生效（最多 48 小時）
4. 清除瀏覽器快取

### Q4: SSL 憑證錯誤

**解決方法**：
1. 確認域名已添加到 Custom domains
2. 等待 SSL 憑證配置完成（5-10 分鐘）
3. 如果超過 1 小時仍未完成，移除域名後重新添加

### Q5: 樣式或圖片載入失敗

**檢查步驟**：
1. 打開瀏覽器開發者工具（F12）
2. 查看 Console 和 Network 錯誤
3. 確認 `config.mts` 中的 `base: '/'` 設定正確
4. 清除瀏覽器快取並強制刷新（Cmd+Shift+R）

---

## 📚 相關資源

- [Cloudflare Pages 文件](https://developers.cloudflare.com/pages/)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [Cloudflare DNS 設定](https://developers.cloudflare.com/dns/)
- [GitHub Repository](https://github.com/JosephnJoy/apcsonline)

---

**祝您部署順利！如有問題，歡迎隨時詢問。** 🚀
