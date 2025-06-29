# 线性变换

## 线性变换的定义

线性变换是保持向量加法和标量乘法的函数。具体来说，设 $V$ 和 $W$ 是向量空间，函数 $T: V \rightarrow W$ 是一个线性变换，如果对于所有的向量 $\mathbf{u}, \mathbf{v} \in V$ 和所有标量 $c$，满足：

1. **加法保持性**：$T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$
2. **标量乘法保持性**：$T(c\mathbf{v}) = cT(\mathbf{v})$

## 线性变换的矩阵表示

给定向量空间 $V$ 和 $W$ 的基，任何线性变换 $T: V \rightarrow W$ 都可以用一个矩阵来表示。

如果 $V$ 的一组基是 $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n\}$，$W$ 的一组基是 $\{\mathbf{w}_1, \mathbf{w}_2, \ldots, \mathbf{w}_m\}$，那么线性变换 $T$ 可以用一个 $m \times n$ 矩阵 $A$ 表示，其中 $A$ 的第 $j$ 列是 $T(\mathbf{v}_j)$ 在 $W$ 的基下的坐标。

## 线性变换的核与像

线性变换 $T: V \rightarrow W$ 的**核**（或零空间）是 $V$ 中映射到零向量的所有向量的集合：

$$\text{ker}(T) = \{\mathbf{v} \in V : T(\mathbf{v}) = \mathbf{0}\}$$

线性变换 $T: V \rightarrow W$ 的**像**（或值域）是 $W$ 中所有可以由 $V$ 中的向量通过 $T$ 映射得到的向量的集合：

$$\text{im}(T) = \{T(\mathbf{v}) : \mathbf{v} \in V\}$$

## 秩-零化度定理

对于线性变换 $T: V \rightarrow W$，有：

$$\text{dim}(V) = \text{dim}(\text{ker}(T)) + \text{dim}(\text{im}(T))$$

其中 $\text{dim}(\text{ker}(T))$ 称为 $T$ 的**零化度**，$\text{dim}(\text{im}(T))$ 称为 $T$ 的**秩**。

## 线性变换的类型

### 单射（一对一）

线性变换 $T: V \rightarrow W$ 是单射，当且仅当 $\text{ker}(T) = \{\mathbf{0}\}$。

### 满射（映上）

线性变换 $T: V \rightarrow W$ 是满射，当且仅当 $\text{im}(T) = W$。

### 同构

线性变换 $T: V \rightarrow W$ 是同构，当且仅当 $T$ 既是单射又是满射。这意味着 $V$ 和 $W$ 具有相同的维数，并且 $T$ 是可逆的。

## 线性变换的例子

### 旋转

在 $\mathbb{R}^2$ 中，逆时针旋转 $\theta$ 角度的线性变换可以用矩阵表示为：

$$A = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

### 投影

在 $\mathbb{R}^n$ 中，将向量投影到由法向量 $\mathbf{n}$ 确定的超平面上的线性变换可以用矩阵表示为：

$$P = I - \frac{\mathbf{n}\mathbf{n}^T}{\mathbf{n}^T\mathbf{n}}$$

其中 $I$ 是单位矩阵。

### 反射

在 $\mathbb{R}^n$ 中，关于由法向量 $\mathbf{n}$ 确定的超平面的反射可以用矩阵表示为：

$$R = I - 2\frac{\mathbf{n}\mathbf{n}^T}{\mathbf{n}^T\mathbf{n}}$$

## 线性变换的复合

两个线性变换的复合仍然是线性变换。如果 $T: U \rightarrow V$ 和 $S: V \rightarrow W$ 是线性变换，那么它们的复合 $S \circ T: U \rightarrow W$ 也是线性变换。

在矩阵表示下，如果 $T$ 由矩阵 $A$ 表示，$S$ 由矩阵 $B$ 表示，那么 $S \circ T$ 由矩阵 $BA$ 表示。
