# lambda 函数是一种小的匿名函数，可接受任意数量的参数，但只能有一个表达式。
fun01 = lambda a : a * 5
print(fun01(3)) # 15
fun02 = lambda a, b : a * b
print(fun02(5,6)) # 30
def fun03(n):
  return lambda a : a * n
print(fun03(2)(5)) # 10
print(fun03(3)(5)) # 15