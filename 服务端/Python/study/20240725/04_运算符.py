# 算术运算符
x = 1
y = 2

print(x + y) # 3
print(x - y) # -1
print(x * y) # 2
print(x / y) # 0.5
print(x ** y) # x *(y) x # 1
print(x // y) # 整除 # 0

# 赋值运算符
print("----------赋值运算符----------")
x = 2
print(x) # 2
x += 5
print(x) # 7
x -= 5
print(x) # 2
x *= 5
print(x) # 10
x /= 5
print(x) # 2.0
x %= 5
print(x) # 2.0
x //= 5
print(x) # 0.0
x = 2
x **= 3
print(x) # 8
x = 5
x &= 3
print(x) # 1
x |= 3
print(x) # 3
x = 5
x ^= 3
print(x) # 6
x = 5
x >>= 3
print(x) # 0
x = 5
x <<= 3
print(x) # 40

# 比较运算符
print('----------比较运算符----------')
x,y = 5,10
print(x == y) # False
print(x != y) # True
print(x > y) # False
print(x >= y) # False
print(x < y) # True
print(x <= y) # True

# 逻辑运算符
print('----------逻辑运算符----------')
print(x > 3 and y < 5) # False
print(x > 3 or y < 5) # True
print(not(x > 3 and y < 5)) # True

# 身份运算符
print('----------身份运算符----------')
x = ["apple", "banana"]
y = ["apple", "banana"]
z = x
print(x is z) # True
print(x is y) # False
print(x is not y) # True

# 成员运算符
print('----------成员运算符----------')
x = ["apple", "banana"]
print("banana" in x) # True
print("songlisheng" in x) # False
print("songlisheng" not in  x) # True

"""
  位运算符
    &   AND                       如果两个位均为 1,则将每个位设为 1。
    |   OR                        如果两位中的一位为 1,则将每个位设为 1。
    ^   XOR                       如果两个位中只有一位为 1,则将每个位设为 1。
    ~   NOT                       反转所有位。
    <<  Zero fill left shift      通过从右侧推入零来向左移动,推掉最左边的位。
    >>  Signed right shift        通过从左侧推入最左边的位的副本向右移动,推掉最右边的位。
"""