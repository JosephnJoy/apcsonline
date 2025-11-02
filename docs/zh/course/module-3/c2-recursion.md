# C2: 遞迴與回溯 (Recursion & Backtracking)

## 學習目標
- 理解遞迴的基本原理和運作方式
- 掌握遞迴三要素：基礎情況、遞迴關係、終止條件
- 學習回溯法的思想和實作技巧
- 解決經典遞迴問題

## 遞迴基礎

### 什麼是遞迴？
遞迴是一種函數調用自己的技術。就像俄羅斯娃娃一樣，一層套一層，直到最小的娃娃（基礎情況）。

### 遞迴三要素
1. **基礎情況 (Base Case)**: 遞迴的終止條件
2. **遞迴關係 (Recursive Relation)**: 如何將問題分解成更小的子問題
3. **向基礎情況推進**: 確保每次遞迴都朝著終止條件前進

### 經典範例：階乘

```python
def factorial(n):
    """
    計算 n! = n × (n-1) × ... × 2 × 1
    """
    # 基礎情況
    if n == 0 or n == 1:
        return 1
    
    # 遞迴關係: n! = n × (n-1)!
    return n * factorial(n - 1)

# 測試
print(factorial(5))  # 120
print(factorial(0))  # 1

# 執行過程（以 factorial(5) 為例）:
# factorial(5) = 5 × factorial(4)
#              = 5 × (4 × factorial(3))
#              = 5 × (4 × (3 × factorial(2)))
#              = 5 × (4 × (3 × (2 × factorial(1))))
#              = 5 × (4 × (3 × (2 × 1)))
#              = 120
```

### 經典範例：費波那契數列

```python
def fibonacci(n):
    """
    計算第 n 個費波那契數
    F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
    """
    # 基礎情況
    if n <= 1:
        return n
    
    # 遞迴關係
    return fibonacci(n - 1) + fibonacci(n - 2)

# 測試
print([fibonacci(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

::: warning 效率問題
簡單的遞迴實作可能會有重複計算的問題。費波那契數列的簡單遞迴時間複雜度是 O(2^n)，可以使用**記憶化**或**動態規劃**來優化到 O(n)。
:::

### 優化：記憶化遞迴

```python
def fibonacci_memo(n, memo=None):
    """
    使用記憶化優化的費波那契數列
    時間複雜度: O(n)
    空間複雜度: O(n)
    """
    if memo is None:
        memo = {}
    
    # 檢查是否已經計算過
    if n in memo:
        return memo[n]
    
    # 基礎情況
    if n <= 1:
        return n
    
    # 計算並儲存結果
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

# 測試
print(fibonacci_memo(50))  # 可以快速計算大數字
```

## 遞迴的應用

### 1. 串列反轉

```python
def reverse_list(lst):
    """
    遞迴反轉串列
    """
    # 基礎情況：空串列或只有一個元素
    if len(lst) <= 1:
        return lst
    
    # 遞迴關係：第一個元素移到最後，其餘部分反轉
    return reverse_list(lst[1:]) + [lst[0]]

# 測試
print(reverse_list([1, 2, 3, 4, 5]))  # [5, 4, 3, 2, 1]
```

### 2. 二元搜尋樹中的搜尋

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root, target):
    """
    在二元搜尋樹中搜尋目標值
    時間複雜度: O(log n) 平均情況，O(n) 最壞情況
    """
    # 基礎情況：空節點或找到目標
    if not root or root.val == target:
        return root
    
    # 遞迴關係：根據值的大小決定往左或往右
    if target < root.val:
        return search_bst(root.left, target)
    else:
        return search_bst(root.right, target)
```

### 3. 河內塔問題

```python
def hanoi(n, source, target, auxiliary):
    """
    河內塔問題：將 n 個盤子從 source 移動到 target
    使用 auxiliary 作為輔助柱
    """
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # 將 n-1 個盤子從 source 移到 auxiliary（使用 target 作為輔助）
    hanoi(n - 1, source, auxiliary, target)
    
    # 將最大的盤子從 source 移到 target
    print(f"Move disk {n} from {source} to {target}")
    
    # 將 n-1 個盤子從 auxiliary 移到 target（使用 source 作為輔助）
    hanoi(n - 1, auxiliary, target, source)

# 測試
hanoi(3, 'A', 'C', 'B')
# 輸出移動步驟...
```

## 回溯法 (Backtracking)

### 基本概念
回溯法是一種系統性地搜尋問題所有可能解的算法。它的核心思想是：
1. **選擇**：嘗試一種可能性
2. **探索**：遞迴地探索這個選擇的後果
3. **撤銷**：如果不符合條件，撤銷選擇（回溯）

回溯法的模板：
```python
def backtrack(選擇列表, 路徑):
    if 滿足結束條件:
        result.append(路徑的拷貝)
        return
    
    for 選擇 in 選擇列表:
        做選擇
        backtrack(選擇列表, 路徑)
        撤銷選擇
```

### 經典問題 1: 全排列

```python
def permute(nums):
    """
    生成所有可能的排列
    例如: [1, 2, 3] -> [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
    時間複雜度: O(n × n!)
    """
    result = []
    
    def backtrack(path, remaining):
        # 基礎情況：沒有剩餘元素
        if not remaining:
            result.append(path[:])  # 注意要拷貝！
            return
        
        # 嘗試每個剩餘元素
        for i in range(len(remaining)):
            # 做選擇
            path.append(remaining[i])
            # 遞迴探索（移除已選擇的元素）
            backtrack(path, remaining[:i] + remaining[i+1:])
            # 撤銷選擇
            path.pop()
    
    backtrack([], nums)
    return result

# 測試
print(permute([1, 2, 3]))
# [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

### 經典問題 2: 組合總和

```python
def combination_sum(candidates, target):
    """
    找出所有總和為 target 的數字組合
    例如: candidates = [2, 3, 6, 7], target = 7
    輸出: [[2, 2, 3], [7]]
    """
    result = []
    
    def backtrack(start, path, current_sum):
        # 基礎情況
        if current_sum == target:
            result.append(path[:])
            return
        if current_sum > target:
            return
        
        # 從 start 開始避免重複組合
        for i in range(start, len(candidates)):
            # 做選擇
            path.append(candidates[i])
            # 遞迴（可以重複使用同一個數字，所以傳入 i 而不是 i+1）
            backtrack(i, path, current_sum + candidates[i])
            # 撤銷選擇
            path.pop()
    
    backtrack(0, [], 0)
    return result

# 測試
print(combination_sum([2, 3, 6, 7], 7))
# [[2, 2, 3], [7]]
```

### 經典問題 3: N 皇后問題

```python
def solve_n_queens(n):
    """
    N 皇后問題：在 n×n 的棋盤上放置 n 個皇后，
    使得任意兩個皇后都不能互相攻擊（不在同一行、列或對角線上）
    """
    result = []
    board = [['.'] * n for _ in range(n)]
    
    def is_valid(row, col):
        """檢查 (row, col) 位置是否可以放置皇后"""
        # 檢查同一列
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        
        # 檢查左上對角線
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        
        # 檢查右上對角線
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        
        return True
    
    def backtrack(row):
        """嘗試在第 row 行放置皇后"""
        if row == n:
            # 找到一個解
            result.append([''.join(row) for row in board])
            return
        
        # 嘗試在第 row 行的每一列放置皇后
        for col in range(n):
            if is_valid(row, col):
                # 做選擇
                board[row][col] = 'Q'
                # 遞迴處理下一行
                backtrack(row + 1)
                # 撤銷選擇
                board[row][col] = '.'
    
    backtrack(0)
    return result

# 測試
solutions = solve_n_queens(4)
for sol in solutions:
    for row in sol:
        print(row)
    print()

# 輸出:
# .Q..
# ...Q
# Q...
# ..Q.
#
# ..Q.
# Q...
# ...Q
# .Q..
```

### 經典問題 4: 數獨求解器

```python
def solve_sudoku(board):
    """
    解數獨
    board 是 9×9 的二維陣列，'.' 表示空格
    """
    def is_valid(row, col, num):
        """檢查在 (row, col) 放置 num 是否有效"""
        # 檢查行
        if num in board[row]:
            return False
        
        # 檢查列
        if num in [board[i][col] for i in range(9)]:
            return False
        
        # 檢查 3×3 方格
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(box_row, box_row + 3):
            for j in range(box_col, box_col + 3):
                if board[i][j] == num:
                    return False
        
        return True
    
    def backtrack():
        """回溯求解"""
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    # 嘗試填入 1-9
                    for num in '123456789':
                        if is_valid(i, j, num):
                            # 做選擇
                            board[i][j] = num
                            # 遞迴繼續填下一個空格
                            if backtrack():
                                return True
                            # 撤銷選擇
                            board[i][j] = '.'
                    # 所有數字都不行，需要回溯
                    return False
        # 所有格子都填好了
        return True
    
    backtrack()
    return board

# 測試
board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
solve_sudoku(board)
for row in board:
    print(row)
```

## 遞迴 vs 迭代

### 優缺點比較

| 特性 | 遞迴 | 迭代 |
|------|------|------|
| 程式碼簡潔性 | ✅ 通常更簡潔 | ❌ 可能較冗長 |
| 可讀性 | ✅ 更接近數學定義 | ⚠️ 需要手動管理狀態 |
| 空間複雜度 | ❌ O(n) 堆疊空間 | ✅ O(1) 額外空間 |
| 效率 | ❌ 函數調用開銷 | ✅ 無函數調用開銷 |
| 堆疊溢位風險 | ❌ 遞迴太深會溢位 | ✅ 無此風險 |

### 範例對比：計算總和

```python
# 遞迴版本
def sum_recursive(arr):
    if not arr:
        return 0
    return arr[0] + sum_recursive(arr[1:])

# 迭代版本
def sum_iterative(arr):
    total = 0
    for num in arr:
        total += num
    return total

# 測試
arr = [1, 2, 3, 4, 5]
print(sum_recursive(arr))  # 15
print(sum_iterative(arr))  # 15
```

## 尾遞迴優化

尾遞迴是指遞迴調用是函數的最後一個操作。某些語言（不包括 Python）可以優化尾遞迴，避免堆疊溢位。

```python
# 普通遞迴（不是尾遞迴）
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # 最後還要做乘法

# 尾遞迴版本
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, n * acc)  # 最後一個操作是遞迴調用

# 測試
print(factorial(5))        # 120
print(factorial_tail(5))   # 120
```

::: warning Python 不支援尾遞迴優化
Python 解釋器不會自動優化尾遞迴，所以尾遞迴在 Python 中並不會減少堆疊使用。如果需要處理大量資料，建議使用迭代。
:::

## 練習題目

### 基礎題
1. **爬樓梯問題** - 每次可以爬 1 或 2 階，有多少種方法爬到第 n 階？
2. **反轉鏈結串列** - 使用遞迴反轉鏈結串列
3. **計算冪次** - 實作 pow(x, n)，計算 x 的 n 次方

### 進階題
4. **子集合** - 生成一個集合的所有子集合
5. **電話號碼的字母組合** - 數字鍵盤的所有字母組合
6. **括號生成** - 生成所有有效的 n 對括號組合

### 困難題
7. **單詞搜尋** - 在二維字母網格中搜尋單詞
8. **解數獨**
9. **N 皇后問題**

### ZeroJudge 相關題目
- [a024. 最大公因數(GCD)](https://zerojudge.tw/ShowProblem?problemid=a024) - 遞迴實作
- [d784. 11.河內塔](https://zerojudge.tw/ShowProblem?problemid=d784)

## 測驗時間 🎯

### 題目 1
以下遞迴函數的輸出是什麼？
```python
def mystery(n):
    if n <= 0:
        return 0
    return n + mystery(n - 2)

print(mystery(5))
```

::: details 點擊查看答案
**答案**: 9

**解析**:
```
mystery(5) = 5 + mystery(3)
           = 5 + (3 + mystery(1))
           = 5 + (3 + (1 + mystery(-1)))
           = 5 + (3 + (1 + 0))
           = 9
```
計算的是 5 + 3 + 1 = 9（所有奇數的總和）
:::

### 題目 2
改寫以下遞迴函數為迭代版本：
```python
def count_down(n):
    if n <= 0:
        print("Done!")
        return
    print(n)
    count_down(n - 1)
```

::: details 點擊查看答案
```python
def count_down_iterative(n):
    while n > 0:
        print(n)
        n -= 1
    print("Done!")
```

**解析**: 將遞迴的結構轉換為迴圈，基礎情況變成迴圈的終止條件。
:::

### 題目 3
以下回溯函數會產生什麼結果？
```python
def generate_binary(n, prefix=""):
    if n == 0:
        print(prefix)
        return
    generate_binary(n - 1, prefix + "0")
    generate_binary(n - 1, prefix + "1")

generate_binary(3)
```

::: details 點擊查看答案
**答案**: 生成所有長度為 3 的二進位字串
```
000
001
010
011
100
101
110
111
```

**解析**: 每一層遞迴都選擇加入 "0" 或 "1"，共有 2^3 = 8 種組合。
:::

### 題目 4
費波那契數列的簡單遞迴版本時間複雜度是多少？為什麼？

::: details 點擊查看答案
**答案**: O(2^n)

**解析**:
每次調用 `fibonacci(n)` 會產生兩次遞迴調用：`fibonacci(n-1)` 和 `fibonacci(n-2)`。這形成了一棵近似的二元樹，深度為 n，所以總調用次數約為 2^n。

例如計算 fibonacci(5):
```
                    fib(5)
                   /      \
              fib(4)      fib(3)
             /     \      /    \
        fib(3)   fib(2) fib(2) fib(1)
        /   \    /   \   /  \
    fib(2) fib(1) ...  ...  ...
```

許多子問題被重複計算，可以用記憶化優化到 O(n)。
:::

### 題目 5
回溯法的三個核心步驟是什麼？

::: details 點擊查看答案
**答案**:
1. **做選擇** - 從選擇列表中選擇一個可能性
2. **遞迴探索** - 對這個選擇的後果進行遞迴探索
3. **撤銷選擇** - 如果不符合條件或已經探索完，撤銷選擇（回溯）

**解析**: 這個模式可以總結為「選擇-探索-撤銷」循環，是解決組合、排列、子集等問題的通用框架。
:::

## 重點整理

1. **遞迴三要素**
   - 基礎情況（終止條件）
   - 遞迴關係（如何分解問題）
   - 確保向基礎情況推進

2. **常見問題**
   - 堆疊溢位：遞迴深度過深
   - 重複計算：使用記憶化優化
   - 效率問題：考慮改用迭代

3. **回溯法模板**
   ```python
   def backtrack(選擇列表, 路徑):
       if 滿足結束條件:
           記錄解
           return
       
       for 選擇 in 選擇列表:
           做選擇
           backtrack(新選擇列表, 新路徑)
           撤銷選擇
   ```

4. **適用場景**
   - 排列組合問題
   - 搜尋問題（N 皇后、數獨）
   - 樹和圖的遍歷
   - 分治算法

5. **優化技巧**
   - 記憶化遞迴（Memoization）
   - 剪枝（Pruning）- 提前終止無效分支
   - 尾遞迴優化（某些語言支援）

---

[← 回到 Module 3 目錄](./index.md)
