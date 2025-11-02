# B3: 函式與模組化 - Functions & Modularity

:::tip 學習目標
- 理解函式的本質與作用
- 掌握函式的定義、呼叫與參數傳遞
- 理解 Python 的「傳物件參考」機制
- 學會使用預設參數、可變參數、關鍵字參數
- 掌握變數的作用域（Scope）
- 理解遞迴函式的基礎概念
:::

## 📖 單元概覽

在前面的單元中，我們的程式碼都是「從上到下」執行的流程。但隨著程式變得越來越複雜，我們需要一種方法來：
- **組織程式碼**：將相關的程式碼組合在一起
- **重複使用**：避免寫重複的程式碼
- **抽象化**：隱藏實作細節，專注於功能

**函式（Function）**就是實現這些目標的核心工具。

在 APCS 中，合理使用函式不僅能讓程式碼更清晰，也能大幅提高除錯效率。

## 🎯 函式的本質

### 什麼是函式？

函式是一段「**可重複使用的程式碼片段**」，它：
1. 有一個**名稱**
2. 可以接收**輸入**（參數）
3. 可以產生**輸出**（回傳值）
4. 執行特定的**任務**

**類比**：函式就像一台機器
- 輸入原料（參數）
- 執行加工（函式內部的程式碼）
- 輸出產品（回傳值）

### 基本語法

```python
def function_name(parameter1, parameter2):
    """這是函式的說明文件（docstring）"""
    # 函式內部的程式碼
    result = parameter1 + parameter2
    return result  # 回傳結果

# 呼叫函式
output = function_name(10, 20)
print(output)  # 30
```

---

## 🔧 函式的定義與呼叫

### 無參數、無回傳值

```python
def greet():
    """顯示問候訊息"""
    print("Hello, World!")

greet()  # 呼叫函式
```

### 有參數、無回傳值

```python
def greet_person(name):
    """顯示個人化問候訊息"""
    print(f"Hello, {name}!")

greet_person("Alice")  # Hello, Alice!
greet_person("Bob")    # Hello, Bob!
```

### 有參數、有回傳值

```python
def add(a, b):
    """計算兩數之和"""
    return a + b

result = add(10, 20)
print(result)  # 30

# 也可以直接使用回傳值
print(add(5, 7))  # 12
```

### 多個回傳值

```python
def get_min_max(numbers):
    """回傳數列的最小值和最大值"""
    return min(numbers), max(numbers)

# 接收多個回傳值
minimum, maximum = get_min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(minimum, maximum)  # 1 9
```

---

## 📦 參數傳遞機制

### Python 的「傳物件參考」

Python 使用「**Call by Object Reference**」的機制：
- 傳遞的是物件的**參考（reference）**
- 對於**不可變物件**（int, str, tuple），行為像「傳值」
- 對於**可變物件**（list, dict, set），行為像「傳參考」

### 不可變物件：行為像傳值

```python
def modify_number(x):
    x = x + 10  # 創建新物件，不影響原本的變數
    print(f"函式內：x = {x}")

num = 5
modify_number(num)  # 函式內：x = 15
print(f"函式外：num = {num}")  # 函式外：num = 5
```

### 可變物件：行為像傳參考

```python
def modify_list(lst):
    lst.append(100)  # 直接修改原本的 list
    print(f"函式內：{lst}")

my_list = [1, 2, 3]
modify_list(my_list)  # 函式內：[1, 2, 3, 100]
print(f"函式外：{my_list}")  # 函式外：[1, 2, 3, 100]
```

:::warning 重要！
當函式的參數是 list、dict 等可變物件時，在函式內部的修改**會影響到外部**！

如果不想修改原本的物件，請在函式內部先複製：
```python
def safe_modify_list(lst):
    new_lst = lst.copy()  # 或 lst[:]
    new_lst.append(100)
    return new_lst
```
:::

---

## 🛠️ 進階參數技巧

### 預設參數

```python
def greet(name, greeting="Hello"):
    """問候訊息，預設為 'Hello'"""
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Charlie", "Hey")     # Hey, Charlie!
```

:::danger 可變預設參數陷阱
絕對不要使用可變物件作為預設參數！

```python
# ❌ 錯誤做法
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] ← 😱 預期是 [2]！

# ✅ 正確做法
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```
:::

### 關鍵字參數

```python
def create_user(name, age, city):
    print(f"Name: {name}, Age: {age}, City: {city}")

# 位置參數
create_user("Alice", 25, "Taipei")

# 關鍵字參數（順序可以不同）
create_user(age=30, city="Taichung", name="Bob")

# 混合使用（位置參數必須在前）
create_user("Charlie", city="Kaohsiung", age=28)
```

### 可變長度參數

```python
# *args：收集位置參數為 tuple
def sum_all(*numbers):
    """計算任意數量數字的總和"""
    return sum(numbers)

print(sum_all(1, 2, 3))        # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs：收集關鍵字參數為 dict
def print_info(**info):
    """顯示任意數量的資訊"""
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Taipei")
# name: Alice
# age: 25
# city: Taipei
```

---

## 🌐 變數的作用域（Scope）

### 局部變數 vs 全域變數

```python
x = 100  # 全域變數

def test():
    x = 50  # 局部變數（與全域變數無關）
    print(f"函式內：x = {x}")

test()  # 函式內：x = 50
print(f"函式外：x = {x}")  # 函式外：x = 100
```

### 存取全域變數

```python
count = 0  # 全域變數

def increment():
    global count  # 聲明要修改全域變數
    count += 1

increment()
increment()
print(count)  # 2
```

:::tip 最佳實踐
盡量避免使用全域變數！

更好的做法是使用函式的參數和回傳值：
```python
def increment(count):
    return count + 1

count = 0
count = increment(count)
count = increment(count)
print(count)  # 2
```
:::

### LEGB 規則

Python 查找變數的順序：
1. **L**ocal（局部）：函式內部
2. **E**nclosing（封閉）：外層函式
3. **G**lobal（全域）：模組層級
4. **B**uilt-in（內建）：Python 內建名稱

```python
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # local
    
    inner()
    print(x)  # enclosing

outer()
print(x)  # global
```

---

## 🔄 遞迴函式入門

### 什麼是遞迴？

**遞迴（Recursion）**是函式呼叫自己的技巧。

**結構**：
1. **基礎情況（Base Case）**：遞迴的終止條件
2. **遞迴步驟（Recursive Step）**：呼叫自己處理更小的問題

### 範例：階乘

```python
def factorial(n):
    """計算 n! = n × (n-1) × ... × 1"""
    # 基礎情況
    if n == 0 or n == 1:
        return 1
    
    # 遞迴步驟
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

**執行過程**：
```
factorial(5)
= 5 × factorial(4)
= 5 × 4 × factorial(3)
= 5 × 4 × 3 × factorial(2)
= 5 × 4 × 3 × 2 × factorial(1)
= 5 × 4 × 3 × 2 × 1
= 120
```

### 範例：費波那契數列

```python
def fibonacci(n):
    """回傳第 n 個費波那契數"""
    # 基礎情況
    if n <= 1:
        return n
    
    # 遞迴步驟
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(6))  # 8
# 數列：0, 1, 1, 2, 3, 5, 8
```

:::warning 遞迴的效能問題
上面的費波那契函式會重複計算相同的值，效率很差！

在模組四的 D2 單元中，我們會學習使用「動態規劃」來優化。
:::

---

## 💡 實戰範例

### 範例 1：判斷質數

```python
def is_prime(n):
    """判斷 n 是否為質數"""
    if n < 2:
        return False
    
    if n == 2:
        return True
    
    if n % 2 == 0:
        return False
    
    # 只需檢查到 sqrt(n)
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2  # 只檢查奇數
    
    return True

# 測試
print(is_prime(17))  # True
print(is_prime(20))  # False
```

### 範例 2：字串反轉（遞迴）

```python
def reverse_string(s):
    """使用遞迴反轉字串"""
    # 基礎情況
    if len(s) <= 1:
        return s
    
    # 遞迴步驟
    return reverse_string(s[1:]) + s[0]

print(reverse_string("hello"))  # "olleh"
```

**執行過程**：
```
reverse_string("hello")
= reverse_string("ello") + "h"
= reverse_string("llo") + "e" + "h"
= reverse_string("lo") + "l" + "e" + "h"
= reverse_string("o") + "l" + "l" + "e" + "h"
= "o" + "l" + "l" + "e" + "h"
= "olleh"
```

### 範例 3：找出陣列的最大值（遞迴）

```python
def find_max(arr, start, end):
    """
    在 arr[start:end+1] 中找最大值
    使用分治法（Divide and Conquer）
    """
    # 基礎情況：只有一個元素
    if start == end:
        return arr[start]
    
    # 分治：分成左右兩半
    mid = (start + end) // 2
    left_max = find_max(arr, start, mid)
    right_max = find_max(arr, mid + 1, end)
    
    # 合併
    return max(left_max, right_max)

# 測試
arr = [3, 7, 2, 9, 1, 5]
print(find_max(arr, 0, len(arr) - 1))  # 9
```

---

## 🧪 互動練習

### Quiz 1: 函式參數

<details>
<summary>❓ 問題</summary>

以下程式碼的輸出是什麼？為什麼？

```python
def modify(lst):
    lst = lst + [4]
    print(f"函式內：{lst}")

my_list = [1, 2, 3]
modify(my_list)
print(f"函式外：{my_list}")
```

</details>

<details>
<summary>✅ 解答</summary>

**輸出**：
```
函式內：[1, 2, 3, 4]
函式外：[1, 2, 3]
```

**原因**：
- `lst = lst + [4]` 創建了一個**新的 list 物件**
- 這個新物件只存在於函式內部
- 原本的 `my_list` 沒有被修改

**如果想修改原本的 list**：
```python
def modify(lst):
    lst.append(4)  # 直接修改原物件
```

</details>

---

### Quiz 2: 預設參數陷阱

<details>
<summary>❓ 問題</summary>

以下程式碼有什麼問題？如何修正？

```python
def append_to_list(item, lst=[]):
    lst.append(item)
    return lst

print(append_to_list(1))
print(append_to_list(2))
print(append_to_list(3))
```

</details>

<details>
<summary>✅ 解答</summary>

**問題**：預設參數 `lst=[]` 只在函式定義時創建一次，所有呼叫共享同一個 list！

**輸出**（錯誤）：
```
[1]
[1, 2]  ← 預期是 [2]
[1, 2, 3]  ← 預期是 [3]
```

**修正方法**：
```python
def append_to_list(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(append_to_list(1))  # [1]
print(append_to_list(2))  # [2]
print(append_to_list(3))  # [3]
```

</details>

---

### Quiz 3: 遞迴追蹤

<details>
<summary>❓ 問題</summary>

以下遞迴函式計算什麼？請追蹤 `mystery(5)` 的執行過程。

```python
def mystery(n):
    if n == 0:
        return 0
    return n + mystery(n - 1)
```

</details>

<details>
<summary>✅ 解答</summary>

**功能**：計算 1 + 2 + ... + n（前 n 個正整數的和）

**追蹤 `mystery(5)`**：
```
mystery(5)
= 5 + mystery(4)
= 5 + 4 + mystery(3)
= 5 + 4 + 3 + mystery(2)
= 5 + 4 + 3 + 2 + mystery(1)
= 5 + 4 + 3 + 2 + 1 + mystery(0)
= 5 + 4 + 3 + 2 + 1 + 0
= 15
```

**時間複雜度**：O(N)  
**空間複雜度**：O(N)（遞迴呼叫堆疊）

</details>

---

### Quiz 4: 變數作用域

<details>
<summary>❓ 問題</summary>

以下程式碼的輸出是什麼？

```python
x = 10

def func1():
    x = 20
    print(f"func1: {x}")

def func2():
    print(f"func2: {x}")

func1()
func2()
print(f"global: {x}")
```

</details>

<details>
<summary>✅ 解答</summary>

**輸出**：
```
func1: 20
func2: 10
global: 10
```

**解釋**：
- `func1` 內的 `x = 20` 是局部變數，不影響全域
- `func2` 沒有局部變數 `x`，所以使用全域的 `x = 10`
- 全域的 `x` 從未被修改

</details>

---

### Quiz 5: 寫一個通用的函式

<details>
<summary>❓ 問題</summary>

寫一個函式 `apply_operation(numbers, operation)`，它接收：
- `numbers`：一個數字列表
- `operation`：一個函式

對 `numbers` 中的每個元素應用 `operation`，回傳新列表。

範例：
```python
def square(x):
    return x * x

result = apply_operation([1, 2, 3, 4], square)
print(result)  # [1, 4, 9, 16]
```

</details>

<details>
<summary>✅ 解答</summary>

```python
def apply_operation(numbers, operation):
    """對每個元素應用指定的操作"""
    result = []
    for num in numbers:
        result.append(operation(num))
    return result

# 使用列表推導式的簡潔版本
def apply_operation_v2(numbers, operation):
    return [operation(num) for num in numbers]

# 測試
def square(x):
    return x * x

def double(x):
    return x * 2

print(apply_operation([1, 2, 3, 4], square))   # [1, 4, 9, 16]
print(apply_operation([1, 2, 3, 4], double))   # [2, 4, 6, 8]

# 使用 lambda 表達式
print(apply_operation([1, 2, 3, 4], lambda x: x + 10))  # [11, 12, 13, 14]
```

**注意**：Python 內建的 `map()` 函式就是做這件事的：
```python
list(map(square, [1, 2, 3, 4]))  # [1, 4, 9, 16]
```

</details>

---

## 🔗 推薦練習題

### ZeroJudge 題目

<div class="problem-links">

- [a001: 哈囉](https://zerojudge.tw/ShowProblem?problemid=a001) - 基本函式練習
- [a005: Eva 的回家作業](https://zerojudge.tw/ShowProblem?problemid=a005) - 函式分解問題
- [a010: 因數分解](https://zerojudge.tw/ShowProblem?problemid=a010) - 質數判斷函式
- [c039: 00514 - Rails](https://zerojudge.tw/ShowProblem?problemid=c039) - 使用函式組織邏輯

</div>

### 學習建議

1. **寫註解**：為每個函式寫清楚的 docstring
2. **小而專一**：一個函式只做一件事
3. **避免副作用**：盡量使用參數和回傳值，而非全域變數
4. **測試邊界**：測試空輸入、極端值等情況
5. **重構**：當程式碼重複出現，就考慮抽取成函式

---

## 📊 單元總結

### 關鍵概念

1. **函式定義**：`def name(params): return result`
2. **參數傳遞**：Python 使用「傳物件參考」
3. **預設參數陷阱**：不要使用可變物件作為預設值
4. **變數作用域**：LEGB 規則（Local → Enclosing → Global → Built-in）
5. **遞迴基礎**：基礎情況 + 遞迴步驟

### 模組化設計檢查清單

- [ ] 函式有清楚的名稱和 docstring
- [ ] 每個函式只做一件事
- [ ] 避免使用全域變數
- [ ] 了解參數傳遞的行為（可變 vs 不可變）
- [ ] 遞迴有明確的終止條件

### 進入下一模組前

確認你已經：
- [ ] 能正確定義和呼叫函式
- [ ] 理解參數傳遞的機制
- [ ] 知道如何使用預設參數和可變參數
- [ ] 理解變數的作用域
- [ ] 能寫簡單的遞迴函式
- [ ] 完成所有 Quiz

---

<div class="nav-buttons">

[← B2: 二維陣列與矩陣運算](/zh/course/module-2/b2-2d-array)
[下一模組：模組三 →](/zh/course/module-3/)

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
