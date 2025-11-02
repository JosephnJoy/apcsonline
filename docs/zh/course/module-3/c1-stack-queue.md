# C1: 堆疊與佇列 (Stack & Queue)

## 學習目標
- 理解堆疊 (Stack) 和佇列 (Queue) 的基本概念
- 掌握 Python 中的實作方式
- 學習常見的應用場景
- 分析時間複雜度

## 堆疊 (Stack)

### 基本概念
堆疊是一種 **後進先出** (LIFO, Last In First Out) 的資料結構。就像疊盤子一樣，最後放上去的盤子會最先被拿走。

### Python 實作
Python 的 list 可以直接當作堆疊使用：

```python
# 創建空堆疊
stack = []

# Push - 加入元素到頂端 O(1)
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]

# Pop - 移除並返回頂端元素 O(1)
top = stack.pop()
print(top)     # 3
print(stack)   # [1, 2]

# Peek - 查看頂端元素（不移除）O(1)
if stack:
    top = stack[-1]
    print(top)  # 2

# 檢查是否為空 O(1)
is_empty = len(stack) == 0

# 取得大小 O(1)
size = len(stack)
```

### 時間複雜度

| 操作 | 時間複雜度 | 說明 |
|------|-----------|------|
| push (append) | O(1) | 在尾端加入元素 |
| pop | O(1) | 移除尾端元素 |
| peek (stack[-1]) | O(1) | 查看尾端元素 |
| search | O(n) | 需要遍歷整個堆疊 |

### 經典應用

#### 1. 括號配對檢查
```python
def is_valid_parentheses(s):
    """
    檢查括號是否配對正確
    例如: "()" -> True, "()[]{}" -> True, "(]" -> False
    """
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:  # 右括號
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:  # 左括號
            stack.append(char)
    
    return len(stack) == 0

# 測試
print(is_valid_parentheses("()"))        # True
print(is_valid_parentheses("()[]{}"))    # True
print(is_valid_parentheses("(]"))        # False
print(is_valid_parentheses("([)]"))      # False
```

#### 2. 逆波蘭表示法 (後序表達式)
```python
def eval_rpn(tokens):
    """
    計算逆波蘭表示法的結果
    例如: ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) = 9
    """
    stack = []
    
    for token in tokens:
        if token in ['+', '-', '*', '/']:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:  # '/'
                stack.append(int(a / b))  # 向零取整
        else:
            stack.append(int(token))
    
    return stack[0]

# 測試
print(eval_rpn(["2", "1", "+", "3", "*"]))  # 9
print(eval_rpn(["4", "13", "5", "/", "+"]))  # 6
```

#### 3. 單調堆疊 - 下一個更大元素
```python
def next_greater_element(nums):
    """
    找出每個元素右邊第一個比它大的元素
    例如: [2, 1, 2, 4, 3] -> [4, 2, 4, -1, -1]
    """
    n = len(nums)
    result = [-1] * n
    stack = []  # 存儲索引
    
    for i in range(n):
        # 當前元素比堆疊頂端元素大
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    
    return result

# 測試
print(next_greater_element([2, 1, 2, 4, 3]))  # [4, 2, 4, -1, -1]
```

## 佇列 (Queue)

### 基本概念
佇列是一種 **先進先出** (FIFO, First In First Out) 的資料結構。就像排隊一樣，先到的人先被服務。

### Python 實作

#### 方法 1: 使用 collections.deque（推薦）
```python
from collections import deque

# 創建空佇列
queue = deque()

# Enqueue - 加入元素到尾端 O(1)
queue.append(1)
queue.append(2)
queue.append(3)
print(queue)  # deque([1, 2, 3])

# Dequeue - 移除並返回前端元素 O(1)
front = queue.popleft()
print(front)   # 1
print(queue)   # deque([2, 3])

# Peek - 查看前端元素 O(1)
if queue:
    front = queue[0]
    print(front)  # 2

# 檢查是否為空 O(1)
is_empty = len(queue) == 0

# 取得大小 O(1)
size = len(queue)
```

#### 方法 2: 使用 list（不推薦）
```python
# 使用 list 實作佇列（效率較低）
queue = []

# Enqueue O(1)
queue.append(1)
queue.append(2)

# Dequeue O(n) - 需要移動所有元素！
front = queue.pop(0)  # 慢！
```

::: warning 注意
使用 `list.pop(0)` 移除第一個元素的時間複雜度是 O(n)，因為需要將所有後續元素向前移動。應該使用 `collections.deque` 來實作佇列。
:::

### 時間複雜度

| 操作 | deque | list |
|------|-------|------|
| enqueue (append) | O(1) | O(1) |
| dequeue (popleft/pop(0)) | O(1) | O(n) |
| peek | O(1) | O(1) |
| search | O(n) | O(n) |

### 經典應用

#### 1. BFS 廣度優先搜尋
```python
from collections import deque

def bfs_tree(root):
    """
    樹的層序遍歷 (Level Order Traversal)
    """
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        node = queue.popleft()
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    return result
```

#### 2. 滑動視窗最大值（雙端佇列）
```python
from collections import deque

def max_sliding_window(nums, k):
    """
    找出每個大小為 k 的滑動視窗中的最大值
    例如: nums = [1,3,-1,-3,5,3,6,7], k = 3
    輸出: [3,3,5,5,6,7]
    """
    if not nums or k == 0:
        return []
    
    result = []
    dq = deque()  # 存儲索引，保持遞減順序
    
    for i in range(len(nums)):
        # 移除超出視窗範圍的元素
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # 移除所有比當前元素小的元素
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # 當視窗形成後開始記錄結果
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# 測試
print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]
```

#### 3. 實作一個帶有 min() 功能的堆疊
```python
class MinStack:
    """
    設計一個堆疊，支援 push、pop、top 和在常數時間內取得最小元素
    """
    def __init__(self):
        self.stack = []
        self.min_stack = []  # 輔助堆疊，記錄當前最小值
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        if self.stack:
            val = self.stack.pop()
            if val == self.min_stack[-1]:
                self.min_stack.pop()
            return val
    
    def top(self):
        return self.stack[-1] if self.stack else None
    
    def get_min(self):
        return self.min_stack[-1] if self.min_stack else None

# 測試
min_stack = MinStack()
min_stack.push(-2)
min_stack.push(0)
min_stack.push(-3)
print(min_stack.get_min())  # -3
min_stack.pop()
print(min_stack.top())      # 0
print(min_stack.get_min())  # -2
```

## 雙端佇列 (Deque)

雙端佇列允許在兩端進行插入和刪除操作：

```python
from collections import deque

dq = deque([1, 2, 3])

# 在右端操作
dq.append(4)        # O(1) - [1, 2, 3, 4]
dq.pop()            # O(1) - [1, 2, 3]

# 在左端操作
dq.appendleft(0)    # O(1) - [0, 1, 2, 3]
dq.popleft()        # O(1) - [1, 2, 3]

# 旋轉
dq.rotate(1)        # O(k) - [3, 1, 2] 向右旋轉
dq.rotate(-1)       # O(k) - [1, 2, 3] 向左旋轉
```

## 堆疊 vs 佇列比較

| 特性 | 堆疊 (Stack) | 佇列 (Queue) |
|------|-------------|-------------|
| 順序 | LIFO (後進先出) | FIFO (先進先出) |
| Python 實作 | list | collections.deque |
| 主要操作 | push, pop | enqueue, dequeue |
| 應用場景 | 函數調用、括號配對、DFS | BFS、任務排程 |

## 練習題目

### 基礎題
1. **有效的括號** - 檢查字串中的括號是否配對
2. **用兩個堆疊實作佇列**
3. **用兩個佇列實作堆疊**

### 進階題
4. **最小值堆疊** - 實作可以在 O(1) 時間取得最小值的堆疊
5. **滑動視窗最大值** - 使用雙端佇列
6. **下一個更大元素** - 使用單調堆疊

### ZeroJudge 相關題目
- [a229. 括號配對問題](https://zerojudge.tw/ShowProblem?problemid=a229)
- [d406. 後序表達式的值](https://zerojudge.tw/ShowProblem?problemid=d406)

## 測驗時間 🎯

### 題目 1
以下程式碼的輸出是什麼？
```python
stack = []
stack.append(1)
stack.append(2)
stack.append(3)
stack.pop()
stack.append(4)
print(stack[-1])
```

::: details 點擊查看答案
**答案**: 4

**解析**: 
- append(1,2,3): [1, 2, 3]
- pop(): [1, 2]
- append(4): [1, 2, 4]
- stack[-1] 是堆疊頂端，即 4
:::

### 題目 2
使用 list.pop(0) 實作佇列的時間複雜度是多少？為什麼？

::: details 點擊查看答案
**答案**: O(n)

**解析**: 
當使用 `pop(0)` 移除第一個元素時，Python 需要將所有後續元素向前移動一位，這需要 O(n) 的時間。這就是為什麼應該使用 `collections.deque` 的 `popleft()` 來實作佇列，後者的時間複雜度是 O(1)。
:::

### 題目 3
實作一個函數，使用堆疊反轉字串。

::: details 點擊查看答案
```python
def reverse_string(s):
    stack = []
    # 將所有字元推入堆疊
    for char in s:
        stack.append(char)
    
    # 彈出所有字元（反序）
    result = ""
    while stack:
        result += stack.pop()
    
    return result

# 測試
print(reverse_string("hello"))  # "olleh"
```

**解析**: 堆疊的 LIFO 特性天然適合反轉操作。
:::

### 題目 4
以下括號字串哪些是有效的？
- A. `"()[]{}"`
- B. `"([)]"`
- C. `"{[]}"`
- D. `"(("`

::: details 點擊查看答案
**答案**: A 和 C

**解析**:
- A: 每個括號都有正確的配對
- B: 中括號和小括號順序錯誤 - 左小括號應該先關閉
- C: 正確的嵌套順序
- D: 缺少右括號
:::

### 題目 5
實作一個函數，判斷序列是否可能是堆疊的彈出序列。給定推入序列 [1,2,3,4,5]，彈出序列 [4,5,3,2,1] 是否可能？

::: details 點擊查看答案
**答案**: 是

**解析**:
```
操作序列:
push 1, push 2, push 3, push 4
pop 4
push 5
pop 5
pop 3
pop 2
pop 1

可以得到序列 [4, 5, 3, 2, 1]
```

```python
def is_valid_pop_sequence(pushed, popped):
    stack = []
    i = 0  # popped 的指針
    
    for num in pushed:
        stack.append(num)
        # 如果堆疊頂端等於當前要彈出的元素
        while stack and stack[-1] == popped[i]:
            stack.pop()
            i += 1
    
    return len(stack) == 0

# 測試
print(is_valid_pop_sequence([1,2,3,4,5], [4,5,3,2,1]))  # True
print(is_valid_pop_sequence([1,2,3,4,5], [4,3,5,1,2]))  # False
```
:::

## 重點整理

1. **堆疊 (Stack)**
   - LIFO 特性
   - 使用 list 實作
   - 主要操作: append(), pop()
   - 應用: 括號配對、函數調用、DFS

2. **佇列 (Queue)**
   - FIFO 特性
   - 使用 deque 實作（不要用 list）
   - 主要操作: append(), popleft()
   - 應用: BFS、任務排程

3. **時間複雜度**
   - Stack 的所有基本操作: O(1)
   - Queue 使用 deque: O(1)
   - Queue 使用 list.pop(0): O(n) ❌

4. **進階技巧**
   - 單調堆疊: 解決「下一個更大元素」類問題
   - 雙端佇列: 解決「滑動視窗最大值」類問題
   - 輔助堆疊: 實作額外功能（如 MinStack）

---

[← 回到 Module 3 目錄](./index.md)
