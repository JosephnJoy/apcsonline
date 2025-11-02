# A3: 數據的容器：將 List 作為一維陣列

:::tip 單元目標
- 掌握 List 的創建、存取與修改
- 理解常用操作的時間複雜度
- 學會遍歷與處理列表資料
- 建立效能意識，選擇適當的資料結構
:::

## 為什麼要學 List？

處理單一數據點遠遠不夠，程式設計的威力體現在處理**成批的、結構化的資料**。

Python 的 **list**（列表）是最常用、最靈活的序列容器。在 APCS 基礎階段，我們將其視為**一維陣列（Array）**來使用，這是處理批量資料的基礎工具。

從統計一組成績，到記錄一系列感測器數據，list 無處不在。掌握 list 的操作，是邁向 APCS 2 級分的關鍵。

## 概念基礎

### 序列（Sequence）的概念

序列是一種資料結構，用於儲存**多個有序的元素**。Python 中的序列包括：
- **list**（列表）：可變序列
- **tuple**（元組）：不可變序列
- **str**（字串）：不可變字元序列

### 零基索引（Zero-based Indexing）

:::warning 重要概念
在程式設計中，索引從 **0** 開始，而非 1！

- 第 1 個元素的索引是 **0**
- 第 2 個元素的索引是 **1**
- 第 n 個元素的索引是 **n-1**
:::

```python
numbers = [10, 20, 30, 40, 50]
#         ↑   ↑   ↑   ↑   ↑
# 索引:    0   1   2   3   4
```

## Python 實踐

### 1. 創建 List

#### 基本創建方式

```python
# 空列表
empty_list = []

# 直接初始化
numbers = [1, 2, 3, 4, 5]
fruits = ["蘋果", "香蕉", "橘子"]
mixed = [1, "hello", 3.14, True]  # 可以混合不同型別

# 使用 list() 轉換
chars = list("Python")  # ['P', 'y', 't', 'h', 'o', 'n']
```

#### 創建特定大小的列表

```python
# 創建包含 n 個 0 的列表
n = 5
zeros = [0] * n  # [0, 0, 0, 0, 0]

# 創建包含 n 個相同元素
n = 3
items = ["x"] * n  # ['x', 'x', 'x']
```

:::danger 淺拷貝陷阱
```python
# ❌ 錯誤：創建包含列表的列表
matrix = [[0] * 3] * 2
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0]]  <- 兩行都被修改了！

# ✅ 正確：使用列表生成式
matrix = [[0] * 3 for _ in range(2)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0]]  <- 只有第一行被修改
```
:::

#### 列表生成式（List Comprehension）

強大且簡潔的創建方式：

```python
# 基本語法
squares = [x**2 for x in range(5)]
# [0, 1, 4, 9, 16]

# 帶條件篩選
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# 應用函式
words = ["hello", "world"]
upper_words = [w.upper() for w in words]
# ['HELLO', 'WORLD']

# 二維列表
matrix = [[i+j for j in range(3)] for i in range(3)]
# [[0, 1, 2], [1, 2, 3], [2, 3, 4]]
```

### 2. 存取與修改

#### 基本索引

```python
numbers = [10, 20, 30, 40, 50]

# 正向索引（從 0 開始）
print(numbers[0])   # 10
print(numbers[2])   # 30
print(numbers[4])   # 50

# 負向索引（從 -1 開始，表示倒數）
print(numbers[-1])  # 50（最後一個）
print(numbers[-2])  # 40（倒數第二個）

# 修改元素
numbers[0] = 100
print(numbers)  # [100, 20, 30, 40, 50]
```

#### 切片（Slicing）

切片是 Python 的強大功能，語法：`list[start:stop:step]`

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基本切片
print(numbers[2:5])    # [2, 3, 4]（索引 2 到 4）
print(numbers[:3])     # [0, 1, 2]（開頭到索引 2）
print(numbers[7:])     # [7, 8, 9]（索引 7 到結尾）
print(numbers[:])      # [0, 1, ..., 9]（複製整個列表）

# 步長切片
print(numbers[::2])    # [0, 2, 4, 6, 8]（每隔一個）
print(numbers[1::2])   # [1, 3, 5, 7, 9]（奇數索引）
print(numbers[::-1])   # [9, 8, 7, ..., 0]（反轉列表）

# 負索引切片
print(numbers[-3:])    # [7, 8, 9]（最後三個）
print(numbers[:-2])    # [0, 1, ..., 7]（除了最後兩個）
```

### 3. 遍歷（Traversal）

#### 基於值的遍歷

```python
fruits = ["蘋果", "香蕉", "橘子"]

# 直接遍歷元素
for fruit in fruits:
    print(fruit)
```

#### 基於索引的遍歷

```python
fruits = ["蘋果", "香蕉", "橘子"]

# 使用 range 和 len
for i in range(len(fruits)):
    print(f"索引 {i}: {fruits[i]}")
```

#### 同時取得索引和值

```python
fruits = ["蘋果", "香蕉", "橘子"]

# 使用 enumerate（推薦）
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 從 1 開始編號
for index, fruit in enumerate(fruits, start=1):
    print(f"第 {index} 個: {fruit}")
```

:::tip 選擇建議
- **需要索引**：使用 `enumerate()` 或 `range(len())`
- **只需要值**：直接 `for item in list`
- **需要修改元素**：使用索引方式
:::

### 4. 常用操作

#### 查詢資訊

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# 長度
print(len(numbers))     # 8

# 統計與數學
print(sum(numbers))     # 31
print(min(numbers))     # 1
print(max(numbers))     # 9

# 檢查元素是否存在
print(5 in numbers)     # True
print(10 in numbers)    # False

# 計數特定元素
print(numbers.count(1)) # 2

# 找出索引
print(numbers.index(4)) # 2（第一次出現的位置）
```

#### 新增元素

```python
fruits = ["蘋果", "香蕉"]

# append：在尾部添加（最常用）
fruits.append("橘子")
print(fruits)  # ['蘋果', '香蕉', '橘子']

# insert：在指定位置插入
fruits.insert(1, "芒果")
print(fruits)  # ['蘋果', '芒果', '香蕉', '橘子']

# extend：合併另一個列表
more_fruits = ["葡萄", "西瓜"]
fruits.extend(more_fruits)
print(fruits)  # ['蘋果', '芒果', '香蕉', '橘子', '葡萄', '西瓜']

# + 運算子：創建新列表
all_fruits = fruits + ["草莓", "櫻桃"]
```

#### 刪除元素

```python
numbers = [1, 2, 3, 4, 5]

# pop：移除並返回指定位置的元素
last = numbers.pop()      # 移除最後一個，返回 5
first = numbers.pop(0)    # 移除第一個，返回 1
print(numbers)            # [2, 3, 4]

# remove：移除第一個匹配的元素
numbers.remove(3)
print(numbers)            # [2, 4]

# del：刪除指定位置或切片
numbers = [1, 2, 3, 4, 5]
del numbers[0]            # 刪除第一個
print(numbers)            # [2, 3, 4, 5]

del numbers[1:3]          # 刪除切片
print(numbers)            # [2, 5]

# clear：清空整個列表
numbers.clear()
print(numbers)            # []
```

#### 排序與反轉

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sort()：原地排序（修改原列表）
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# 降序排序
numbers.sort(reverse=True)
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted()：返回新的排序列表（不修改原列表）
original = [3, 1, 4]
sorted_list = sorted(original)
print(original)     # [3, 1, 4]（未改變）
print(sorted_list)  # [1, 3, 4]

# reverse()：原地反轉
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]
```

## ⚡ 效能分析：建立演算法思維

這是本單元最重要的部分：**理解不同操作的效能**。

### Python List 效能表

| 操作 | 時間複雜度 | 說明 |
|------|-----------|------|
| `list[i]` | $O(1)$ | 索引存取 |
| `list.append(x)` | $O(1)$ (均攤) | 尾部添加 |
| `list.pop()` | $O(1)$ | 尾部移除 |
| `list.pop(0)` | $O(N)$ | ⚠️ 頭部移除（慢） |
| `list.insert(0, x)` | $O(N)$ | ⚠️ 頭部插入（慢） |
| `x in list` | $O(N)$ | 成員測試 |
| `list.remove(x)` | $O(N)$ | 移除元素 |
| `list.sort()` | $O(N \log N)$ | 排序 |
| `len(list)` | $O(1)$ | 取得長度 |
| `sum(list)` | $O(N)$ | 計算總和 |

:::danger 效能陷阱
```python
# ❌ 效能差：從頭部刪除（每次都需要移動所有元素）
for _ in range(n):
    list.pop(0)  # O(N) × N 次 = O(N²)

# ✅ 效能好：從尾部刪除
for _ in range(n):
    list.pop()   # O(1) × N 次 = O(N)

# ✅ 或使用 collections.deque（下個模組會學）
from collections import deque
queue = deque(list)
for _ in range(n):
    queue.popleft()  # O(1)
```
:::

### 為什麼這很重要？

在 APCS 中，選擇錯誤的資料結構或操作，可能導致：
- **TLE（Time Limit Exceeded）**：執行超時
- 即使演算法正確，也無法通過測試

**範例**：處理 100,000 筆資料

```python
# ❌ 錯誤：從頭部刪除 → O(N²) = 10,000,000,000 次操作
data = list(range(100000))
while data:
    data.pop(0)  # 每次都要移動所有剩餘元素

# ✅ 正確：從尾部刪除 → O(N) = 100,000 次操作
data = list(range(100000))
while data:
    data.pop()   # 只需要改變一個指標
```

## 完整範例程式

### 範例 1：讀取並處理數列

```python
import sys

# 讀取 N 個整數
n = int(sys.stdin.readline())
numbers = list(map(int, sys.stdin.readline().split()))

# 計算統計資訊
total = sum(numbers)
average = total / n
maximum = max(numbers)
minimum = min(numbers)

print(f"總和: {total}")
print(f"平均: {average:.2f}")
print(f"最大值: {maximum}")
print(f"最小值: {minimum}")
```

### 範例 2：找出大於平均值的數字

```python
import sys

numbers = list(map(int, sys.stdin.readline().split()))

# 計算平均值
average = sum(numbers) / len(numbers)

# 篩選大於平均值的數字
above_average = [num for num in numbers if num > average]

print(f"大於平均值 {average:.2f} 的數字:")
print(*above_average)  # * 用於解包列表
```

### 範例 3：移除重複元素（保持順序）

```python
import sys

numbers = list(map(int, sys.stdin.readline().split()))

# 方法一：使用列表（保持順序）
unique = []
for num in numbers:
    if num not in unique:
        unique.append(num)

# 方法二：使用 set（不保持順序，但更快）
unique_set = list(set(numbers))

print("去重後（保持順序）:", unique)
print("去重後（不保持順序）:", unique_set)
```

### 範例 4：找出連續子序列的最大和

```python
import sys

numbers = list(map(int, sys.stdin.readline().split()))
n = len(numbers)

max_sum = numbers[0]
current_sum = numbers[0]

for i in range(1, n):
    # 選擇：繼續累加 或 重新開始
    current_sum = max(numbers[i], current_sum + numbers[i])
    max_sum = max(max_sum, current_sum)

print(max_sum)
```

### 範例 5：雙指標技巧

```python
import sys

# 判斷列表是否為回文
def is_palindrome(lst):
    left = 0
    right = len(lst) - 1
    
    while left < right:
        if lst[left] != lst[right]:
            return False
        left += 1
        right -= 1
    
    return True

data = list(map(int, sys.stdin.readline().split()))
print("是回文" if is_palindrome(data) else "不是回文")
```

## APCS 策略與應用

### 對應評量項目

- **實作題 1-2 級分**：陣列的基本操作
- **實作題 3 級分**：陣列的進階應用（前綴和、雙指標）

### 常見題型

1. **統計問題**：計算總和、平均、最大最小值
2. **搜尋問題**：查找特定元素或滿足條件的元素
3. **轉換問題**：根據規則轉換陣列內容
4. **模擬問題**：模擬陣列的操作流程

### 實戰檢查清單

在提交程式前，檢查：
- [ ] 是否使用了 `list.pop(0)` 或 `list.insert(0, x)`？
- [ ] 在大迴圈中是否有 `x in list` 檢查？
- [ ] 是否可以用 `set` 加速成員測試？
- [ ] 排序是否必要？能否用 $O(N)$ 算法替代？

## 📝 Quiz：測試你的理解

<div class="quiz-container">

### 問題 1
以下程式碼的輸出是什麼？
```python
numbers = [1, 2, 3, 4, 5]
print(numbers[-2])
```

A. 2  
B. 3  
C. 4  
D. 5

<details>
<summary>點擊查看解答</summary>

**答案：C**

**解析**：  
負索引 -1 代表最後一個元素（5），-2 代表倒數第二個元素（4）。

</details>

---

### 問題 2
哪個操作的時間複雜度是 O(1)？

A. `list.pop(0)`  
B. `list.append(x)`  
C. `x in list`  
D. `list.remove(x)`

<details>
<summary>點擊查看解答</summary>

**答案：B**

**解析**：  
- `list.append(x)` 在尾部添加，均攤時間複雜度為 O(1)
- `list.pop(0)` 需要移動所有元素，O(N)
- `x in list` 需要遍歷，O(N)
- `list.remove(x)` 需要查找並移動元素，O(N)

</details>

---

### 問題 3
以下程式碼創建的二維列表有什麼問題？
```python
matrix = [[0] * 3] * 2
matrix[0][0] = 1
```

A. 沒有問題  
B. 會報錯  
C. 兩行會都被修改  
D. 只有第二行被修改

<details>
<summary>點擊查看解答</summary>

**答案：C**

**解析**：  
`[[0] * 3] * 2` 創建的是兩個**指向同一個列表的參考**（淺拷貝），所以修改 `matrix[0][0]` 時，`matrix[1][0]` 也會被修改。

正確做法：`[[0] * 3 for _ in range(2)]`

</details>

---

### 問題 4
`numbers[::-1]` 的作用是什麼？

A. 排序列表  
B. 反轉列表  
C. 複製列表  
D. 清空列表

<details>
<summary>點擊查看解答</summary>

**答案：B**

**解析**：  
切片語法 `[start:stop:step]`，當 step 為 -1 時，表示反向遍歷，因此 `[::-1]` 會返回反轉後的列表。

</details>

---

### 問題 5
以下哪個方法會修改原列表？

A. `sorted(list)`  
B. `list.sort()`  
C. `list + [1, 2, 3]`  
D. `list[:]`

<details>
<summary>點擊查看解答</summary>

**答案：B**

**解析**：  
- `list.sort()` 是**原地排序**，會修改原列表
- `sorted(list)` 返回**新列表**，不修改原列表
- `list + [1, 2, 3]` 創建**新列表**
- `list[:]` 創建列表的**淺拷貝**

</details>

</div>

## 🔗 推薦習題

### 基礎練習

<div class="problem-links">

[h081: 程式交易](https://zerojudge.tw/ShowProblem?problemid=h081)

[g595: 修補圍籬](https://zerojudge.tw/ShowProblem?problemid=g595)

</div>

### 練習重點
1. 讀取並處理一維陣列
2. 計算統計資訊（總和、平均、最大最小）
3. 遍歷陣列並應用條件判斷
4. 注意操作的時間複雜度

:::tip 學習建議
完成這些題目後，確保你能夠：
- [ ] 熟練使用不同方式創建列表
- [ ] 正確使用索引和切片
- [ ] 選擇適當的遍歷方式
- [ ] 理解常用操作的時間複雜度
- [ ] 避免效能陷阱
:::

## 💡 進階：為什麼需要其他資料結構？

List 很強大，但不是萬能的。看看這個對照表，你就會理解為什麼後續要學習其他資料結構：

| 需求 | List 效能 | 更好的選擇 | 模組 |
|------|----------|-----------|------|
| 快速查找「元素是否存在」 | O(N) | `set`：O(1) | 模組二 |
| 從頭部添加/刪除 | O(N) | `deque`：O(1) | 模組三 |
| 快速按鍵查找值 | N/A | `dict`：O(1) | 模組二 |
| 先進先出（佇列） | O(N) | `deque`：O(1) | 模組三 |

這就是為什麼我們需要學習更多資料結構！

---

## 恭喜！模組一完成 🎉

你已經完成了模組一的所有單元！現在你應該具備：
- ✅ 高速 I/O 的習慣
- ✅ 精確的邏輯控制能力
- ✅ 處理批量資料的技能
- ✅ 基本的效能意識

**你已經打好了堅實的地基！**

準備好進入下一個階段了嗎？

[前往模組二：構築核心結構 →](/zh/course/module-2/)

<style>
details {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  user-select: none;
}

details summary:hover {
  color: var(--vp-c-brand-2);
}

details[open] summary {
  margin-bottom: 1rem;
}

.quiz-container {
  margin: 2rem 0;
}

.quiz-container > h3 {
  color: var(--vp-c-brand-1);
  margin-top: 1.5rem;
}

table {
  width: 100%;
  margin: 1.5rem 0;
  font-size: 0.9em;
}
</style>
