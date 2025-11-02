# 模組一：奠定基石

:::tip 學習目標
**目標級分**：APCS 1-2 級分  
**預計學習時間**：4-6 週
:::

## 📖 模組介紹

此模組是整個課程體系中至關重要的一環，旨在建立**穩固的程式設計基礎**。任何進階的演算法或資料結構，都根植於對基礎語法與邏輯控制的精確掌握。

本模組的教學重點不僅在於「正確性」，更在於從第一行程式碼開始，就養成符合**競技程式設計要求的高效能習慣**。

## 🏗️ 為什麼地基如此重要？

如同建築的地基，任何在此處的瑕疵都將危及整棟建築的穩定性。一個堅實的基礎能夠：

- ✅ **確保程式的正確性**：避免常見的邏輯錯誤
- ✅ **提升程式的效率**：從一開始就使用最佳實踐
- ✅ **建立良好的習慣**：為後續學習打下基礎
- ✅ **應對考試壓力**：基本功紮實，考試時才能游刃有餘

:::warning 性能從第一天開始
本模組的一個核心理念是：**高效能不是進階主題，而是必須從零開始就掌握的基本功**。

在 APCS 中，即使演算法正確，如果使用了效率低下的 I/O 方法或資料結構，仍然可能因「執行超時」（TLE）而無法通過。因此，我們將高效能的習慣融入每一個單元。
:::

## 📚 單元內容

### [A1: 競技程式設計師的工具箱：Python 環境與高速 I/O](/zh/course/module-1/a1-io)

**核心概念**：
- 標準輸入（stdin）與標準輸出（stdout）
- `input()` vs `sys.stdin.readline()` 的效能差異
- 處理不同格式的輸入資料
- 高效的輸出方法

**為什麼這是第一課？**  
在競技程式設計中，I/O 可能成為效能瓶頸。使用緩慢的 I/O 會導致即使擁有最優演算法，也因「執行超時」而無法通過。因此，高速 I/O 不是進階主題，而是第一課。

**推薦習題**：i399 (數字遊戲)、o076 (特技表演)

---

### [A2: 邏輯的骨架：精通條件判斷與迴圈](/zh/course/module-1/a2-control-flow)

**核心概念**：
- 條件判斷（if/elif/else）
- 迴圈結構（for/while）
- 巢狀結構與流程控制
- break、continue、else 子句的應用

**為什麼這很重要？**  
程式設計的核心在於將現實世界的規則與流程，轉化為電腦可以執行的指令。選擇（Selection）與重複（Repetition）結構，是構建這些邏輯流程的基石。

**推薦習題**：g275 (七言對聯)、h026 (猜拳)

---

### [A3: 數據的容器：將 List 作為一維陣列](/zh/course/module-1/a3-list)

**核心概念**：
- List 的創建、存取與修改
- 常用操作：len()、sum()、min()、max()
- 遍歷與索引
- Python 核心資料結構效能分析

**為什麼要學這個？**  
處理單一數據點遠遠不夠，程式設計的威力體現在處理成批的、結構化的資料。List 是 Python 中最常用、最靈活的序列容器，也是理解後續所有資料結構的基礎。

**推薦習題**：h081 (程式交易)、g595 (修補圍籬)

---

## 🎯 學習建議

### 學習順序
1. **A1 → A2 → A3**：按照順序學習，不要跳過
2. 每個單元都包含：概念講解 → 範例程式 → Quiz → 推薦習題
3. 務必完成每個單元的推薦習題，才能進入下一個單元

### 時間分配
- **A1**：1-2 週（務必完全掌握高速 I/O）
- **A2**：1-2 週（練習各種流程控制的組合）
- **A3**：2 週（理解 List 的各種操作與效能特性）

### 學習重點

:::tip 重點提示
1. **A1 的高速 I/O**：這是整個課程最重要的基礎之一，務必完全掌握
2. **A2 的邏輯清晰**：確保能夠精確追蹤巢狀結構中的執行流程
3. **A3 的效能意識**：開始建立對時間複雜度的直覺
:::

## 📊 完成檢查表

在進入模組二之前，請確認你已經：

- [ ] 能夠熟練使用 `sys.stdin.readline()` 處理各種輸入格式
- [ ] 能夠正確撰寫巢狀迴圈與條件判斷
- [ ] 理解 List 的各種操作及其時間複雜度
- [ ] 完成所有推薦習題
- [ ] 能夠在 5 分鐘內寫出基本的輸入輸出模板

:::info 準備好了嗎？
如果以上檢查表都完成了，恭喜你！你已經打好了堅實的地基，可以進入[模組二：構築核心結構](/zh/course/module-2/)了。
:::

---

## 🚀 開始學習

<div class="action-buttons">

[開始 A1：Python 環境與高速 I/O](/zh/course/module-1/a1-io)

[查看完整課程地圖](/zh/course/)

</div>

<style>
.action-buttons {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.action-buttons a {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

.action-buttons a:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.action-buttons a:nth-child(2) {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

.action-buttons a:nth-child(2):hover {
  background-color: var(--vp-c-brand-soft);
}
</style>
