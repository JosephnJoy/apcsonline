# D3: 進階演算法 (Advanced Algorithms)

## 學習目標
- 掌握分治法 (Divide and Conquer) 的思想和應用
- 理解貪心演算法 (Greedy Algorithm) 的適用場景
- 學習位元運算的技巧
- 了解其他進階演算法和優化技巧

## 分治法 (Divide and Conquer)

### 基本概念
分治法將問題分解成若干個規模較小的**相同子問題**，遞迴地解決這些子問題，然後合併結果。

### 分治法三步驟
1. **分解 (Divide)**: 將問題分解成若干個子問題
2. **解決 (Conquer)**: 遞迴地解決子問題
3. **合併 (Combine)**: 將子問題的解合併成原問題的解

### 經典範例：合併排序

```python
def merge_sort(arr):
    """
    合併排序 - 分治法的經典應用
    
    時間複雜度: O(n log n)
    空間複雜度: O(n)
    """
    if len(arr) <= 1:
        return arr
    
    # 分解
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # 合併
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# 測試
print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
```

### 應用 1: 快速冪次

```python
def quick_power(base, exp):
    """
    快速冪次 - 計算 base^exp
    
    分治思想:
        x^n = x^(n/2) × x^(n/2)     (n 為偶數)
        x^n = x^(n/2) × x^(n/2) × x (n 為奇數)
    
    時間複雜度: O(log n)
    空間複雜度: O(log n) - 遞迴堆疊
    """
    if exp == 0:
        return 1
    if exp == 1:
        return base
    
    # 分解
    half = quick_power(base, exp // 2)
    
    # 合併
    if exp % 2 == 0:
        return half * half
    else:
        return half * half * base

# 迭代版本（更高效）
def quick_power_iterative(base, exp):
    """
    快速冪次迭代版本
    時間複雜度: O(log n)
    空間複雜度: O(1)
    """
    result = 1
    
    while exp > 0:
        if exp % 2 == 1:
            result *= base
        base *= base
        exp //= 2
    
    return result

# 測試
print(quick_power(2, 10))           # 1024
print(quick_power_iterative(2, 10)) # 1024
```

### 應用 2: 最大子陣列和（分治法）

```python
def max_subarray_divide_conquer(nums, left, right):
    """
    最大子陣列和 - 分治法
    
    時間複雜度: O(n log n)
    空間複雜度: O(log n)
    
    注意: 實際上 Kadane's Algorithm O(n) 更好，
    這裡只是展示分治法的應用
    """
    # 基礎情況
    if left == right:
        return nums[left]
    
    # 分解
    mid = (left + right) // 2
    
    # 遞迴求解左右兩半的最大子陣列和
    left_max = max_subarray_divide_conquer(nums, left, mid)
    right_max = max_subarray_divide_conquer(nums, mid + 1, right)
    
    # 求跨越中點的最大子陣列和
    cross_max = max_crossing_sum(nums, left, mid, right)
    
    # 合併
    return max(left_max, right_max, cross_max)

def max_crossing_sum(nums, left, mid, right):
    """計算跨越中點的最大子陣列和"""
    # 從中點向左找最大和
    left_sum = float('-inf')
    curr_sum = 0
    for i in range(mid, left - 1, -1):
        curr_sum += nums[i]
        left_sum = max(left_sum, curr_sum)
    
    # 從中點向右找最大和
    right_sum = float('-inf')
    curr_sum = 0
    for i in range(mid + 1, right + 1):
        curr_sum += nums[i]
        right_sum = max(right_sum, curr_sum)
    
    return left_sum + right_sum

# 測試
arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray_divide_conquer(arr, 0, len(arr) - 1))  # 6
```

### 應用 3: 大整數乘法（Karatsuba 演算法）

```python
def karatsuba(x, y):
    """
    Karatsuba 大整數乘法
    
    時間複雜度: O(n^1.585) vs 傳統 O(n^2)
    """
    # 基礎情況
    if x < 10 or y < 10:
        return x * y
    
    # 計算位數
    n = max(len(str(x)), len(str(y)))
    m = n // 2
    
    # 分解
    high1, low1 = divmod(x, 10 ** m)
    high2, low2 = divmod(y, 10 ** m)
    
    # 三次遞迴乘法（而不是四次）
    z0 = karatsuba(low1, low2)
    z1 = karatsuba(low1 + high1, low2 + high2)
    z2 = karatsuba(high1, high2)
    
    # 合併
    return z2 * (10 ** (2 * m)) + (z1 - z2 - z0) * (10 ** m) + z0

# 測試
print(karatsuba(1234, 5678))  # 7006652
```

## 貪心演算法 (Greedy Algorithm)

### 基本概念
貪心演算法在每一步都做出**當前看來最優**的選擇，期望最終得到全域最優解。

::: warning 注意
貪心演算法不一定能得到最優解！必須證明貪心選擇性質。
:::

### 適用條件
1. **貪心選擇性質**: 局部最優選擇能導致全域最優解
2. **最優子結構**: 問題的最優解包含子問題的最優解

### 應用 1: 活動選擇問題

```python
def activity_selection(start, finish):
    """
    活動選擇：選擇最多不重疊的活動
    
    貪心策略: 每次選擇最早結束的活動
    
    時間複雜度: O(n log n) - 排序
    空間複雜度: O(1)
    """
    # 按結束時間排序
    activities = sorted(zip(start, finish), key=lambda x: x[1])
    
    selected = [activities[0]]
    last_finish = activities[0][1]
    
    for s, f in activities[1:]:
        if s >= last_finish:  # 不重疊
            selected.append((s, f))
            last_finish = f
    
    return selected

# 測試
start = [1, 3, 0, 5, 8, 5]
finish = [2, 4, 6, 7, 9, 9]
result = activity_selection(start, finish)
print(f"選擇的活動: {result}")
print(f"最多活動數: {len(result)}")
# 輸出: [(1, 2), (3, 4), (5, 7), (8, 9)] - 4 個活動
```

### 應用 2: 零錢兌換（貪心不一定最優）

```python
def coin_change_greedy(coins, amount):
    """
    零錢兌換 - 貪心法
    
    貪心策略: 優先使用面額最大的硬幣
    
    注意: 只對某些幣值系統（如 1, 5, 10, 25）有效！
    對於任意幣值，貪心法可能不是最優解，需要用 DP
    """
    coins.sort(reverse=True)
    count = 0
    
    for coin in coins:
        if amount >= coin:
            num = amount // coin
            count += num
            amount -= num * coin
    
    return count if amount == 0 else -1

# 測試
# 有效的情況
print(coin_change_greedy([1, 5, 10, 25], 41))  # 4 (25+10+5+1)

# 貪心法失敗的情況
print(coin_change_greedy([1, 3, 4], 6))  # 貪心: 3 (4+1+1), 最優: 2 (3+3)
```

### 應用 3: 哈夫曼編碼

```python
import heapq
from collections import Counter, namedtuple

class Node(namedtuple("Node", ["freq", "char", "left", "right"])):
    def __lt__(self, other):
        return self.freq < other.freq

def huffman_encoding(text):
    """
    哈夫曼編碼 - 最優前綴編碼
    
    貪心策略: 每次合併頻率最小的兩個節點
    
    時間複雜度: O(n log n)
    """
    # 統計字元頻率
    freq = Counter(text)
    
    # 建立初始堆積
    heap = [Node(f, c, None, None) for c, f in freq.items()]
    heapq.heapify(heap)
    
    # 建立哈夫曼樹
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = Node(left.freq + right.freq, None, left, right)
        heapq.heappush(heap, merged)
    
    # 生成編碼
    root = heap[0]
    codes = {}
    
    def generate_codes(node, code=""):
        if node.char:  # 葉節點
            codes[node.char] = code
        else:
            generate_codes(node.left, code + "0")
            generate_codes(node.right, code + "1")
    
    generate_codes(root)
    
    # 編碼文本
    encoded = "".join(codes[c] for c in text)
    
    return codes, encoded

# 測試
text = "this is an example of a huffman tree"
codes, encoded = huffman_encoding(text)
print("字元編碼:")
for char, code in sorted(codes.items()):
    print(f"  '{char}': {code}")
print(f"\n原始長度: {len(text) * 8} bits")
print(f"編碼長度: {len(encoded)} bits")
print(f"壓縮率: {(1 - len(encoded) / (len(text) * 8)) * 100:.1f}%")
```

### 應用 4: 跳躍遊戲

```python
def can_jump(nums):
    """
    跳躍遊戲：能否從第一個位置跳到最後一個位置
    
    貪心策略: 維護能到達的最遠位置
    
    時間複雜度: O(n)
    空間複雜度: O(1)
    """
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= len(nums) - 1:
            return True
    
    return True

def jump(nums):
    """
    跳躍遊戲 II：到達最後位置的最少跳躍次數
    
    貪心策略: 在當前跳躍範圍內，選擇能跳得最遠的位置
    """
    if len(nums) <= 1:
        return 0
    
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
            
            if current_end >= len(nums) - 1:
                break
    
    return jumps

# 測試
print(can_jump([2, 3, 1, 1, 4]))  # True
print(can_jump([3, 2, 1, 0, 4]))  # False
print(jump([2, 3, 1, 1, 4]))      # 2 (0 -> 1 -> 4)
```

## 位元運算技巧

### 基本位元運算

```python
# 基本運算
a = 5   # 0101
b = 3   # 0011

print(f"a & b = {a & b}")   # AND:  0001 = 1
print(f"a | b = {a | b}")   # OR:   0111 = 7
print(f"a ^ b = {a ^ b}")   # XOR:  0110 = 6
print(f"~a = {~a}")         # NOT:  補數 = -6
print(f"a << 1 = {a << 1}") # 左移: 1010 = 10
print(f"a >> 1 = {a >> 1}") # 右移: 0010 = 2
```

### 常用位元技巧

```python
# 1. 判斷奇偶
def is_odd(n):
    return (n & 1) == 1

# 2. 交換兩個數（不用臨時變數）
def swap(a, b):
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b

# 3. 取絕對值
def abs_value(n):
    mask = n >> 31  # 符號位擴展
    return (n ^ mask) - mask

# 4. 乘以 2 的冪次
def multiply_by_power_of_2(n, k):
    return n << k  # n * 2^k

# 5. 除以 2 的冪次
def divide_by_power_of_2(n, k):
    return n >> k  # n / 2^k

# 6. 判斷是否為 2 的冪次
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# 7. 計算二進位中 1 的個數（Brian Kernighan's Algorithm）
def count_ones(n):
    count = 0
    while n:
        n &= n - 1  # 清除最右邊的 1
        count += 1
    return count

# 8. 取得最右邊的 1
def rightmost_one(n):
    return n & (-n)

# 9. 清除最右邊的 1
def clear_rightmost_one(n):
    return n & (n - 1)

# 10. 設置第 k 位為 1
def set_bit(n, k):
    return n | (1 << k)

# 11. 清除第 k 位
def clear_bit(n, k):
    return n & ~(1 << k)

# 12. 切換第 k 位
def toggle_bit(n, k):
    return n ^ (1 << k)

# 13. 檢查第 k 位是否為 1
def check_bit(n, k):
    return (n & (1 << k)) != 0

# 測試
print(is_odd(5))                    # True
print(swap(5, 3))                   # (3, 5)
print(is_power_of_2(16))            # True
print(count_ones(7))                # 3 (0111)
print(rightmost_one(12))            # 4 (1100 -> 0100)
```

### 位元運算應用：只出現一次的數字

```python
def single_number(nums):
    """
    數組中只有一個數字出現一次，其他都出現兩次，找出這個數字
    
    技巧: XOR 的性質
        - a ^ a = 0
        - a ^ 0 = a
        - XOR 滿足交換律和結合律
    
    時間複雜度: O(n)
    空間複雜度: O(1)
    """
    result = 0
    for num in nums:
        result ^= num
    return result

def single_number_three_times(nums):
    """
    其他數字出現三次，一個數字出現一次
    
    技巧: 用兩個變數追蹤每一位出現的次數
    """
    ones = twos = 0
    
    for num in nums:
        twos |= ones & num
        ones ^= num
        threes = ones & twos
        ones &= ~threes
        twos &= ~threes
    
    return ones

# 測試
print(single_number([2, 2, 1]))              # 1
print(single_number([4, 1, 2, 1, 2]))        # 4
print(single_number_three_times([2, 2, 3, 2])) # 3
```

### 位元運算應用：子集生成

```python
def generate_subsets(nums):
    """
    使用位元運算生成所有子集
    
    時間複雜度: O(n × 2^n)
    """
    n = len(nums)
    subsets = []
    
    # 2^n 個子集
    for i in range(1 << n):
        subset = []
        for j in range(n):
            # 檢查第 j 位是否為 1
            if i & (1 << j):
                subset.append(nums[j])
        subsets.append(subset)
    
    return subsets

# 測試
print(generate_subsets([1, 2, 3]))
# [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

## 其他進階技巧

### 1. 雙指針技巧

```python
def two_sum_sorted(nums, target):
    """
    在已排序陣列中找兩數之和
    
    技巧: 雙指針從兩端向中間移動
    時間複雜度: O(n)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []

def remove_duplicates(nums):
    """
    原地移除重複元素
    
    技巧: 慢指針追蹤不重複元素的位置
    時間複雜度: O(n)
    """
    if not nums:
        return 0
    
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# 測試
print(two_sum_sorted([2, 7, 11, 15], 9))  # [0, 1]
arr = [1, 1, 2, 2, 3, 3, 3, 4]
length = remove_duplicates(arr)
print(arr[:length])  # [1, 2, 3, 4]
```

### 2. 滑動視窗

```python
def max_sum_subarray(nums, k):
    """
    大小為 k 的子陣列的最大和
    
    技巧: 滑動視窗
    時間複雜度: O(n)
    """
    if len(nums) < k:
        return 0
    
    # 計算第一個視窗的和
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # 滑動視窗
    for i in range(k, len(nums)):
        window_sum = window_sum - nums[i - k] + nums[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

def longest_substring_without_repeating(s):
    """
    最長不含重複字元的子字串
    
    技巧: 滑動視窗 + 集合
    時間複雜度: O(n)
    """
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# 測試
print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))      # 9 ([5,1,3])
print(longest_substring_without_repeating("abcabcbb"))  # 3 ("abc")
```

### 3. 前綴和

```python
class NumArray:
    """
    區間和查詢 - 使用前綴和
    
    預處理: O(n)
    查詢: O(1)
    """
    def __init__(self, nums):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    
    def sum_range(self, left, right):
        """查詢 nums[left:right+1] 的和"""
        return self.prefix[right + 1] - self.prefix[left]

# 測試
obj = NumArray([1, 2, 3, 4, 5])
print(obj.sum_range(0, 2))  # 6 (1+2+3)
print(obj.sum_range(2, 4))  # 12 (3+4+5)
```

## 練習題目

### 基礎題
1. **快速冪次** - 計算 x^n
2. **位元運算基礎** - 位元操作練習
3. **雙指針** - 兩數之和、三數之和

### 進階題
4. **活動選擇** - 最多不重疊區間
5. **跳躍遊戲** - 最少跳躍次數
6. **滑動視窗最大值** - 使用單調佇列

### 困難題
7. **哈夫曼編碼** - 實作完整的編碼和解碼
8. **分治法應用** - 最接近點對問題
9. **位元 DP** - 旅行推銷員問題 (TSP)

### ZeroJudge 相關題目
- [a013. 貪心法](https://zerojudge.tw/ShowProblem?problemid=a013)

## 測驗時間 🎯

### 題目 1
分治法和動態規劃有什麼區別？

::: details 點擊查看答案
**答案**:

| 特性 | 分治法 | 動態規劃 |
|------|--------|---------|
| 子問題關係 | 獨立 | 重疊 |
| 解決方式 | 遞迴分解 | 儲存子問題解 |
| 時間複雜度 | 通常 O(n log n) | 通常 O(n²) 或更高 |
| 適用問題 | 排序、搜尋 | 最優化問題 |
| 典型例子 | 合併排序、快速排序 | 背包、LCS、LIS |

**關鍵區別**:
- 分治法的子問題**不重疊**，每個子問題只解決一次
- DP 的子問題**重疊**，需要記憶化避免重複計算

**範例**:
- 合併排序（分治）: 左右兩半完全獨立
- 費波那契（DP）: fib(5) 需要 fib(4) 和 fib(3)，fib(4) 又需要 fib(3)，重疊了
:::

### 題目 2
什麼時候可以使用貪心演算法？如何證明貪心演算法是正確的？

::: details 點擊查看答案
**答案**: 必須滿足兩個性質：

**1. 貪心選擇性質 (Greedy Choice Property)**
- 通過局部最優選擇可以得到全域最優解
- 每一步的選擇不需要考慮未來的後果

**2. 最優子結構 (Optimal Substructure)**
- 問題的最優解包含子問題的最優解

**證明方法**:

**1. 交換論證 (Exchange Argument)**
```
假設存在最優解 S 不使用貪心選擇 g
將 S 中的某個元素替換為 g，得到 S'
證明 S' 也是最優解或更優
因此貪心選擇不會使情況變差
```

**2. 歸納法 (Induction)**
```
證明在每一步貪心選擇後，
剩餘問題仍然具有相同的結構
```

**範例: 活動選擇問題**
- 貪心選擇: 選擇最早結束的活動
- 證明: 如果最優解不選擇最早結束的活動，可以將其替換為最早結束的活動，不會影響後續選擇
:::

### 題目 3
位元運算 `n & (n - 1)` 有什麼作用？

::: details 點擊查看答案
**答案**: 清除最右邊的 1

**原理**:
```
n     = ...10100  (某個數字)
n-1   = ...10011  (最右邊的 1 變成 0，右邊的 0 全變成 1)
n&(n-1)= ...10000  (清除了最右邊的 1)
```

**應用**:

**1. 判斷是否為 2 的冪次**
```python
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0
```
因為 2 的冪次只有一個 1，清除後變成 0。

**2. 計算二進位中 1 的個數**
```python
def count_ones(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
```
每次循環清除一個 1，循環次數 = 1 的個數。

**3. LeetCode 相關題目**
- 191. Number of 1 Bits
- 231. Power of Two
- 338. Counting Bits
:::

### 題目 4
為什麼 XOR 運算常用於解決「找出唯一元素」的問題？

::: details 點擊查看答案
**答案**: 因為 XOR 具有以下性質：

**XOR 的性質**:
1. `a ^ a = 0` - 相同的數 XOR 結果為 0
2. `a ^ 0 = a` - 任何數 XOR 0 等於自己
3. **交換律**: `a ^ b = b ^ a`
4. **結合律**: `(a ^ b) ^ c = a ^ (b ^ c)`

**應用範例**:

**問題 1: 只有一個數字出現一次，其他都出現兩次**
```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# [4, 1, 2, 1, 2]
# 0 ^ 4 ^ 1 ^ 2 ^ 1 ^ 2
# = 4 ^ (1 ^ 1) ^ (2 ^ 2)
# = 4 ^ 0 ^ 0
# = 4
```

**問題 2: 交換兩個變數（不用臨時變數）**
```python
a = a ^ b
b = a ^ b  # = (a ^ b) ^ b = a
a = a ^ b  # = (a ^ b) ^ a = b
```

**問題 3: 尋找缺失的數字**
```python
def missing_number(nums):
    # [0, 1, 3] 缺少 2
    result = len(nums)
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result
# result = 3 ^ (0^0) ^ (1^1) ^ (2^3) = 3 ^ 0 ^ 0 ^ 2 ^ 3 = 2
```
:::

### 題目 5
實作一個函數，判斷一個數字是否為 4 的冪次。

::: details 點擊查看答案
```python
def is_power_of_4(n):
    """
    判斷是否為 4 的冪次
    
    方法 1: 數學方法
    """
    if n <= 0:
        return False
    
    # 4 的冪次一定是 2 的冪次
    if n & (n - 1) != 0:
        return False
    
    # 4 的冪次的二進位表示中，1 只出現在奇數位
    # 用 0x55555555 (01010101...) 進行 AND 運算
    return (n & 0x55555555) != 0

def is_power_of_4_v2(n):
    """
    方法 2: 直接判斷
    """
    if n <= 0:
        return False
    
    # 4 的冪次 = 2 的偶數次冪
    # 即 n 是 2 的冪次，且 n-1 能被 3 整除
    return (n & (n - 1)) == 0 and (n - 1) % 3 == 0

def is_power_of_4_v3(n):
    """
    方法 3: 循環除法
    """
    if n <= 0:
        return False
    
    while n % 4 == 0:
        n //= 4
    
    return n == 1

# 測試
for func in [is_power_of_4, is_power_of_4_v2, is_power_of_4_v3]:
    print(func(16))   # True (4^2)
    print(func(5))    # False
    print(func(1))    # True (4^0)
```

**解析**:
- 4 的冪次: 1, 4, 16, 64, 256...
- 二進位: 1, 100, 10000, 1000000...
- 規律: 1 只在奇數位（從右數第 1, 3, 5... 位）
:::

## 重點整理

1. **分治法**
   - 分解、解決、合併
   - 適用於獨立子問題
   - 範例: 合併排序、快速冪次

2. **貪心演算法**
   - 每步選擇局部最優
   - 需要貪心選擇性質
   - 不一定得到全域最優解
   - 範例: 活動選擇、哈夫曼編碼

3. **位元運算技巧**
   - `n & (n-1)`: 清除最右邊的 1
   - `n & 1`: 判斷奇偶
   - `1 << k`: 2 的 k 次方
   - XOR: 找唯一元素

4. **其他技巧**
   - 雙指針: 減少時間複雜度
   - 滑動視窗: 子陣列問題
   - 前綴和: 快速區間查詢
   - 單調堆疊/佇列: 維護最值

5. **選擇演算法**
   - 最優化 + 重疊子問題 → DP
   - 獨立子問題 → 分治法
   - 局部最優可證明 → 貪心
   - 需要所有解 → 回溯

---

[← 回到 Module 4 目錄](./index.md)
