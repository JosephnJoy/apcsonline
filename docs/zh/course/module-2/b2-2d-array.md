# B2: 二維陣列與矩陣運算 - 2D Arrays & Matrix Operations

:::tip 學習目標
- 理解二維陣列（2D Array）的本質
- 掌握二維陣列的初始化與存取
- 學會前綴和（Prefix Sum）實現 O(1) 區間查詢
- 學會差分陣列（Difference Array）實現 O(1) 區間修改
- 熟練矩陣的常見操作
:::

## 📖 單元概覽

在模組一的 A3 單元中，我們學習了**一維陣列（List）**，用來儲存線性的資料。但在真實世界中，很多資料是**二維**的：
- 棋盤（8×8）
- 圖片（像素矩陣）
- 座位表
- 地圖（網格）

本單元將學習如何高效地處理二維資料，特別是 APCS 中常見的**區間查詢與修改**問題。

## 🎯 二維陣列的本質

### 什麼是二維陣列？

簡單來說，二維陣列就是「**陣列的陣列**」：

```python
# 3×4 的矩陣
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

# matrix 是一個 list
# matrix[0] 是第一行（也是一個 list）
# matrix[0][0] 是第一行第一列的元素
```

**視覺化**：
```
     col 0  col 1  col 2  col 3
row 0:  1      2      3      4
row 1:  5      6      7      8
row 2:  9     10     11     12
```

---

## 🔧 二維陣列的建立

### 方法一：逐行建立（推薦）

```python
# 建立 3×4 的矩陣，全部填 0
rows, cols = 3, 4
matrix = []
for i in range(rows):
    row = [0] * cols
    matrix.append(row)

# 或使用列表推導式
matrix = [[0] * cols for i in range(rows)]
```

### 方法二：一次性建立

```python
# 建立 3×4 的矩陣，指定初始值
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
```

### ❌ 常見錯誤：淺複製陷阱

```python
# ❌ 錯誤做法
matrix = [[0] * 4] * 3

# 看起來沒問題
print(matrix)  # [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

# 但修改一個元素...
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]]
# 😱 所有行都被修改了！
```

**為什麼？**

因為 `[[0] * 4] * 3` 創建了 3 個**指向同一個 list 的參考**！

:::danger 淺複製陷阱
絕對不要使用 `[[value] * cols] * rows`！  
必須使用列表推導式：`[[value] * cols for _ in range(rows)]`
:::

---

## 📊 二維陣列的存取與遍歷

### 基本存取

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 存取元素
print(matrix[0][0])  # 1 (第一行第一列)
print(matrix[1][2])  # 6 (第二行第三列)
print(matrix[2][1])  # 8 (第三行第二列)

# 修改元素
matrix[1][1] = 99
```

### 遍歷方式

```python
rows, cols = 3, 4
matrix = [[i * cols + j for j in range(cols)] for i in range(rows)]

# 方法一：使用索引（推薦）
for i in range(rows):
    for j in range(cols):
        print(matrix[i][j], end=' ')
    print()

# 方法二：直接遍歷（當不需要索引時）
for row in matrix:
    for val in row:
        print(val, end=' ')
    print()

# 方法三：enumerate（需要索引和值）
for i, row in enumerate(matrix):
    for j, val in enumerate(row):
        print(f"matrix[{i}][{j}] = {val}")
```

---

## 🚀 進階技巧：前綴和（Prefix Sum）

### 問題：頻繁的區間查詢

假設有一個矩陣，需要**多次**查詢某個矩形區域的元素總和。

**暴力法**：
```python
def range_sum_naive(matrix, r1, c1, r2, c2):
    """查詢從 (r1, c1) 到 (r2, c2) 的矩形區域總和"""
    total = 0
    for i in range(r1, r2 + 1):
        for j in range(c1, c2 + 1):
            total += matrix[i][j]
    return total

# 時間複雜度：O(N×M) per query
```

如果查詢 Q 次，總時間複雜度為 **O(Q×N×M)**，在 APCS 中會 TLE！

### 解決方案：二維前綴和

**核心思想**：預處理一個前綴和矩陣，使每次查詢只需 O(1)。

```python
def build_prefix_sum(matrix):
    """
    建立二維前綴和矩陣
    prefix[i][j] = 從 (0,0) 到 (i-1,j-1) 的矩形區域總和
    """
    rows = len(matrix)
    cols = len(matrix[0])
    
    # 建立 (rows+1) × (cols+1) 的前綴和矩陣（多一行一列方便計算）
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
    
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                           prefix[i-1][j] + 
                           prefix[i][j-1] - 
                           prefix[i-1][j-1])
    
    return prefix

def range_sum(prefix, r1, c1, r2, c2):
    """
    使用前綴和矩陣查詢區間和（O(1)）
    注意：r1, c1, r2, c2 是原矩陣的索引（0-based）
    """
    # 轉換為 prefix 矩陣的索引（1-based）
    r1 += 1
    c1 += 1
    r2 += 1
    c2 += 1
    
    return (prefix[r2][c2] - 
            prefix[r1-1][c2] - 
            prefix[r2][c1-1] + 
            prefix[r1-1][c1-1])

# 測試
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

prefix = build_prefix_sum(matrix)

# 查詢從 (1,1) 到 (2,2) 的區域和
# 應該是 6 + 7 + 10 + 11 = 34
print(range_sum(prefix, 1, 1, 2, 2))  # 34
```

**時間複雜度**：
- 建立前綴和：O(N×M)
- 每次查詢：O(1) ⚡
- Q 次查詢總時間：O(N×M + Q)

**視覺化理解**：

```
原矩陣:
1  2  3  4
5  6  7  8
9  10 11 12

前綴和矩陣（prefix[i][j] = 從(0,0)到(i-1,j-1)的總和）:
0  0  0   0   0
0  1  3   6   10
0  6  14  24  36
0  15 33  54  78

查詢 (1,1) 到 (2,2):
= prefix[3][3] - prefix[0][3] - prefix[3][0] + prefix[0][0]
= 54 - 6 - 15 + 0
= 33 (錯誤示範)

正確計算：
= prefix[3][3] - prefix[1-1][3] - prefix[3][1-1] + prefix[1-1][1-1]
= prefix[3][3] - prefix[0][3] - prefix[3][0] + prefix[0][0]
```

:::tip 前綴和公式
區間和 = 右下 - 左下 - 右上 + 左上

這個「加一減二加一」的模式，源於容斥原理（Inclusion-Exclusion Principle）。
:::

---

## 🛠️ 進階技巧：差分陣列（Difference Array）

### 問題：頻繁的區間修改

假設需要**多次**對矩形區域內的所有元素加上某個值。

**暴力法**：
```python
def range_add_naive(matrix, r1, c1, r2, c2, delta):
    """對 (r1,c1) 到 (r2,c2) 的所有元素加上 delta"""
    for i in range(r1, r2 + 1):
        for j in range(c1, c2 + 1):
            matrix[i][j] += delta

# 時間複雜度：O(N×M) per update
```

### 解決方案：二維差分陣列

**核心思想**：記錄「變化量」而非「實際值」，最後一次性還原。

```python
def build_diff_array(matrix):
    """建立二維差分陣列"""
    rows = len(matrix)
    cols = len(matrix[0])
    
    diff = [[0] * (cols + 1) for _ in range(rows + 1)]
    
    for i in range(rows):
        for j in range(cols):
            diff[i][j] = matrix[i][j]
            if i > 0:
                diff[i][j] -= matrix[i-1][j]
            if j > 0:
                diff[i][j] -= matrix[i][j-1]
            if i > 0 and j > 0:
                diff[i][j] += matrix[i-1][j-1]
    
    return diff

def range_add(diff, r1, c1, r2, c2, delta):
    """
    在差分陣列上標記區間修改（O(1)）
    """
    diff[r1][c1] += delta
    diff[r1][c2+1] -= delta
    diff[r2+1][c1] -= delta
    diff[r2+1][c2+1] += delta

def restore_from_diff(diff, rows, cols):
    """從差分陣列還原原矩陣"""
    matrix = [[0] * cols for _ in range(rows)]
    
    for i in range(rows):
        for j in range(cols):
            matrix[i][j] = diff[i][j]
            if i > 0:
                matrix[i][j] += matrix[i-1][j]
            if j > 0:
                matrix[i][j] += matrix[i][j-1]
            if i > 0 and j > 0:
                matrix[i][j] -= matrix[i-1][j-1]
    
    return matrix

# 測試
matrix = [[0] * 5 for _ in range(5)]
diff = build_diff_array(matrix)

# 對 (1,1) 到 (3,3) 的區域 +5
range_add(diff, 1, 1, 3, 3, 5)

# 對 (2,2) 到 (4,4) 的區域 +3
range_add(diff, 2, 2, 4, 4, 3)

# 還原矩陣
result = restore_from_diff(diff, 5, 5)

for row in result:
    print(row)
```

**時間複雜度**：
- 建立差分陣列：O(N×M)
- 每次區間修改：O(1) ⚡
- 還原矩陣：O(N×M)
- Q 次修改總時間：O(N×M + Q)

---

## 💡 矩陣常見操作

### 矩陣轉置

```python
def transpose(matrix):
    """轉置矩陣（行列互換）"""
    rows = len(matrix)
    cols = len(matrix[0])
    
    result = [[0] * rows for _ in range(cols)]
    
    for i in range(rows):
        for j in range(cols):
            result[j][i] = matrix[i][j]
    
    return result

# Python 簡潔寫法
def transpose_v2(matrix):
    return list(map(list, zip(*matrix)))

# 測試
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]
print(transpose(matrix))
# [[1, 4],
#  [2, 5],
#  [3, 6]]
```

### 矩陣旋轉 90 度

```python
def rotate_90_clockwise(matrix):
    """順時針旋轉 90 度"""
    # 先轉置
    n = len(matrix)
    transposed = [[matrix[j][i] for j in range(n)] for i in range(n)]
    
    # 再左右翻轉
    for row in transposed:
        row.reverse()
    
    return transposed

# 測試
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(rotate_90_clockwise(matrix))
# [[7, 4, 1],
#  [8, 5, 2],
#  [9, 6, 3]]
```

### 螺旋遍歷

```python
def spiral_order(matrix):
    """螺旋順序遍歷矩陣"""
    if not matrix:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # 向右
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1
        
        # 向下
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        
        # 向左（檢查是否還有行）
        if top <= bottom:
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1
        
        # 向上（檢查是否還有列）
        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
    
    return result

# 測試
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
print(spiral_order(matrix))
# [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
```

---

## 🧪 互動練習

### Quiz 1: 建立二維陣列

<details>
<summary>❓ 問題</summary>

建立一個 N×N 的矩陣，其中 `matrix[i][j] = i * N + j`。

例如，N=3 時：
```
0  1  2
3  4  5
6  7  8
```

</details>

<details>
<summary>✅ 解答</summary>

```python
def create_matrix(n):
    return [[i * n + j for j in range(n)] for i in range(n)]

# 測試
print(create_matrix(3))
# [[0, 1, 2],
#  [3, 4, 5],
#  [6, 7, 8]]
```

**時間複雜度**：O(N²)  
**空間複雜度**：O(N²)

</details>

---

### Quiz 2: 對角線和

<details>
<summary>❓ 問題</summary>

計算方陣的主對角線和副對角線的元素總和。

例如：
```
1  2  3
4  5  6
7  8  9
```
- 主對角線：1 + 5 + 9 = 15
- 副對角線：3 + 5 + 7 = 15
- 總和：30（注意中心元素 5 被計算兩次）

</details>

<details>
<summary>✅ 解答</summary>

```python
def diagonal_sum(matrix):
    n = len(matrix)
    total = 0
    
    for i in range(n):
        # 主對角線
        total += matrix[i][i]
        # 副對角線
        total += matrix[i][n-1-i]
    
    # 如果 n 是奇數，中心元素被計算兩次，需要減掉一次
    if n % 2 == 1:
        total -= matrix[n//2][n//2]
    
    return total

# 測試
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(diagonal_sum(matrix))  # 25
```

**時間複雜度**：O(N)  
**空間複雜度**：O(1)

</details>

---

### Quiz 3: 前綴和應用

<details>
<summary>❓ 問題</summary>

給定矩陣和多次查詢，每次查詢一個矩形區域的平均值。

輸入：
```
3 4        # 3 行 4 列
1 2 3 4
5 6 7 8
9 10 11 12
2          # 2 次查詢
0 0 1 1    # 查詢 (0,0) 到 (1,1)
1 1 2 2    # 查詢 (1,1) 到 (2,2)
```

輸出：
```
3.50
9.00
```

</details>

<details>
<summary>✅ 解答</summary>

```python
def solve():
    # 讀取矩陣
    rows, cols = map(int, input().split())
    matrix = []
    for _ in range(rows):
        row = list(map(int, input().split()))
        matrix.append(row)
    
    # 建立前綴和
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                           prefix[i-1][j] + 
                           prefix[i][j-1] - 
                           prefix[i-1][j-1])
    
    # 處理查詢
    q = int(input())
    for _ in range(q):
        r1, c1, r2, c2 = map(int, input().split())
        
        # 計算區間和
        total = (prefix[r2+1][c2+1] - 
                prefix[r1][c2+1] - 
                prefix[r2+1][c1] + 
                prefix[r1][c1])
        
        # 計算平均值
        area = (r2 - r1 + 1) * (c2 - c1 + 1)
        average = total / area
        
        print(f"{average:.2f}")

solve()
```

</details>

---

### Quiz 4: 矩陣搜尋

<details>
<summary>❓ 問題</summary>

在一個每行、每列都已排序的矩陣中，判斷目標值是否存在。

例如：
```
1  4  7  11
2  5  8  12
3  6  9  16
```

尋找 5 → True  
尋找 20 → False

要求：時間複雜度 O(N + M)

</details>

<details>
<summary>✅ 解答</summary>

```python
def search_matrix(matrix, target):
    """
    從右上角開始搜尋：
    - 如果當前值 > target，向左移動
    - 如果當前值 < target，向下移動
    - 如果當前值 == target，找到了
    """
    if not matrix or not matrix[0]:
        return False
    
    rows = len(matrix)
    cols = len(matrix[0])
    
    # 從右上角開始
    i, j = 0, cols - 1
    
    while i < rows and j >= 0:
        if matrix[i][j] == target:
            return True
        elif matrix[i][j] > target:
            j -= 1  # 向左
        else:
            i += 1  # 向下
    
    return False

# 測試
matrix = [
    [1, 4, 7, 11],
    [2, 5, 8, 12],
    [3, 6, 9, 16]
]
print(search_matrix(matrix, 5))   # True
print(search_matrix(matrix, 20))  # False
```

**時間複雜度**：O(N + M)  
**空間複雜度**：O(1)

</details>

---

### Quiz 5: 零矩陣

<details>
<summary>❓ 問題</summary>

給定一個矩陣，如果某個元素為 0，則將其所在的整行和整列都設為 0。

例如：
```
輸入:
1  1  1
1  0  1
1  1  1

輸出:
1  0  1
0  0  0
1  0  1
```

要求：使用 O(1) 額外空間

</details>

<details>
<summary>✅ 解答</summary>

```python
def set_zeroes(matrix):
    """
    使用第一行和第一列作為標記
    """
    rows = len(matrix)
    cols = len(matrix[0])
    
    # 檢查第一行和第一列是否有 0
    first_row_has_zero = any(matrix[0][j] == 0 for j in range(cols))
    first_col_has_zero = any(matrix[i][0] == 0 for i in range(rows))
    
    # 使用第一行和第一列做標記
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # 根據標記設置 0
    for i in range(1, rows):
        for j in range(1, cols):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # 處理第一行
    if first_row_has_zero:
        for j in range(cols):
            matrix[0][j] = 0
    
    # 處理第一列
    if first_col_has_zero:
        for i in range(rows):
            matrix[i][0] = 0

# 測試
matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
set_zeroes(matrix)
for row in matrix:
    print(row)
# [1, 0, 1]
# [0, 0, 0]
# [1, 0, 1]
```

**時間複雜度**：O(N×M)  
**空間複雜度**：O(1)

</details>

---

## 🔗 推薦練習題

### ZeroJudge 題目

<div class="problem-links">

- [a229: 二維陣列操作](https://zerojudge.tw/ShowProblem?problemid=a229) - 基本操作
- [d233: 矩陣加法](https://zerojudge.tw/ShowProblem?problemid=d233) - 矩陣運算
- [e575: 最大子矩陣和](https://zerojudge.tw/ShowProblem?problemid=e575) - 前綴和應用
- [h086: 數獨檢查](https://zerojudge.tw/ShowProblem?problemid=h086) - 二維遍歷

</div>

### 學習建議

1. **記住初始化**：使用列表推導式避免淺複製
2. **熟練前綴和**：這是 APCS 的常考技巧
3. **理解差分陣列**：用於高效區間修改
4. **多做練習**：二維陣列的題目需要空間想像力

---

## 📊 單元總結

### 關鍵概念

1. **淺複製陷阱**：必須用 `[[val] * cols for _ in range(rows)]`
2. **前綴和**：O(1) 區間查詢，適合多次查詢
3. **差分陣列**：O(1) 區間修改，適合多次修改
4. **矩陣操作**：轉置、旋轉、螺旋遍歷

### 效能檢查清單

- [ ] 不使用 `[[value] * cols] * rows` 初始化
- [ ] 多次區間查詢時使用前綴和
- [ ] 多次區間修改時使用差分陣列
- [ ] 理解各種操作的時間複雜度

### 進入下一單元前

確認你已經：
- [ ] 理解二維陣列的本質
- [ ] 能正確初始化二維陣列
- [ ] 掌握前綴和的原理與實作
- [ ] 了解差分陣列的應用場景
- [ ] 完成所有 Quiz

---

<div class="nav-buttons">

[← B1: 字串的奧秘](/zh/course/module-2/b1-string)
[下一單元：B3 函式與模組化 →](/zh/course/module-2/b3-function)

</div>

<style>
.problem-links {
  background-color: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
}

.problem-links a {
  display: block;
  margin: 0.5rem 0;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.2s;
}

.problem-links a:hover {
  transform: translateX(5px);
  color: var(--vp-c-brand-2);
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-buttons a {
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid var(--vp-c-brand-1);
}

.nav-buttons a:hover {
  background-color: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-2px);
}

table {
  width: 100%;
  margin: 1.5rem 0;
}

details {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

summary {
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  padding: 0.5rem;
}

summary:hover {
  color: var(--vp-c-brand-1);
}

details[open] summary {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
</style>
