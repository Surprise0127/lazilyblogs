# 矩阵

## 矩阵的基本概念

矩阵是一个按照长方阵列排列的复数或实数集合，它是线性代数中的基本概念之一。通常用大写字母表示矩阵，如矩阵 $A$。

矩阵的一般形式：

$$
A = \begin{bmatrix} 
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$

## 矩阵的类型

### 方阵
行数和列数相等的矩阵称为方阵。

### 对角矩阵
主对角线以外的元素都为零的方阵。

### 单位矩阵
主对角线上的元素都为1，其余元素都为0的方阵，通常用 $I$ 或 $E$ 表示。

### 零矩阵
所有元素都为0的矩阵，通常用 $O$ 表示。

### 上三角矩阵
主对角线以下的元素都为0的方阵。

### 下三角矩阵
主对角线以上的元素都为0的方阵。

## 矩阵的运算

### 矩阵加法
矩阵加法只能在同型矩阵之间进行，对应位置的元素相加。

### 矩阵数乘
矩阵的数乘是指将矩阵的每个元素都乘以同一个数。

### 矩阵乘法
两个矩阵相乘的条件是第一个矩阵的列数等于第二个矩阵的行数。

设 $A$ 是 $m \times n$ 矩阵，$B$ 是 $n \times p$ 矩阵，则它们的乘积 $C = AB$ 是 $m \times p$ 矩阵，其中：

$$c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj}$$

### 矩阵转置
矩阵的转置是指将矩阵的行和列互换，记作 $A^T$。

## 矩阵的行列式

方阵的行列式是一个标量，可以用来判断矩阵是否可逆。记作 $\det(A)$ 或 $|A|$。

## 矩阵的秩

矩阵的秩是指矩阵中线性无关的行或列的最大数目，记作 $\text{rank}(A)$。

## 矩阵的逆

如果存在矩阵 $B$ 使得 $AB = BA = I$，则称 $B$ 为矩阵 $A$ 的逆矩阵，记作 $A^{-1}$。

只有行列式不为零的方阵才存在逆矩阵。
