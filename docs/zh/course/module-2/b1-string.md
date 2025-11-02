# B1: 字串的奧秘 - String Mastery

:::tip 學習目標
- 理解 Python 字串的不可變性（immutability）
- 掌握字元與編碼（ord/chr/ASCII）
- 學會字串的分割與合併（split/join）
- 熟練使用格式化字串（f-strings）
- 掌握字串常見操作的時間複雜度
:::

## 📖 單元概覽

在模組一中，我們主要處理**數字**資料。但在真實世界中，大量資料是以**文字（字串）**形式存在的：
- 使用者輸入的文字
- 檔案中的資料
- 需要解析的格式化資料

本單元將深入探討字串在 APCS 中的應用，特別強調**效能**與**正確性**。

## 🔍 字串的本質

### 字串是不可變的（Immutable）

這是 Python 字串最關鍵的特性：

```python
s = "hello"
s[0] = "H"  # ❌ TypeError: 'str' object does not support item assignment
```

**為什麼這很重要？**

因為不可變性，以下操作會創建**新的字串物件**：

```python
s = "hello"
s = s + " world"  # 創建新字串，原本的 "hello" 不變
```

**效能影響**：

```python
# ❌ 錯誤做法：O(N²) 時間複雜度
result = ""
for char in data:
    result += char  # 每次都創建新字串！

# ✅ 正確做法：O(N) 時間複雜度
result = "".join(data)  # 一次性合併
```

:::danger 效能陷阱
絕對不要在迴圈中使用 `+=` 來累積字串！  
必須使用 `list` 收集，最後用 `join()` 合併。
:::

---

## 🔤 字元與編碼

### ASCII 碼與字元轉換

在 APCS 中，經常需要在字元與數字之間轉換：

```python
# 字元 → ASCII 碼
print(ord('A'))  # 65
print(ord('a'))  # 97
print(ord('0'))  # 48

# ASCII 碼 → 字元
print(chr(65))   # 'A'
print(chr(97))   # 'a'
print(chr(48))   # '0'
```

**重要的 ASCII 碼範圍**：

| 字元範圍 | ASCII 碼範圍 | 說明 |
|---------|-------------|------|
| '0'-'9' | 48-57 | 數字字元 |
| 'A'-'Z' | 65-90 | 大寫字母 |
| 'a'-'z' | 97-122 | 小寫字母 |

**常見應用**：

```python
# 判斷字元類型
def is_digit(c):
    return '0' <= c <= '9'
    # 或：return 48 <= ord(c) <= 57

def is_upper(c):
    return 'A' <= c <= 'Z'

def is_lower(c):
    return 'a' <= c <= 'z'

# 大小寫轉換
def to_upper(c):
    if 'a' <= c <= 'z':
        return chr(ord(c) - 32)  # 'a' - 'A' = 32
    return c

def to_lower(c):
    if 'A' <= c <= 'Z':
        return chr(ord(c) + 32)
    return c
```

**APCS 應用範例：凱薩密碼**

```python
def caesar_cipher(s, shift):
    """將字串 s 中的每個字母向後移動 shift 位"""
    result = []
    for c in s:
        if 'a' <= c <= 'z':
            # 小寫字母
            new_char = chr((ord(c) - ord('a') + shift) % 26 + ord('a'))
            result.append(new_char)
        elif 'A' <= c <= 'Z':
            # 大寫字母
            new_char = chr((ord(c) - ord('A') + shift) % 26 + ord('A'))
            result.append(new_char)
        else:
            # 非字母字元保持不變
            result.append(c)
    return ''.join(result)

# 測試
print(caesar_cipher("Hello, World!", 3))  # "Khoor, Zruog!"
```

---

## ✂️ 字串的分割與合併

### split() - 分割字串

```python
# 基本用法：依空白字元分割
s = "apple banana cherry"
words = s.split()  # ['apple', 'banana', 'cherry']

# 指定分隔符號
s = "2024-01-15"
parts = s.split("-")  # ['2024', '01', '15']

# 限制分割次數
s = "a,b,c,d,e"
parts = s.split(",", 2)  # ['a', 'b', 'c,d,e']
```

**APCS 常見用法**：

```python
# 讀取多個整數
line = input()
numbers = list(map(int, line.split()))

# 讀取格式化資料
data = "John,25,Male"
name, age, gender = data.split(",")
age = int(age)
```

### join() - 合併字串

```python
# 基本用法
words = ['apple', 'banana', 'cherry']
result = " ".join(words)  # "apple banana cherry"

# 合併成 CSV
data = ['John', '25', 'Male']
csv_line = ",".join(data)  # "John,25,Male"

# 合併數字（需要先轉成字串）
numbers = [1, 2, 3, 4]
result = ",".join(map(str, numbers))  # "1,2,3,4"
```

**效能比較**：

```python
import time

# ❌ 方法一：使用 += （慢）
def concat_with_plus(words):
    result = ""
    for word in words:
        result += word + " "
    return result

# ✅ 方法二：使用 join （快）
def concat_with_join(words):
    return " ".join(words)

words = ["word"] * 10000

start = time.time()
concat_with_plus(words)
print(f"Method 1: {time.time() - start:.4f}s")  # ~0.5s

start = time.time()
concat_with_join(words)
print(f"Method 2: {time.time() - start:.4f}s")  # ~0.001s
```

---

## 📝 格式化字串

### f-strings（推薦）

Python 3.6+ 引入的 f-strings 是最簡潔、最快的字串格式化方法：

```python
name = "Alice"
age = 25
score = 95.5

# 基本用法
print(f"Name: {name}, Age: {age}")

# 運算式
print(f"Next year: {age + 1}")

# 格式控制
print(f"Score: {score:.1f}")  # 小數點後 1 位

# 對齊與填充
print(f"{name:>10}")   # 右對齊，總寬度 10
print(f"{age:03d}")    # 左邊補 0，總寬度 3
```

**常見格式化**：

```python
# 整數
x = 42
print(f"{x:5d}")    # "   42" (寬度 5，右對齊)
print(f"{x:05d}")   # "00042" (寬度 5，左邊補 0)

# 浮點數
pi = 3.141592653
print(f"{pi:.2f}")  # "3.14" (小數點後 2 位)
print(f"{pi:8.2f}") # "    3.14" (總寬度 8，小數點後 2 位)

# 百分比
ratio = 0.856
print(f"{ratio:.1%}")  # "85.6%"
```

---

## 🛠️ 常見字串操作

### 基本方法

```python
s = "Hello World"

# 長度
len(s)  # 11

# 索引與切片（與 list 相同）
s[0]    # 'H'
s[-1]   # 'd'
s[0:5]  # 'Hello'
s[::-1] # 'dlroW olleH' (反轉)

# 搜尋
s.find("World")     # 6 (找不到回傳 -1)
s.index("World")    # 6 (找不到會拋出 ValueError)
"World" in s        # True

# 替換
s.replace("World", "Python")  # 'Hello Python'

# 大小寫
s.upper()   # 'HELLO WORLD'
s.lower()   # 'hello world'
s.title()   # 'Hello World'

# 去除空白
s = "  hello  "
s.strip()   # 'hello'
s.lstrip()  # 'hello  '
s.rstrip()  # '  hello'

# 判斷
s.startswith("Hello")  # True
s.endswith("World")    # True
s.isdigit()            # False
s.isalpha()            # False (因為有空白)
```

### 時間複雜度

| 操作 | 時間複雜度 | 說明 |
|------|-----------|------|
| len(s) | O(1) | 長度已緩存 |
| s[i] | O(1) | 索引存取 |
| s[i:j] | O(j-i) | 複製子字串 |
| s.find(sub) | O(N×M) | 最壞情況 |
| s.replace(old, new) | O(N×M) | 最壞情況 |
| s.split() | O(N) | 遍歷一次 |
| "".join(lst) | O(N) | N 為總字元數 |
| s + t | O(N+M) | 創建新字串 |

---

## 💡 Python 特色技巧

### 字串乘法

```python
# 重複字串
print("-" * 20)  # "--------------------"
print("abc" * 3) # "abcabcabc"

# 初始化字串陣列（要小心！）
row = "0" * 5    # "00000" ✅ 可以
```

### 字串是可迭代的

```python
s = "hello"

# 直接迭代
for char in s:
    print(char)

# enumerate
for i, char in enumerate(s):
    print(f"{i}: {char}")

# 列表推導式
vowels = [c for c in s if c in "aeiou"]  # ['e', 'o']
```

---

## 📝 實戰範例

### 範例 1：回文判斷

```python
def is_palindrome(s):
    """判斷字串是否為回文（忽略大小寫）"""
    s = s.lower()
    return s == s[::-1]

# 測試
print(is_palindrome("Madam"))  # True
print(is_palindrome("Hello"))  # False
```

### 範例 2：字串壓縮

```python
def compress_string(s):
    """
    將連續重複的字元壓縮為「字元+次數」
    例如："aaabbc" → "a3b2c1"
    """
    if not s:
        return ""
    
    result = []
    count = 1
    prev = s[0]
    
    for i in range(1, len(s)):
        if s[i] == prev:
            count += 1
        else:
            result.append(f"{prev}{count}")
            prev = s[i]
            count = 1
    
    # 處理最後一組
    result.append(f"{prev}{count}")
    
    return "".join(result)

# 測試
print(compress_string("aaabbc"))     # "a3b2c1"
print(compress_string("aabbccdd"))   # "a2b2c2d2"
```

### 範例 3：字串中的數字提取與計算

```python
def extract_and_sum(s):
    """
    從字串中提取所有數字並求和
    例如："a1b2c3" → 6
    """
    total = 0
    current_num = ""
    
    for char in s:
        if char.isdigit():
            current_num += char
        else:
            if current_num:
                total += int(current_num)
                current_num = ""
    
    # 處理最後的數字
    if current_num:
        total += int(current_num)
    
    return total

# 測試
print(extract_and_sum("a1b2c3"))      # 6
print(extract_and_sum("12abc34"))     # 46
```

---

## 🧪 互動練習

### Quiz 1: 字元轉換

<details>
<summary>❓ 問題</summary>

編寫函式，將字串中的每個小寫字母轉為大寫，大寫字母轉為小寫，其他字元不變。

範例：
- 輸入："Hello World 123"
- 輸出："hELLO wORLD 123"

</details>

<details>
<summary>✅ 解答</summary>

```python
def swap_case(s):
    result = []
    for char in s:
        if 'a' <= char <= 'z':
            result.append(chr(ord(char) - 32))
        elif 'A' <= char <= 'Z':
            result.append(chr(ord(char) + 32))
        else:
            result.append(char)
    return "".join(result)

# 測試
print(swap_case("Hello World 123"))  # "hELLO wORLD 123"
```

**也可以使用 Python 內建方法**：
```python
def swap_case(s):
    return s.swapcase()
```

</details>

---

### Quiz 2: 效能陷阱

<details>
<summary>❓ 問題</summary>

以下兩段程式碼哪個更快？為什麼？

**方法 A**：
```python
result = ""
for i in range(1000):
    result += str(i)
```

**方法 B**：
```python
parts = []
for i in range(1000):
    parts.append(str(i))
result = "".join(parts)
```

</details>

<details>
<summary>✅ 解答</summary>

**方法 B 快得多！**

**原因**：
- 方法 A：每次 `+=` 都創建新字串，時間複雜度 **O(N²)**
- 方法 B：收集到 list 再 join，時間複雜度 **O(N)**

對於 N=1000：
- 方法 A：約 500,000 次字元複製
- 方法 B：約 5,000 次字元複製

**APCS 考試提示**：處理大量字串時，永遠使用 join！

</details>

---

### Quiz 3: 字串解析

<details>
<summary>❓ 問題</summary>

給定字串格式 "name:age:score"，請解析並計算所有人的平均分數。

範例輸入：
```
Alice:20:85
Bob:22:90
Charlie:21:88
```

輸出：
```
87.67
```

</details>

<details>
<summary>✅ 解答</summary>

```python
def calculate_average():
    total = 0
    count = 0
    
    while True:
        try:
            line = input()
            parts = line.split(":")
            score = int(parts[2])
            total += score
            count += 1
        except EOFError:
            break
    
    if count == 0:
        return 0
    
    return total / count

# 更簡潔的版本（使用 sys.stdin）
import sys

def calculate_average_v2():
    scores = []
    for line in sys.stdin:
        parts = line.strip().split(":")
        scores.append(int(parts[2]))
    
    return sum(scores) / len(scores) if scores else 0
```

</details>

---

### Quiz 4: 字串反轉（不使用切片）

<details>
<summary>❓ 問題</summary>

不使用 Python 的切片功能 `s[::-1]`，請實作字串反轉。

</details>

<details>
<summary>✅ 解答</summary>

```python
def reverse_string(s):
    """方法一：使用 list"""
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    
    return "".join(chars)

def reverse_string_v2(s):
    """方法二：從後往前迭代"""
    result = []
    for i in range(len(s) - 1, -1, -1):
        result.append(s[i])
    return "".join(result)

# 測試
print(reverse_string("hello"))   # "olleh"
print(reverse_string_v2("hello"))  # "olleh"
```

**時間複雜度**：O(N)  
**空間複雜度**：O(N)

</details>

---

### Quiz 5: 最長連續重複字元

<details>
<summary>❓ 問題</summary>

找出字串中最長的連續重複字元及其長度。

範例：
- 輸入："aaabbaaaacc"
- 輸出：('a', 4)

</details>

<details>
<summary>✅ 解答</summary>

```python
def longest_consecutive(s):
    if not s:
        return ('', 0)
    
    max_char = s[0]
    max_count = 1
    
    current_char = s[0]
    current_count = 1
    
    for i in range(1, len(s)):
        if s[i] == current_char:
            current_count += 1
        else:
            # 檢查是否更新最大值
            if current_count > max_count:
                max_count = current_count
                max_char = current_char
            
            # 重設當前追蹤
            current_char = s[i]
            current_count = 1
    
    # 檢查最後一組
    if current_count > max_count:
        max_count = current_count
        max_char = current_char
    
    return (max_char, max_count)

# 測試
print(longest_consecutive("aaabbaaaacc"))  # ('a', 4)
print(longest_consecutive("aabbcc"))       # ('a', 2)
```

**時間複雜度**：O(N)  
**空間複雜度**：O(1)

</details>

---

## 🔗 推薦練習題

### ZeroJudge 題目

<div class="problem-links">

- [a004: 文字加密](https://zerojudge.tw/ShowProblem?problemid=a004) - 凱薩密碼變體
- [a024: 最大公約數(GCD)](https://zerojudge.tw/ShowProblem?problemid=a024) - 字串解析
- [d151: 中文字母轉換](https://zerojudge.tw/ShowProblem?problemid=d151) - ord/chr 應用
- [h034: 三角形判斷](https://zerojudge.tw/ShowProblem?problemid=h034) - 字串輸入處理

</div>

### 學習建議

1. **先理解不可變性**：這是最重要的概念
2. **熟練 split/join**：APCS 中會大量使用
3. **記住 ord/chr**：字元轉換的基礎
4. **使用 f-strings**：簡潔且高效
5. **注意效能**：避免在迴圈中使用 `+=`

---

## 📊 單元總結

### 關鍵概念

1. **字串不可變**：所有修改都會創建新字串
2. **join vs +=**：`join()` 比迴圈 `+=` 快得多
3. **ord/chr**：字元與 ASCII 碼的轉換
4. **split/join**：處理格式化資料的標準工具
5. **f-strings**：現代化的字串格式化方法

### 效能檢查清單

- [ ] 不在迴圈中使用 `+=` 累積字串
- [ ] 使用 `"".join(list)` 合併大量字串
- [ ] 了解字串操作的時間複雜度
- [ ] 熟悉 `split()` 和 `join()` 的使用

### 進入下一單元前

確認你已經：
- [ ] 理解字串的不可變性
- [ ] 能使用 ord/chr 進行字元轉換
- [ ] 熟練使用 split/join
- [ ] 知道何時使用 f-strings
- [ ] 完成所有 Quiz

---

<div class="nav-buttons">

[← 回到模組二總覽](/zh/course/module-2/)
[下一單元：B2 二維陣列 →](/zh/course/module-2/b2-2d-array)

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
