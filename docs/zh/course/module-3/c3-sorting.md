# C3: 排序與二分搜尋 (Sorting & Binary Search)

## 學習目標
- 理解常見排序演算法的原理和時間複雜度
- 掌握合併排序和快速排序的實作
- 學習二分搜尋及其變體
- 應用排序和搜尋解決實際問題

## 排序演算法概覽

### 比較型排序演算法

| 演算法 | 平均時間 | 最壞時間 | 空間複雜度 | 穩定性 |
|--------|---------|---------|-----------|--------|
| 冒泡排序 | O(n²) | O(n²) | O(1) | ✅ 穩定 |
| 選擇排序 | O(n²) | O(n²) | O(1) | ❌ 不穩定 |
| 插入排序 | O(n²) | O(n²) | O(1) | ✅ 穩定 |
| 合併排序 | O(n log n) | O(n log n) | O(n) | ✅ 穩定 |
| 快速排序 | O(n log n) | O(n²) | O(log n) | ❌ 不穩定 |
| 堆排序 | O(n log n) | O(n log n) | O(1) | ❌ 不穩定 |

::: tip 穩定性
穩定排序保證相等元素的相對順序不變。例如排序 `[(3, 'a'), (3, 'b'), (2, 'c')]`，穩定排序會保證 `(3, 'a')` 仍在 `(3, 'b')` 前面。
:::

## Python 內建排序

Python 使用 **Timsort**（結合合併排序和插入排序），是穩定排序。

```python
# sort() - 原地排序，修改原串列
arr = [3, 1, 4, 1, 5, 9, 2, 6]
arr.sort()
print(arr)  # [1, 1, 2, 3, 4, 5, 6, 9]

# sort() 反向排序
arr.sort(reverse=True)
print(arr)  # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted() - 返回新串列，不修改原串列
arr = [3, 1, 4, 1, 5]
new_arr = sorted(arr)
print(arr)      # [3, 1, 4, 1, 5] - 原串列不變
print(new_arr)  # [1, 1, 3, 4, 5]

# 使用 key 參數自定義排序
students = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
students.sort(key=lambda x: x[1], reverse=True)  # 按分數降序
print(students)
# [('Bob', 92), ('Alice', 85), ('Charlie', 78)]

# 多重排序條件
students = [('Alice', 85, 20), ('Bob', 85, 22), ('Charlie', 92, 21)]
students.sort(key=lambda x: (-x[1], x[2]))  # 先按分數降序，再按年齡升序
print(students)
# [('Charlie', 92, 21), ('Alice', 85, 20), ('Bob', 85, 22)]
```

## 合併排序 (Merge Sort)

### 原理
合併排序是一種**分治算法**：
1. **分割**: 將陣列分成兩半
2. **遞迴排序**: 對兩半分別排序
3. **合併**: 將兩個已排序的部分合併成一個有序陣列

### 實作

```python
def merge_sort(arr):
    """
    合併排序
    時間複雜度: O(n log n) - 所有情況
    空間複雜度: O(n)
    穩定性: 穩定
    """
    # 基礎情況：長度 0 或 1
    if len(arr) <= 1:
        return arr
    
    # 分割
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # 合併
    return merge(left, right)

def merge(left, right):
    """合併兩個已排序的陣列"""
    result = []
    i = j = 0
    
    # 比較並合併
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # 加入剩餘元素
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# 測試
arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]
```

### 原地合併排序（節省空間）

```python
def merge_sort_inplace(arr, left, right):
    """
    原地合併排序
    空間複雜度: O(n) - 仍需要臨時陣列
    """
    if left >= right:
        return
    
    mid = (left + right) // 2
    merge_sort_inplace(arr, left, mid)
    merge_sort_inplace(arr, mid + 1, right)
    merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """原地合併"""
    # 複製左右部分到臨時陣列
    left_arr = arr[left:mid+1]
    right_arr = arr[mid+1:right+1]
    
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# 測試
arr = [38, 27, 43, 3, 9, 82, 10]
merge_sort_inplace(arr, 0, len(arr) - 1)
print(arr)  # [3, 9, 10, 27, 38, 43, 82]
```

## 快速排序 (Quick Sort)

### 原理
快速排序也是**分治算法**：
1. **選擇基準 (Pivot)**: 選擇一個元素作為基準
2. **分區 (Partition)**: 將小於基準的元素移到左邊，大於的移到右邊
3. **遞迴排序**: 對左右兩部分分別排序

### 實作

```python
def quick_sort(arr):
    """
    快速排序
    平均時間複雜度: O(n log n)
    最壞時間複雜度: O(n²) - 當陣列已排序或逆序
    空間複雜度: O(log n) - 遞迴堆疊
    穩定性: 不穩定
    """
    if len(arr) <= 1:
        return arr
    
    # 選擇基準（這裡選中間元素）
    pivot = arr[len(arr) // 2]
    
    # 分區
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # 遞迴排序
    return quick_sort(left) + middle + quick_sort(right)

# 測試
arr = [38, 27, 43, 3, 9, 82, 10]
print(quick_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]
```

### 原地快速排序

```python
def quick_sort_inplace(arr, low, high):
    """
    原地快速排序
    空間複雜度: O(log n)
    """
    if low < high:
        # 分區並取得基準位置
        pi = partition(arr, low, high)
        
        # 遞迴排序左右兩部分
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    """
    Lomuto 分區方案
    選擇最右元素為基準
    """
    pivot = arr[high]
    i = low - 1  # 較小元素的索引
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # 將基準放到正確位置
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# 測試
arr = [38, 27, 43, 3, 9, 82, 10]
quick_sort_inplace(arr, 0, len(arr) - 1)
print(arr)  # [3, 9, 10, 27, 38, 43, 82]
```

### Hoare 分區方案（更高效）

```python
def partition_hoare(arr, low, high):
    """
    Hoare 分區方案
    通常比 Lomuto 方案更高效（交換次數更少）
    """
    pivot = arr[low]
    i = low - 1
    j = high + 1
    
    while True:
        # 從左找大於等於 pivot 的元素
        i += 1
        while arr[i] < pivot:
            i += 1
        
        # 從右找小於等於 pivot 的元素
        j -= 1
        while arr[j] > pivot:
            j -= 1
        
        # 如果指針交錯，返回分區點
        if i >= j:
            return j
        
        # 交換元素
        arr[i], arr[j] = arr[j], arr[i]
```

### 快速排序優化

```python
import random

def quick_sort_optimized(arr, low, high):
    """
    優化的快速排序
    1. 隨機選擇基準（避免最壞情況）
    2. 小陣列使用插入排序
    3. 三數取中法選擇基準
    """
    if high - low < 10:
        # 小陣列使用插入排序
        insertion_sort(arr, low, high)
        return
    
    if low < high:
        # 三數取中法選擇基準
        mid = (low + high) // 2
        if arr[mid] < arr[low]:
            arr[low], arr[mid] = arr[mid], arr[low]
        if arr[high] < arr[low]:
            arr[low], arr[high] = arr[high], arr[low]
        if arr[mid] < arr[high]:
            arr[mid], arr[high] = arr[high], arr[mid]
        
        pi = partition(arr, low, high)
        quick_sort_optimized(arr, low, pi - 1)
        quick_sort_optimized(arr, pi + 1, high)

def insertion_sort(arr, low, high):
    """插入排序（用於小陣列）"""
    for i in range(low + 1, high + 1):
        key = arr[i]
        j = i - 1
        while j >= low and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

## 二分搜尋 (Binary Search)

### 基本概念
二分搜尋是在**已排序**陣列中尋找目標值的高效演算法。

### 標準二分搜尋

```python
def binary_search(arr, target):
    """
    標準二分搜尋
    時間複雜度: O(log n)
    空間複雜度: O(1)
    前提: arr 必須已排序
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # 避免溢位
        
        if arr[mid] == target:
            return mid  # 找到目標
        elif arr[mid] < target:
            left = mid + 1  # 在右半部搜尋
        else:
            right = mid - 1  # 在左半部搜尋
    
    return -1  # 未找到

# 測試
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 8))   # -1
```

### 遞迴版本

```python
def binary_search_recursive(arr, target, left, right):
    """遞迴版本的二分搜尋"""
    if left > right:
        return -1
    
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# 測試
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search_recursive(arr, 7, 0, len(arr) - 1))  # 3
```

### 二分搜尋變體

#### 1. 尋找第一個出現位置

```python
def binary_search_first(arr, target):
    """
    尋找目標值第一次出現的位置
    例如: [1, 2, 2, 2, 3], target=2 -> 返回 1
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # 繼續向左搜尋
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# 測試
arr = [1, 2, 2, 2, 3, 3, 4]
print(binary_search_first(arr, 2))  # 1
```

#### 2. 尋找最後一個出現位置

```python
def binary_search_last(arr, target):
    """
    尋找目標值最後一次出現的位置
    例如: [1, 2, 2, 2, 3], target=2 -> 返回 3
    """
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # 繼續向右搜尋
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# 測試
arr = [1, 2, 2, 2, 3, 3, 4]
print(binary_search_last(arr, 2))  # 3
```

#### 3. 尋找插入位置

```python
def search_insert_position(arr, target):
    """
    尋找目標值應該插入的位置
    保持陣列有序
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left  # left 是插入位置

# 測試
arr = [1, 3, 5, 6]
print(search_insert_position(arr, 5))  # 2
print(search_insert_position(arr, 2))  # 1
print(search_insert_position(arr, 7))  # 4
```

### Python 內建 bisect 模組

```python
import bisect

arr = [1, 3, 5, 7, 9]

# bisect_left: 找到最左邊的插入位置
pos = bisect.bisect_left(arr, 5)
print(pos)  # 2

# bisect_right (或 bisect): 找到最右邊的插入位置
pos = bisect.bisect_right(arr, 5)
print(pos)  # 3

# insort: 插入元素並保持有序
bisect.insort(arr, 4)
print(arr)  # [1, 3, 4, 5, 7, 9]

# 處理重複元素
arr = [1, 2, 2, 2, 3]
print(bisect.bisect_left(arr, 2))   # 1 - 第一個 2 的位置
print(bisect.bisect_right(arr, 2))  # 4 - 最後一個 2 的後面
```

## 二分搜尋的應用

### 1. 在旋轉排序陣列中搜尋

```python
def search_rotated(nums, target):
    """
    在旋轉排序陣列中搜尋
    例如: [4, 5, 6, 7, 0, 1, 2], target=0 -> 返回 4
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        
        # 判斷哪一半是有序的
        if nums[left] <= nums[mid]:
            # 左半部有序
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # 右半部有序
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# 測試
print(search_rotated([4, 5, 6, 7, 0, 1, 2], 0))  # 4
```

### 2. 尋找峰值

```python
def find_peak_element(nums):
    """
    尋找峰值（比相鄰元素都大的元素）
    例如: [1, 2, 3, 1] -> 返回 2（索引）
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] > nums[mid + 1]:
            # 峰值在左側（包含 mid）
            right = mid
        else:
            # 峰值在右側
            left = mid + 1
    
    return left

# 測試
print(find_peak_element([1, 2, 3, 1]))     # 2
print(find_peak_element([1, 2, 1, 3, 5, 6, 4]))  # 5
```

### 3. 尋找最小值（旋轉陣列）

```python
def find_min_rotated(nums):
    """
    在旋轉排序陣列中尋找最小值
    例如: [4, 5, 6, 7, 0, 1, 2] -> 0
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] > nums[right]:
            # 最小值在右側
            left = mid + 1
        else:
            # 最小值在左側（包含 mid）
            right = mid
    
    return nums[left]

# 測試
print(find_min_rotated([4, 5, 6, 7, 0, 1, 2]))  # 0
```

### 4. 平方根（整數部分）

```python
def sqrt(x):
    """
    計算平方根的整數部分（無條件捨去）
    使用二分搜尋
    """
    if x < 2:
        return x
    
    left, right = 1, x // 2
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if mid * mid == x:
            return mid
        elif mid * mid < x:
            left = mid + 1
        else:
            right = mid - 1
    
    return right  # right 是最後一個 mid*mid < x 的值

# 測試
print(sqrt(8))   # 2
print(sqrt(16))  # 4
```

## 練習題目

### 基礎題
1. **合併兩個已排序陣列** - 類似合併排序的合併步驟
2. **計數排序** - 實作線性時間的計數排序
3. **標準二分搜尋** - 在已排序陣列中尋找元素

### 進階題
4. **快速選擇** - 尋找第 k 大的元素（使用快速排序的分區）
5. **顏色分類** - 只有 0, 1, 2 的陣列排序（荷蘭國旗問題）
6. **合併 K 個已排序陣列** - 使用最小堆

### 困難題
7. **搜尋二維矩陣** - 每行每列都已排序
8. **尋找兩個排序陣列的中位數** - O(log(m+n))
9. **分割陣列的最大值最小化** - 二分搜尋答案

### ZeroJudge 相關題目
- [a229. 二分搜尋法](https://zerojudge.tw/ShowProblem?problemid=a229)
- [d827. 合併排序](https://zerojudge.tw/ShowProblem?problemid=d827)

## 測驗時間 🎯

### 題目 1
合併排序的時間複雜度是多少？為什麼？

::: details 點擊查看答案
**答案**: O(n log n)

**解析**:
- 每層分割需要 O(n) 的時間來合併
- 總共有 log n 層（因為每次將陣列分成兩半）
- 因此總時間 = O(n) × O(log n) = O(n log n)

這個時間複雜度在所有情況下都相同（最好、平均、最壞），這是合併排序的優點。
:::

### 題目 2
以下哪些情況快速排序的時間複雜度會是 O(n²)？
- A. 陣列已經排序
- B. 陣列隨機排列
- C. 陣列所有元素相同
- D. 陣列逆序排列

::: details 點擊查看答案
**答案**: A, C, D

**解析**:
當使用簡單的基準選擇策略（如總是選第一個或最後一個元素）時：
- A: 已排序會導致極不平衡的分區
- C: 所有元素相同也會導致不平衡
- D: 逆序同樣會導致不平衡

可以通過以下方法避免：
- 隨機選擇基準
- 三數取中法
- 混合使用其他排序（如對小陣列使用插入排序）
:::

### 題目 3
在已排序陣列 `[1, 2, 3, 4, 5, 6, 7, 8, 9]` 中搜尋 6，二分搜尋會比較哪些元素？

::: details 點擊查看答案
**答案**: 5, 7, 6

**解析**:
```
初始: left=0, right=8, mid=4 -> arr[4]=5 < 6, 向右搜尋
第二輪: left=5, right=8, mid=6 -> arr[6]=7 > 6, 向左搜尋
第三輪: left=5, right=5, mid=5 -> arr[5]=6 找到！
```

總共只需要 3 次比較，遠少於線性搜尋的 6 次。
:::

### 題目 4
實作一個函數，計算一個數在已排序陣列中出現的次數。要求時間複雜度 O(log n)。

::: details 點擊查看答案
```python
def count_occurrences(arr, target):
    """
    使用兩次二分搜尋：
    1. 找到第一次出現的位置
    2. 找到最後一次出現的位置
    3. 計算差值
    """
    def find_first(arr, target):
        left, right = 0, len(arr) - 1
        result = -1
        while left <= right:
            mid = left + (right - left) // 2
            if arr[mid] == target:
                result = mid
                right = mid - 1
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return result
    
    def find_last(arr, target):
        left, right = 0, len(arr) - 1
        result = -1
        while left <= right:
            mid = left + (right - left) // 2
            if arr[mid] == target:
                result = mid
                left = mid + 1
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return result
    
    first = find_first(arr, target)
    if first == -1:
        return 0
    last = find_last(arr, target)
    return last - first + 1

# 測試
arr = [1, 2, 2, 2, 2, 3, 4, 5]
print(count_occurrences(arr, 2))  # 4
```
:::

### 題目 5
為什麼二分搜尋計算中點時要用 `mid = left + (right - left) // 2` 而不是 `mid = (left + right) // 2`？

::: details 點擊查看答案
**答案**: 避免整數溢位

**解析**:
在某些語言（如 C++、Java）中，如果 `left` 和 `right` 都很大，`left + right` 可能會超過整數的最大值，導致溢位。

使用 `left + (right - left) // 2` 可以避免這個問題：
- `right - left` 不會溢位（因為 right >= left）
- 結果等價但更安全

在 Python 中雖然不會溢位（Python 的 int 可以任意大），但這是一個良好的編程習慣。
:::

## 重點整理

1. **排序演算法選擇**
   - 小資料量: 插入排序 O(n²)
   - 大資料量: 合併排序 O(n log n) 或快速排序
   - 需要穩定性: 合併排序
   - 節省空間: 快速排序（原地）或堆排序

2. **合併排序**
   - 分治思想，穩定排序
   - 時間: O(n log n) 所有情況
   - 空間: O(n)

3. **快速排序**
   - 分治思想，不穩定
   - 平均時間: O(n log n)
   - 最壞時間: O(n²) - 需要優化
   - 空間: O(log n)

4. **二分搜尋**
   - 必須在已排序陣列中使用
   - 時間: O(log n)
   - 注意邊界條件和變體

5. **Python 技巧**
   - `list.sort()` 和 `sorted()` 使用 Timsort
   - `bisect` 模組提供高效的二分搜尋
   - 自定義排序使用 `key` 參數

---

[← 回到 Module 3 目錄](./index.md)
