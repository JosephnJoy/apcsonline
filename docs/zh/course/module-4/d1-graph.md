# D1: 圖論基礎 (Graph Theory)

## 學習目標
- 理解圖的基本概念和術語
- 掌握圖的兩種表示法：鄰接矩陣和鄰接串列
- 學習深度優先搜尋 (DFS) 和廣度優先搜尋 (BFS)
- 解決連通性、環檢測等基礎圖論問題

## 圖的基本概念

### 什麼是圖？
圖 (Graph) 是由**頂點 (Vertices/Nodes)** 和**邊 (Edges)** 組成的資料結構，用於表示物件之間的關係。

### 圖的類型

#### 1. 有向圖 vs 無向圖
```python
# 無向圖: 邊沒有方向
# A -- B 表示 A 和 B 互相連接
無向圖 = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']
}

# 有向圖: 邊有方向
# A -> B 表示從 A 到 B，但不一定從 B 到 A
有向圖 = {
    'A': ['B'],
    'B': ['C'],
    'C': ['A']
}
```

#### 2. 加權圖 vs 無權圖
```python
# 無權圖: 邊沒有權重
graph = {
    'A': ['B', 'C'],
    'B': ['C']
}

# 加權圖: 邊有權重（距離、成本等）
weighted_graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('C', 1)],
    'C': []
}
```

### 圖的術語

- **頂點 (Vertex)**: 圖中的節點
- **邊 (Edge)**: 連接兩個頂點的線
- **度 (Degree)**: 與一個頂點相連的邊數
  - 無向圖: 度 = 相鄰頂點數
  - 有向圖: 入度 (In-degree) + 出度 (Out-degree)
- **路徑 (Path)**: 頂點序列，相鄰頂點之間有邊
- **環 (Cycle)**: 起點和終點相同的路徑
- **連通圖 (Connected Graph)**: 任意兩個頂點之間都有路徑

## 圖的表示法

### 1. 鄰接矩陣 (Adjacency Matrix)

使用二維陣列表示圖，`matrix[i][j] = 1` 表示頂點 i 和 j 之間有邊。

```python
class GraphMatrix:
    """使用鄰接矩陣表示圖"""
    
    def __init__(self, num_vertices):
        self.V = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u, v, weight=1):
        """添加邊（無向圖）"""
        self.matrix[u][v] = weight
        self.matrix[v][u] = weight  # 無向圖需要雙向
    
    def add_directed_edge(self, u, v, weight=1):
        """添加有向邊"""
        self.matrix[u][v] = weight
    
    def print_graph(self):
        """印出鄰接矩陣"""
        for row in self.matrix:
            print(row)

# 範例：創建圖
#   0 --- 1
#   |   / |
#   | /   |
#   2 --- 3
g = GraphMatrix(4)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
g.print_graph()
# 輸出:
# [0, 1, 1, 0]
# [1, 0, 1, 1]
# [1, 1, 0, 1]
# [0, 1, 1, 0]
```

**鄰接矩陣的特點**:
- **空間複雜度**: O(V²)
- **查詢邊**: O(1) - 直接查表
- **遍歷所有邊**: O(V²)
- **適用場景**: 稠密圖（邊很多）

### 2. 鄰接串列 (Adjacency List)

使用字典或陣列，每個頂點對應一個串列，包含其相鄰的頂點。

```python
class GraphList:
    """使用鄰接串列表示圖"""
    
    def __init__(self):
        self.graph = {}
    
    def add_vertex(self, vertex):
        """添加頂點"""
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def add_edge(self, u, v, weight=None):
        """添加邊（無向圖）"""
        self.add_vertex(u)
        self.add_vertex(v)
        
        if weight is None:
            self.graph[u].append(v)
            self.graph[v].append(u)
        else:
            self.graph[u].append((v, weight))
            self.graph[v].append((u, weight))
    
    def add_directed_edge(self, u, v, weight=None):
        """添加有向邊"""
        self.add_vertex(u)
        self.add_vertex(v)
        
        if weight is None:
            self.graph[u].append(v)
        else:
            self.graph[u].append((v, weight))
    
    def print_graph(self):
        """印出鄰接串列"""
        for vertex, neighbors in self.graph.items():
            print(f"{vertex}: {neighbors}")

# 範例
g = GraphList()
g.add_edge('A', 'B')
g.add_edge('A', 'C')
g.add_edge('B', 'C')
g.add_edge('B', 'D')
g.print_graph()
# 輸出:
# A: ['B', 'C']
# B: ['A', 'C', 'D']
# C: ['A', 'B']
# D: ['B']
```

**鄰接串列的特點**:
- **空間複雜度**: O(V + E)
- **查詢邊**: O(degree(v)) - 需要遍歷鄰居串列
- **遍歷所有邊**: O(V + E)
- **適用場景**: 稀疏圖（邊較少）

### 鄰接矩陣 vs 鄰接串列

| 操作 | 鄰接矩陣 | 鄰接串列 |
|------|---------|---------|
| 空間複雜度 | O(V²) | O(V + E) |
| 檢查邊 (u, v) 存在 | O(1) | O(degree(u)) |
| 取得所有鄰居 | O(V) | O(degree(u)) |
| 添加頂點 | O(V²) | O(1) |
| 添加邊 | O(1) | O(1) |
| 刪除邊 | O(1) | O(degree(u)) |

## 深度優先搜尋 (DFS)

### 基本概念
DFS 是一種圖的遍歷算法，沿著一條路徑盡可能深入，直到無路可走再回溯。

### 遞迴實作

```python
def dfs_recursive(graph, start, visited=None):
    """
    DFS 遞迴版本
    時間複雜度: O(V + E)
    空間複雜度: O(V) - 遞迴堆疊
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

# 測試
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("DFS Traversal:")
dfs_recursive(graph, 'A')
# 可能輸出: A B D E F C
```

### 迭代實作（使用堆疊）

```python
def dfs_iterative(graph, start):
    """
    DFS 迭代版本（使用顯式堆疊）
    時間複雜度: O(V + E)
    空間複雜度: O(V)
    """
    visited = set()
    stack = [start]
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            visited.add(vertex)
            print(vertex, end=' ')
            
            # 將鄰居加入堆疊（逆序以保持與遞迴版本相同的順序）
            for neighbor in reversed(graph.get(vertex, [])):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited

# 測試
print("\nDFS Iterative:")
dfs_iterative(graph, 'A')
```

### DFS 應用 1: 路徑存在檢測

```python
def has_path_dfs(graph, start, end, visited=None):
    """檢查從 start 到 end 是否存在路徑"""
    if visited is None:
        visited = set()
    
    if start == end:
        return True
    
    visited.add(start)
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            if has_path_dfs(graph, neighbor, end, visited):
                return True
    
    return False

# 測試
print(has_path_dfs(graph, 'A', 'F'))  # True
print(has_path_dfs(graph, 'A', 'Z'))  # False
```

### DFS 應用 2: 尋找所有路徑

```python
def find_all_paths(graph, start, end, path=None):
    """找出從 start 到 end 的所有路徑"""
    if path is None:
        path = []
    
    path = path + [start]
    
    if start == end:
        return [path]
    
    paths = []
    for neighbor in graph.get(start, []):
        if neighbor not in path:  # 避免環
            new_paths = find_all_paths(graph, neighbor, end, path)
            paths.extend(new_paths)
    
    return paths

# 測試
all_paths = find_all_paths(graph, 'A', 'F')
for path in all_paths:
    print(' -> '.join(path))
# 可能輸出:
# A -> C -> F
# A -> B -> E -> F
```

### DFS 應用 3: 環檢測（無向圖）

```python
def has_cycle_undirected(graph):
    """
    檢測無向圖中是否存在環
    """
    def dfs(node, parent, visited):
        visited.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor, node, visited):
                    return True
            elif neighbor != parent:
                # 已訪問且不是父節點 -> 找到環
                return True
        
        return False
    
    visited = set()
    
    # 檢查所有連通分量
    for vertex in graph:
        if vertex not in visited:
            if dfs(vertex, None, visited):
                return True
    
    return False

# 測試
graph_with_cycle = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']  # A-B-C-A 形成環
}

graph_without_cycle = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B']
}

print(has_cycle_undirected(graph_with_cycle))     # True
print(has_cycle_undirected(graph_without_cycle))  # False
```

## 廣度優先搜尋 (BFS)

### 基本概念
BFS 是一種層序遍歷算法，先訪問離起點近的頂點，再訪問較遠的頂點。

### 實作（使用佇列）

```python
from collections import deque

def bfs(graph, start):
    """
    BFS 遍歷
    時間複雜度: O(V + E)
    空間複雜度: O(V)
    """
    visited = set([start])
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# 測試
print("\nBFS Traversal:")
print(' -> '.join(bfs(graph, 'A')))
# 輸出: A -> B -> C -> D -> E -> F
```

### BFS 應用 1: 最短路徑（無權圖）

```python
def shortest_path_bfs(graph, start, end):
    """
    使用 BFS 尋找最短路徑（無權圖）
    返回路徑和距離
    """
    if start == end:
        return [start], 0
    
    visited = {start}
    queue = deque([(start, [start])])
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                new_path = path + [neighbor]
                
                if neighbor == end:
                    return new_path, len(new_path) - 1
                
                queue.append((neighbor, new_path))
    
    return None, -1  # 無路徑

# 測試
path, distance = shortest_path_bfs(graph, 'A', 'F')
print(f"\nShortest path: {' -> '.join(path)}")
print(f"Distance: {distance}")
# 輸出:
# Shortest path: A -> C -> F
# Distance: 2
```

### BFS 應用 2: 層級遍歷

```python
def bfs_level_order(graph, start):
    """
    BFS 層級遍歷，返回每一層的節點
    """
    visited = {start}
    queue = deque([(start, 0)])  # (節點, 層級)
    levels = {}
    
    while queue:
        vertex, level = queue.popleft()
        
        if level not in levels:
            levels[level] = []
        levels[level].append(vertex)
        
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, level + 1))
    
    return levels

# 測試
levels = bfs_level_order(graph, 'A')
for level, nodes in sorted(levels.items()):
    print(f"Level {level}: {nodes}")
# 輸出:
# Level 0: ['A']
# Level 1: ['B', 'C']
# Level 2: ['D', 'E', 'F']
```

### BFS 應用 3: 二分圖檢測

```python
def is_bipartite(graph):
    """
    檢測圖是否為二分圖
    可以用兩種顏色為所有頂點著色，使得相鄰頂點顏色不同
    """
    color = {}  # 0 或 1
    
    def bfs_color(start):
        queue = deque([start])
        color[start] = 0
        
        while queue:
            vertex = queue.popleft()
            
            for neighbor in graph.get(vertex, []):
                if neighbor not in color:
                    # 著相反的顏色
                    color[neighbor] = 1 - color[vertex]
                    queue.append(neighbor)
                elif color[neighbor] == color[vertex]:
                    # 相鄰頂點顏色相同 -> 不是二分圖
                    return False
        
        return True
    
    # 檢查所有連通分量
    for vertex in graph:
        if vertex not in color:
            if not bfs_color(vertex):
                return False
    
    return True

# 測試
bipartite_graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

non_bipartite_graph = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']  # 三角形，無法二分
}

print(is_bipartite(bipartite_graph))      # True
print(is_bipartite(non_bipartite_graph))  # False
```

## DFS vs BFS 比較

| 特性 | DFS | BFS |
|------|-----|-----|
| 資料結構 | 堆疊（遞迴或顯式） | 佇列 |
| 空間複雜度 | O(h) h=樹高 | O(w) w=最大寬度 |
| 最短路徑 | ❌ 不保證 | ✅ 保證（無權圖） |
| 完整性 | ✅ 會找到所有節點 | ✅ 會找到所有節點 |
| 適用場景 | 路徑搜尋、拓撲排序、環檢測 | 最短路徑、層級遍歷 |

## 連通分量

### 尋找所有連通分量

```python
def find_connected_components(graph):
    """
    尋找無向圖的所有連通分量
    """
    visited = set()
    components = []
    
    def dfs(node, component):
        visited.add(node)
        component.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for vertex in graph:
        if vertex not in visited:
            component = []
            dfs(vertex, component)
            components.append(component)
    
    return components

# 測試
disconnected_graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C'],
    'E': []
}

components = find_connected_components(disconnected_graph)
print("\nConnected Components:")
for i, comp in enumerate(components, 1):
    print(f"Component {i}: {comp}")
# 輸出:
# Component 1: ['A', 'B']
# Component 2: ['C', 'D']
# Component 3: ['E']
```

## 練習題目

### 基礎題
1. **圖的實作** - 實作鄰接矩陣和鄰接串列
2. **DFS 遍歷** - 使用 DFS 遍歷圖
3. **BFS 遍歷** - 使用 BFS 遍歷圖

### 進階題
4. **島嶼數量** - 在二維網格中計算島嶼數量
5. **克隆圖** - 深度複製一個圖
6. **課程表** - 檢查是否可以完成所有課程（拓撲排序）

### 困難題
7. **最小生成樹** - Prim 或 Kruskal 演算法
8. **最短路徑** - Dijkstra 或 Bellman-Ford
9. **強連通分量** - Tarjan 或 Kosaraju 演算法

### ZeroJudge 相關題目
- [a290. 新手訓練 - 圖論](https://zerojudge.tw/ShowProblem?problemid=a290)

## 測驗時間 🎯

### 題目 1
鄰接矩陣和鄰接串列分別適合什麼類型的圖？

::: details 點擊查看答案
**答案**:
- **鄰接矩陣**: 適合**稠密圖**（邊很多，接近 V²）
  - 優點: O(1) 查詢邊是否存在
  - 缺點: O(V²) 空間，即使邊很少也要用這麼多空間
  
- **鄰接串列**: 適合**稀疏圖**（邊較少）
  - 優點: O(V + E) 空間，只儲存實際存在的邊
  - 缺點: O(degree(v)) 查詢邊是否存在

APCS 題目通常使用鄰接串列，因為大多數實際問題的圖都是稀疏的。
:::

### 題目 2
DFS 和 BFS 的時間複雜度分別是多少？

::: details 點擊查看答案
**答案**: 都是 O(V + E)

**解析**:
- V: 訪問每個頂點一次
- E: 檢查每條邊一次（鄰接串列）或 V² 次（鄰接矩陣）

使用鄰接串列時:
- DFS: O(V + E)
- BFS: O(V + E)

使用鄰接矩陣時:
- DFS: O(V²)
- BFS: O(V²)
:::

### 題目 3
如何使用 BFS 檢測圖中是否存在環？

::: details 點擊查看答案
```python
def has_cycle_bfs(graph):
    """
    使用 BFS 檢測無向圖中的環
    """
    visited = set()
    
    def bfs(start):
        queue = deque([(start, None)])  # (節點, 父節點)
        visited.add(start)
        
        while queue:
            node, parent = queue.popleft()
            
            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, node))
                elif neighbor != parent:
                    # 已訪問且不是父節點 -> 有環
                    return True
        
        return False
    
    for vertex in graph:
        if vertex not in visited:
            if bfs(vertex):
                return True
    
    return False
```

**關鍵**: 如果遍歷時遇到已訪問的節點，且該節點不是當前節點的父節點，則存在環。
:::

### 題目 4
為什麼 BFS 可以找到無權圖的最短路徑，而 DFS 不行？

::: details 點擊查看答案
**答案**: 因為 BFS 按照**距離遞增**的順序訪問節點。

**解析**:
- **BFS**: 先訪問距離為 1 的所有節點，再訪問距離為 2 的節點，依此類推。因此第一次到達目標節點時，一定是通過最短路徑。

- **DFS**: 沿著一條路徑走到底，可能先找到一條很長的路徑，而錯過更短的路徑。

範例:
```
    A
   / \
  B   C
   \ /
    D
```
從 A 到 D:
- BFS: A -> B -> D（找到最短路徑，長度 2）
- DFS: 可能走 A -> B -> D，也可能走 A -> C -> D（都是長度 2，但如果圖更複雜，DFS 可能走更長的路）

對於**加權圖**，需要使用 Dijkstra 演算法。
:::

### 題目 5
在二維網格中計算島嶼數量（'1' 表示陸地，'0' 表示水）。

::: details 點擊查看答案
```python
def num_islands(grid):
    """
    計算島嶼數量
    使用 DFS 標記連通的陸地
    """
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0
    
    def dfs(r, c):
        # 邊界檢查
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            (r, c) in visited or grid[r][c] == '0'):
            return
        
        visited.add((r, c))
        
        # 訪問四個方向
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r, c) not in visited:
                dfs(r, c)
                count += 1
    
    return count

# 測試
grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]
print(num_islands(grid))  # 3
```

**解析**: 每次找到未訪問的陸地時，使用 DFS 標記整個島嶼，島嶼數量加 1。
:::

## 重點整理

1. **圖的表示法**
   - 鄰接矩陣: O(V²) 空間，適合稠密圖
   - 鄰接串列: O(V + E) 空間，適合稀疏圖

2. **DFS (深度優先搜尋)**
   - 使用堆疊（遞迴或顯式）
   - 時間: O(V + E)
   - 適用: 路徑搜尋、環檢測、拓撲排序

3. **BFS (廣度優先搜尋)**
   - 使用佇列
   - 時間: O(V + E)
   - 適用: 最短路徑、層級遍歷

4. **常見應用**
   - 連通性檢測
   - 環檢測
   - 最短路徑（無權圖）
   - 二分圖檢測
   - 連通分量

5. **實作技巧**
   - 使用 set 記錄訪問過的節點
   - 遞迴 DFS 要注意堆疊溢位
   - BFS 一定要用 deque，不要用 list

---

[← 回到 Module 4 目錄](./index.md)
