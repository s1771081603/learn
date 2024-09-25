# 变量仅在创建区域内可用。这称为作用域。
# 局部作用域
# 在函数内部创建的变量属于该函数的局部作用域，并且只能在该函数内部使用。
def myfunc01():
  x = '宋利生01'
  print(x)
myfunc01()
# print(x) # NameError: name 'x' is not defined

# 函数内部的函数
# 如上例中所示，变量 x 在函数外部不可用，但对于函数内部的任何函数均可用：
def myfunc02():
  x = '宋利生02'
  def myinnerfunc01():
    print(x)
  myinnerfunc01()
myfunc02()

# 全局作用域
# 在 Python 代码主体中创建的变量是全局变量，属于全局作用域。
# 全局变量在任何范围（全局和局部）中可用。
x = '宋利生03'
def myfunc():
  print(x)
myfunc()
print(x)

# 命名变量
# 如果在函数内部和外部操作同名变量，Python 会将它们视为两个单独的变量，一个在全局范围内可用（在函数外部），而一个在局部范围内可用（在函数内部）：
x = '宋利生04'
def myfunc():
  x = '宋利生05'
  print(x)
myfunc()
print(x)

# Global 关键字
# 如果您需要创建一个全局变量，但被卡在本地作用域内，则可以使用 global 关键字。
# global 关键字使变量成为全局变量。
def myfunc():
  global x
  x = '宋利生06'
myfunc()
print(x)

x = '宋利生07'
def myfunc():
  global x
  x = '宋利生08'
myfunc()
print(x)