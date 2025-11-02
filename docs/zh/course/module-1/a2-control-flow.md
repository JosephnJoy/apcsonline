# A2: 邏輯的骨架：精通條件判斷與迴圈

:::tip 單元目標
- 精通 if/elif/else 條件判斷
- 掌握 for 和 while 迴圈
- 理解巢狀結構的執行流程
- 學會使用 break、continue 和 else 子句
:::

## 為什麼條件判斷與迴圈是核心？

程式設計的本質在於將現實世界的規則與流程，轉化為電腦可以執行的指令。**選擇（Selection）**與**重複（Repetition）**結構，是構建這些邏輯流程的基石。

在 APCS 中，無論是簡單的數字判斷，還是複雜的流程模擬，都離不開這兩種基本結構的精確掌握。能夠正確地追蹤程式執行流程，是應對「程式識讀」題型的關鍵能力。

## 概念基礎

### 程式設計的三大基本結構

1. **循序（Sequence）**：程式碼按照順序逐行執行
2. **選擇（Selection）**：根據條件決定執行哪段程式碼
3. **重複（Repetition）**：重複執行某段程式碼

### 布林邏輯（Boolean Logic）

在進行條件判斷前，必須理解布林運算：

```python
# 比較運算子
a == b    # 等於
a != b    # 不等於
a > b     # 大於
a < b     # 小於
a >= b    # 大於等於
a <= b    # 小於等於

# 邏輯運算子
and       # 且（兩者都為真）
or        # 或（至少一個為真）
not       # 非（反轉布林值）
```

**真值表**：

| A | B | A and B | A or B |
|---|---|---------|--------|
| True | True | True | True |
| True | False | False | True |
| False | True | False | True |
| False | False | False | False |

## Python 實踐

### 1. 條件判斷（Selection）

#### 基本 if 語句

```python
age = 18

if age >= 18:
    print("成年人")
```

#### if-else 語句

```python
score = 75

if score >= 60:
    print("及格")
else:
    print("不及格")
```

#### if-elif-else 語句（多重條件）

```python
score = 85

if score >= 90:
    print("優秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

:::tip 效率提示
使用 `elif` 而非多個獨立的 `if`，因為一旦某個條件成立，後續的條件就不會被檢查，效率更高。
:::

#### 巢狀條件判斷

```python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("可以開車")
    else:
        print("需要先考駕照")
else:
    print("年齡不足")
```

#### 複合條件

```python
temperature = 25
is_raining = False

# 使用 and
if temperature > 20 and not is_raining:
    print("適合出門")

# 使用 or
if temperature < 10 or temperature > 35:
    print("極端天氣")
```

### 2. 迴圈結構（Repetition）

#### for 迴圈與 range()

```python
# 基本用法：印出 0 到 4
for i in range(5):
    print(i)
# 輸出: 0 1 2 3 4

# 指定起始值：從 1 到 5
for i in range(1, 6):
    print(i)
# 輸出: 1 2 3 4 5

# 指定步長：印出偶數
for i in range(0, 10, 2):
    print(i)
# 輸出: 0 2 4 6 8

# 倒數計數
for i in range(10, 0, -1):
    print(i)
# 輸出: 10 9 8 7 6 5 4 3 2 1
```

:::warning 常見錯誤：差一錯誤（Off-by-One Error）
`range(5)` 產生的是 0, 1, 2, 3, 4，**不包含 5**！  
`range(1, n+1)` 才會產生 1 到 n。
:::

#### 遍歷容器

```python
# 遍歷列表
fruits = ["蘋果", "香蕉", "橘子"]
for fruit in fruits:
    print(fruit)

# 遍歷字串（每個字元）
word = "Python"
for char in word:
    print(char)

# 同時取得索引和值
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 輸出:
# 0: 蘋果
# 1: 香蕉
# 2: 橘子
```

#### while 迴圈

```python
# 基本用法
count = 0
while count < 5:
    print(count)
    count += 1

# 讀取輸入直到特定條件
import sys
total = 0
line = sys.stdin.readline().strip()
while line != "end":
    total += int(line)
    line = sys.stdin.readline().strip()
print(total)
```

:::tip 何時使用 for vs while
- **for 迴圈**：知道確切的迭代次數時使用
- **while 迴圈**：迭代次數由條件決定時使用
:::

### 3. 進階流程控制

#### break：跳出迴圈

```python
# 找到目標後立即停止
numbers = [3, 7, 1, 9, 4, 2]
target = 9

for num in numbers:
    if num == target:
        print(f"找到目標: {num}")
        break
    print(f"檢查: {num}")

# 輸出:
# 檢查: 3
# 檢查: 7
# 檢查: 1
# 找到目標: 9
```

#### continue：跳過當前迭代

```python
# 只印出偶數
for i in range(10):
    if i % 2 != 0:  # 如果是奇數
        continue    # 跳過後續程式碼，進入下一次迭代
    print(i)

# 輸出: 0 2 4 6 8
```

#### for...else 與 while...else

Python 的獨特功能：**else 子句在迴圈正常結束時執行**（沒有被 break 中斷）。

```python
# 搜尋範例
numbers = [3, 7, 1, 4, 2]
target = 9

for num in numbers:
    if num == target:
        print(f"找到 {target}")
        break
else:
    # 只有在迴圈完整跑完（沒有 break）時才執行
    print(f"找不到 {target}")

# 輸出: 找不到 9
```

**實際應用**：檢查質數

```python
def is_prime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False  # 找到因數，不是質數
    else:
        return True  # 沒找到因數，是質數

print(is_prime(17))  # True
print(is_prime(18))  # False
```

### 4. 巢狀迴圈

#### 二維遍歷

```python
# 印出乘法表
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i} x {j} = {i*j:2}", end="  ")
    print()  # 換行
```

#### 模式列印

```python
# 印出直角三角形
n = 5
for i in range(1, n+1):
    for j in range(i):
        print("*", end="")
    print()

# 輸出:
# *
# **
# ***
# ****
# *****
```

## 完整範例程式

### 範例 1：判斷閏年

```python
import sys

year = int(sys.stdin.readline())

# 閏年規則：
# 1. 能被 4 整除且不能被 100 整除
# 2. 或能被 400 整除
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("閏年")
else:
    print("平年")
```

### 範例 2：計算 1 到 N 的總和

```python
import sys

n = int(sys.stdin.readline())

# 方法一：使用 for 迴圈
total = 0
for i in range(1, n+1):
    total += i
print(total)

# 方法二：使用數學公式（更高效）
total = n * (n + 1) // 2
print(total)
```

### 範例 3：找出最大值與最小值

```python
import sys

n = int(sys.stdin.readline())
numbers = list(map(int, sys.stdin.readline().split()))

# 方法一：使用內建函式
max_val = max(numbers)
min_val = min(numbers)

# 方法二：手動遍歷
max_val = numbers[0]
min_val = numbers[0]

for num in numbers:
    if num > max_val:
        max_val = num
    if num < min_val:
        min_val = num

print(f"最大值: {max_val}")
print(f"最小值: {min_val}")
```

### 範例 4：計數問題

```python
import sys

# 統計 1 到 100 中有多少個數字包含數字 7
count = 0
for i in range(1, 101):
    # 檢查數字中是否包含 7
    if '7' in str(i):
        count += 1

print(count)  # 19
```

### 範例 5：巢狀迴圈實作

```python
import sys

# 讀取 n x m 的矩陣並計算每行的總和
n, m = map(int, sys.stdin.readline().split())

for i in range(n):
    row = list(map(int, sys.stdin.readline().split()))
    row_sum = 0
    for num in row:
        row_sum += num
    print(f"第 {i+1} 行總和: {row_sum}")
```

## APCS 策略與應用

### 對應評量項目

- **程式識讀**：選擇結構、重複結構
- **實作題**：條件判斷與迴圈（1-2 級分必備）

### 常見題型

1. **條件判斷**：根據多個條件輸出不同結果
2. **計數問題**：統計符合條件的數量
3. **尋找問題**：找出最大、最小、特定值
4. **模擬問題**：模擬特定流程或規則
5. **模式生成**：產生特定的數字或符號模式

### 程式碼追蹤技巧

在「程式識讀」題型中，經常需要追蹤變數值的變化：

```python
# 追蹤範例
x = 0
for i in range(3):
    for j in range(2):
        x += i + j
        print(f"i={i}, j={j}, x={x}")

# 逐步追蹤:
# i=0, j=0, x=0
# i=0, j=1, x=1
# i=1, j=0, x=2
# i=1, j=1, x=4
# i=2, j=0, x=6
# i=2, j=1, x=8
```

**技巧**：
1. 準備紙筆，建立變數追蹤表
2. 逐行執行程式碼
3. 記錄每次迭代後變數的值
4. 特別注意迴圈的起始、結束條件

## 📝 Quiz：測試你的理解

<div class="quiz-container">

### 問題 1
以下程式碼會輸出什麼？
```python
for i in range(5):
    if i == 3:
        break
    print(i)
```

A. 0 1 2 3  
B. 0 1 2  
C. 0 1 2 3 4  
D. 3 4

<details>
<summary>點擊查看解答</summary>

**答案：B**

**解析**：  
迴圈執行到 i=3 時，if 條件成立，執行 break 跳出迴圈。因此只會印出 0、1、2。

</details>

---

### 問題 2
以下程式碼會輸出什麼？
```python
count = 0
for i in range(1, 6):
    if i % 2 == 0:
        count += 1
print(count)
```

A. 2  
B. 3  
C. 4  
D. 5

<details>
<summary>點擊查看解答</summary>

**答案：A**

**解析**：  
range(1, 6) 產生 1, 2, 3, 4, 5。其中偶數有 2 和 4，所以 count 會累加 2 次，最終輸出 2。

</details>

---

### 問題 3
以下哪個程式碼片段可以正確印出 1 到 10（包含 10）？

A. `for i in range(10): print(i)`  
B. `for i in range(1, 10): print(i)`  
C. `for i in range(1, 11): print(i)`  
D. `for i in range(10, 1): print(i)`

<details>
<summary>點擊查看解答</summary>

**答案：C**

**解析**：  
- A: 印出 0 到 9
- B: 印出 1 到 9
- C: ✅ 印出 1 到 10
- D: 不會印出任何東西（起始大於結束）

記住：range 的結束值是**不包含**的！

</details>

---

### 問題 4
以下程式碼執行後，x 的值是多少？
```python
x = 0
for i in range(3):
    for j in range(2):
        x += 1
```

A. 3  
B. 5  
C. 6  
D. 9

<details>
<summary>點擊查看解答</summary>

**答案：C**

**解析**：  
外層迴圈執行 3 次，內層迴圈每次執行 2 次，所以 x += 1 總共執行 3 × 2 = 6 次。

</details>

---

### 問題 5
for...else 的 else 區塊什麼時候執行？

A. 迴圈至少執行一次後  
B. 迴圈被 break 中斷時  
C. 迴圈正常結束（沒有被 break）時  
D. 迴圈內出現錯誤時

<details>
<summary>點擊查看解答</summary>

**答案：C**

**解析**：  
for...else 的 else 區塊只在迴圈**正常結束**時執行。如果迴圈被 break 中斷，else 區塊不會執行。這是 Python 的獨特特性，常用於「搜尋失敗」的情況。

</details>

</div>

## 🔗 推薦習題

### 基礎練習

<div class="problem-links">

[g275: 七言對聯](https://zerojudge.tw/ShowProblem?problemid=g275)

[h026: 猜拳](https://zerojudge.tw/ShowProblem?problemid=h026)

</div>

### 練習重點
1. 使用 if-elif-else 處理多種情況
2. 練習巢狀迴圈
3. 追蹤變數在迴圈中的變化
4. 使用 break 和 continue 優化邏輯

:::tip 學習建議
完成這些題目後，確保你能夠：
- [ ] 不假思索地寫出正確的條件判斷
- [ ] 準確使用 range() 的三個參數
- [ ] 快速追蹤巢狀迴圈的執行流程
- [ ] 知道何時使用 break、continue、else
:::

## 💡 實戰技巧總結

### 條件判斷最佳實踐

1. **優先處理特殊情況**：將特殊情況放在前面判斷
2. **使用 elif 而非多個 if**：提高效率
3. **複雜條件要清晰**：必要時使用括號明確優先順序
4. **避免過深的巢狀**：超過 3 層巢狀時考慮重構

### 迴圈使用指南

1. **for 迴圈優先**：次數確定時使用 for
2. **注意 range 的範圍**：記住結束值不包含
3. **善用 enumerate**：需要索引時使用
4. **適時使用 break**：找到答案就停止，不浪費時間

### 除錯技巧

```python
# 除錯時加入追蹤輸出
for i in range(3):
    print(f"DEBUG: i = {i}")  # 追蹤變數
    # ... 你的程式碼 ...
```

---

## 下一步

掌握了條件判斷與迴圈後，我們將學習如何處理批量資料：

[前往 A3：一維陣列 (List) →](/zh/course/module-1/a3-list)

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
  margin: 1rem 0;
}
</style>
