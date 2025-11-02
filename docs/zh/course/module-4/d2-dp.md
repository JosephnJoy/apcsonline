# D2: 動態規劃 (Dynamic Programming)

## 學習目標
- 理解動態規劃的核心思想和原理
- 掌握動態規劃的兩種實作方式：記憶化搜尋和遞推
- 學習經典動態規劃問題的解法
- 學會狀態定義和狀態轉移方程的設計

## 動態規劃基礎

### 什麼是動態規劃？
動態規劃 (Dynamic Programming, DP) 是一種通過把原問題分解為相對簡單的子問題來求解複雜問題的方法。

### 適用條件
動態規劃適用於具有以下兩個性質的問題：

1. **最優子結構**: 問題的最優解包含子問題的最優解
2. **重疊子問題**: 子問題會被重複計算多次

### DP vs 遞迴 vs 貪心

| 特性 | 遞迴 | 動態規劃 | 貪心 |
|------|------|---------|------|
| 子問題重複 | 重複計算 | 儲存結果 | 不回頭 |
| 時間複雜度 | 通常指數級 | 多項式級 | 通常線性 |
| 空間複雜度 | 堆疊空間 | 額外儲存空間 | 通常 O(1) |
| 保證最優解 | ✅ | ✅ | ❌ 不一定 |

### DP 的兩種實作方式

#### 1. 記憶化搜尋 (Top-Down)
從原問題開始，遞迴地求解子問題，並用字典儲存已計算的結果。

```python
def fib_memo(n, memo=None):
    """
    費波那契數列 - 記憶化搜尋
    時間複雜度: O(n)
    空間複雜度: O(n)
    """
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# 測試
print([fib_memo(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

#### 2. 遞推 (Bottom-Up)
從最小的子問題開始，逐步建立更大的子問題的解。

```python
def fib_dp(n):
    """
    費波那契數列 - 遞推
    時間複雜度: O(n)
    空間複雜度: O(n)
    """
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# 空間優化版本
def fib_dp_optimized(n):
    """
    空間優化到 O(1)
    """
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# 測試
print(fib_dp(10))           # 55
print(fib_dp_optimized(10)) # 55
```

## 一維動態規劃

### 問題 1: 爬樓梯

```python
def climb_stairs(n):
    """
    爬樓梯：每次可以爬 1 階或 2 階，有多少種方法爬到第 n 階？
    
    狀態定義: dp[i] = 爬到第 i 階的方法數
    狀態轉移: dp[i] = dp[i-1] + dp[i-2]
    初始狀態: dp[0] = 1, dp[1] = 1
    
    時間複雜度: O(n)
    空間複雜度: O(n) 或 O(1) 優化後
    """
    if n <= 1:
        return 1
    
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# 測試
print(climb_stairs(5))  # 8
# 方法: 1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1
```

### 問題 2: 打家劫舍

```python
def rob(nums):
    """
    打家劫舍：小偷不能偷相鄰的房子，求最大金額
    
    狀態定義: dp[i] = 偷到第 i 間房子時的最大金額
    狀態轉移: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
                     不偷第i間    偷第i間
    
    時間複雜度: O(n)
    空間複雜度: O(1)
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = 0, 0
    
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr
    
    return prev1

# 測試
print(rob([1, 2, 3, 1]))      # 4 (1 + 3)
print(rob([2, 7, 9, 3, 1]))   # 12 (2 + 9 + 1)
```

### 問題 3: 最大子陣列和 (Kadane's Algorithm)

```python
def max_subarray(nums):
    """
    最大子陣列和
    
    狀態定義: dp[i] = 以 nums[i] 結尾的最大子陣列和
    狀態轉移: dp[i] = max(nums[i], dp[i-1] + nums[i])
    
    時間複雜度: O(n)
    空間複雜度: O(1)
    """
    if not nums:
        return 0
    
    max_sum = current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum

# 測試
print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6 ([4,-1,2,1])
```

## 背包問題

### 0/1 背包問題

```python
def knapsack_01(weights, values, capacity):
    """
    0/1 背包：每個物品只能選或不選
    
    狀態定義: dp[i][w] = 前 i 個物品，背包容量為 w 時的最大價值
    狀態轉移: dp[i][w] = max(dp[i-1][w],              不選第 i 個
                            dp[i-1][w-weights[i]] + values[i])  選第 i 個
    
    時間複雜度: O(n × capacity)
    空間複雜度: O(n × capacity)
    """
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # 不選第 i 個物品
            dp[i][w] = dp[i - 1][w]
            
            # 如果可以選第 i 個物品
            if w >= weights[i - 1]:
                dp[i][w] = max(dp[i][w], 
                              dp[i - 1][w - weights[i - 1]] + values[i - 1])
    
    return dp[n][capacity]

# 空間優化版本（一維陣列）
def knapsack_01_optimized(weights, values, capacity):
    """
    空間優化到 O(capacity)
    注意：內層迴圈要反向遍歷！
    """
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # 反向遍歷，避免重複使用同一個物品
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

# 測試
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 8
print(knapsack_01(weights, values, capacity))           # 10
print(knapsack_01_optimized(weights, values, capacity)) # 10
```

### 完全背包問題

```python
def knapsack_complete(weights, values, capacity):
    """
    完全背包：每個物品可以選無限次
    
    時間複雜度: O(n × capacity)
    空間複雜度: O(capacity)
    """
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # 正向遍歷，允許重複使用同一個物品
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

# 測試
print(knapsack_complete(weights, values, capacity))  # 12 (選兩次物品3)
```

## 序列型 DP

### 問題 1: 最長遞增子序列 (LIS)

```python
def length_of_lis(nums):
    """
    最長遞增子序列
    
    狀態定義: dp[i] = 以 nums[i] 結尾的最長遞增子序列長度
    狀態轉移: dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
    
    時間複雜度: O(n²)
    空間複雜度: O(n)
    """
    if not nums:
        return 0
    
    n = len(nums)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

# 測試
print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4 ([2,3,7,101])

# 優化版本：使用二分搜尋 O(n log n)
def length_of_lis_optimized(nums):
    """
    使用二分搜尋優化
    時間複雜度: O(n log n)
    """
    import bisect
    
    tails = []  # tails[i] = 長度為 i+1 的遞增子序列的最小尾部元素
    
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)

print(length_of_lis_optimized([10, 9, 2, 5, 3, 7, 101, 18]))  # 4
```

### 問題 2: 最長公共子序列 (LCS)

```python
def longest_common_subsequence(text1, text2):
    """
    最長公共子序列
    
    狀態定義: dp[i][j] = text1[0:i] 和 text2[0:j] 的 LCS 長度
    狀態轉移: 
        if text1[i-1] == text2[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    時間複雜度: O(m × n)
    空間複雜度: O(m × n)
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]

# 測試
print(longest_common_subsequence("abcde", "ace"))  # 3 ("ace")
print(longest_common_subsequence("abc", "abc"))    # 3
print(longest_common_subsequence("abc", "def"))    # 0
```

### 問題 3: 編輯距離

```python
def min_distance(word1, word2):
    """
    編輯距離（Levenshtein Distance）
    可以進行插入、刪除、替換三種操作
    
    狀態定義: dp[i][j] = word1[0:i] 轉換為 word2[0:j] 的最少操作數
    狀態轉移:
        if word1[i-1] == word2[j-1]:
            dp[i][j] = dp[i-1][j-1]
        else:
            dp[i][j] = 1 + min(dp[i-1][j],    # 刪除
                              dp[i][j-1],      # 插入
                              dp[i-1][j-1])    # 替換
    
    時間複雜度: O(m × n)
    空間複雜度: O(m × n)
    """
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # 初始化：空字串轉換需要的操作數
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],     # 刪除 word1[i-1]
                    dp[i][j - 1],     # 插入 word2[j-1]
                    dp[i - 1][j - 1]  # 替換 word1[i-1] 為 word2[j-1]
                )
    
    return dp[m][n]

# 測試
print(min_distance("horse", "ros"))  # 3
# horse -> rorse (替換 h 為 r)
# rorse -> rose (刪除 r)
# rose -> ros (刪除 e)
```

## 區間型 DP

### 問題：最長迴文子序列

```python
def longest_palindrome_subseq(s):
    """
    最長迴文子序列
    
    狀態定義: dp[i][j] = s[i:j+1] 的最長迴文子序列長度
    狀態轉移:
        if s[i] == s[j]:
            dp[i][j] = dp[i+1][j-1] + 2
        else:
            dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    
    時間複雜度: O(n²)
    空間複雜度: O(n²)
    """
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    
    # 長度為 1 的子序列都是迴文
    for i in range(n):
        dp[i][i] = 1
    
    # 從短到長枚舉子序列長度
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
    
    return dp[0][n - 1]

# 測試
print(longest_palindrome_subseq("bbbab"))   # 4 ("bbbb")
print(longest_palindrome_subseq("cbbd"))    # 2 ("bb")
```

## 狀態機型 DP

### 問題：買賣股票的最佳時機（含冷凍期）

```python
def max_profit_with_cooldown(prices):
    """
    買賣股票（可多次交易，但賣出後有一天冷凍期）
    
    狀態定義:
        hold[i] = 第 i 天持有股票的最大利潤
        sold[i] = 第 i 天不持有股票（剛賣出）的最大利潤
        rest[i] = 第 i 天不持有股票（冷凍期或休息）的最大利潤
    
    狀態轉移:
        hold[i] = max(hold[i-1], rest[i-1] - prices[i])
        sold[i] = hold[i-1] + prices[i]
        rest[i] = max(rest[i-1], sold[i-1])
    
    時間複雜度: O(n)
    空間複雜度: O(1)
    """
    if not prices:
        return 0
    
    hold = -prices[0]  # 持有股票
    sold = 0           # 剛賣出
    rest = 0           # 冷凍期或休息
    
    for i in range(1, len(prices)):
        prev_hold = hold
        prev_sold = sold
        prev_rest = rest
        
        hold = max(prev_hold, prev_rest - prices[i])
        sold = prev_hold + prices[i]
        rest = max(prev_rest, prev_sold)
    
    return max(sold, rest)

# 測試
print(max_profit_with_cooldown([1, 2, 3, 0, 2]))  # 3
# 交易: 買入(1) -> 賣出(2) -> 冷凍 -> 買入(0) -> 賣出(2)
```

## DP 解題技巧

### 1. 狀態定義
- 明確定義 `dp[i]` 或 `dp[i][j]` 的含義
- 狀態要能表示問題的所有子問題

### 2. 狀態轉移
- 找出當前狀態與之前狀態的關係
- 通常通過列舉最後一步的所有可能性

### 3. 初始狀態和邊界
- 設定 `dp[0]` 或基礎情況的值
- 注意陣列越界問題

### 4. 遍歷順序
- 確保計算 `dp[i]` 時，依賴的狀態已經計算
- 一維 DP: 從小到大
- 二維 DP: 通常雙層迴圈
- 區間 DP: 從短到長

### 5. 空間優化
- 如果只依賴前幾個狀態，可以用滾動陣列
- 二維 DP 有時可以優化到一維

## 練習題目

### 基礎題
1. **爬樓梯** - 經典 DP 入門
2. **最小路徑和** - 二維網格 DP
3. **打家劫舍** - 一維 DP

### 進階題
4. **零錢兌換** - 完全背包變形
5. **最長遞增子序列** - 序列型 DP
6. **分割等和子集** - 0/1 背包變形

### 困難題
7. **正則表達式匹配** - 字串匹配 DP
8. **戳氣球** - 區間 DP
9. **最大矩形** - 單調堆疊 + DP

### ZeroJudge 相關題目
- [a271. 費波那契數列](https://zerojudge.tw/ShowProblem?problemid=a271)
- [d133. 最長共同子序列](https://zerojudge.tw/ShowProblem?problemid=d133)

## 測驗時間 🎯

### 題目 1
動態規劃和記憶化遞迴有什麼區別？

::: details 點擊查看答案
**答案**:

| 特性 | 記憶化遞迴 (Top-Down) | 動態規劃 (Bottom-Up) |
|------|---------------------|---------------------|
| 方向 | 從原問題到子問題 | 從子問題到原問題 |
| 實作方式 | 遞迴 + 字典快取 | 迴圈 + 陣列 |
| 計算順序 | 按需計算 | 計算所有子問題 |
| 空間 | 遞迴堆疊 + 快取 | 通常可優化 |
| 優點 | 程式碼直觀，只計算需要的 | 無遞迴開銷，易優化 |

**選擇建議**:
- 初學者：記憶化遞迴更直觀
- 競賽/面試：DP 遞推更常用
- 複雜問題：記憶化遞迴更好寫
- 需要優化空間：用遞推
:::

### 題目 2
0/1 背包和完全背包的空間優化版本有什麼區別？

::: details 點擊查看答案
**答案**: 內層迴圈的遍歷方向不同！

```python
# 0/1 背包：反向遍歷（避免重複使用）
for i in range(n):
    for w in range(capacity, weights[i] - 1, -1):
        dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

# 完全背包：正向遍歷（允許重複使用）
for i in range(n):
    for w in range(weights[i], capacity + 1):
        dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
```

**原因**:
- 0/1 背包：每個物品只能用一次，反向遍歷確保 `dp[w]` 計算時使用的是「上一輪」的 `dp[w - weights[i]]`
- 完全背包：每個物品可以用多次，正向遍歷允許 `dp[w]` 使用「本輪」更新過的 `dp[w - weights[i]]`
:::

### 題目 3
最長遞增子序列 (LIS) 的 O(n²) 和 O(n log n) 解法有什麼區別？

::: details 點擊查看答案
**答案**:

**O(n²) 解法 - 經典 DP**:
```python
# dp[i] = 以 nums[i] 結尾的 LIS 長度
for i in range(n):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)
```
- 對每個位置，檢查所有前面的元素
- 容易理解，可以輕鬆構造 LIS

**O(n log n) 解法 - 二分搜尋優化**:
```python
# tails[i] = 長度為 i+1 的 LIS 的最小尾部元素
for num in nums:
    pos = bisect.bisect_left(tails, num)
    if pos == len(tails):
        tails.append(num)
    else:
        tails[pos] = num
```
- 維護一個 tails 陣列，保持遞增
- 使用二分搜尋找插入位置
- 更快但不容易構造實際的 LIS

**選擇**:
- APCS 題目通常 n ≤ 10^5，O(n log n) 更安全
- 如果需要輸出 LIS 本身，用 O(n²) 更方便
:::

### 題目 4
如何判斷一個問題適合用動態規劃解決？

::: details 點擊查看答案
**答案**: 檢查以下特徵：

**1. 最優化問題**:
- 求最大值、最小值、最多、最少等
- 關鍵字：「最」、「最大」、「最小」、「最多」、「最少」

**2. 具有最優子結構**:
- 大問題的最優解包含子問題的最優解
- 例如：最短路徑、最大利潤

**3. 重疊子問題**:
- 子問題會被重複計算
- 簡單遞迴會超時（指數級複雜度）

**4. 無後效性**:
- 未來的決策不會影響過去的狀態
- 狀態只由當前和之前的狀態決定

**常見 DP 問題類型**:
- 路徑計數/最優路徑
- 背包問題
- 序列問題（LIS、LCS）
- 區間問題
- 狀態機問題（買賣股票）

**不適合 DP**:
- 需要貪心的問題（局部最優）
- 圖的最短路徑（加權）-> 用 Dijkstra
- 組合問題（需要所有解）-> 用回溯
:::

### 題目 5
實作一個函數，判斷是否可以將陣列分割成兩個和相等的子集。

::: details 點擊查看答案
```python
def can_partition(nums):
    """
    分割等和子集 - 0/1 背包變形
    
    思路: 如果可以分割，每個子集的和 = total_sum / 2
    問題轉化為：是否存在子集和為 target = total_sum / 2
    
    狀態定義: dp[i] = 是否可以湊出和為 i
    狀態轉移: dp[i] = dp[i] or dp[i - num]
    
    時間複雜度: O(n × target)
    空間複雜度: O(target)
    """
    total_sum = sum(nums)
    
    # 總和為奇數，無法分割
    if total_sum % 2 != 0:
        return False
    
    target = total_sum // 2
    dp = [False] * (target + 1)
    dp[0] = True  # 和為 0 一定可以（不選任何元素）
    
    for num in nums:
        # 反向遍歷（0/1 背包）
        for i in range(target, num - 1, -1):
            dp[i] = dp[i] or dp[i - num]
    
    return dp[target]

# 測試
print(can_partition([1, 5, 11, 5]))  # True (11 = 1+5+5)
print(can_partition([1, 2, 3, 5]))   # False
```

**解析**: 這是 0/1 背包的變形，判斷是否存在子集和為目標值。
:::

## 重點整理

1. **DP 兩要素**
   - 最優子結構
   - 重疊子問題

2. **實作方式**
   - 記憶化遞迴 (Top-Down): 遞迴 + 快取
   - 遞推 (Bottom-Up): 迴圈 + 陣列

3. **解題步驟**
   - 定義狀態
   - 寫出狀態轉移方程
   - 確定初始狀態和邊界
   - 確定遍歷順序
   - 優化空間（如果可能）

4. **常見 DP 類型**
   - 線性 DP: 爬樓梯、打家劫舍
   - 背包 DP: 0/1 背包、完全背包
   - 序列 DP: LIS、LCS、編輯距離
   - 區間 DP: 最長迴文子序列
   - 狀態機 DP: 買賣股票

5. **優化技巧**
   - 滾動陣列降維
   - 0/1 背包反向遍歷
   - 完全背包正向遍歷
   - 使用更高效的資料結構（如二分搜尋）

---

[← 回到 Module 4 目錄](./index.md)
