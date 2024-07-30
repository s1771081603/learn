"""
  函数是一种仅在调用时运行的代码块。
  您可以将数据（称为参数）传递到函数中。
  函数可以把数据作为结果返回。
"""
# 函数
def fun01():
  print("测试一下python的函数")
fun01() # 测试一下python的函数

# 参数
def fun02(userName):
  print("用户名：" + userName)
fun02("宋利生") # 用户名：宋利生
fun02("蔡露") # 用户名：蔡露

# 默认参数
def fun03(age = 27):
  print("年龄：" +  str(age))
fun03() # 年龄：27
fun03(18) # 年龄：18

# list 传参数
def fun04(list = []):
  for x in list:
    print(x)
fun04(['宋利生', '蔡露']) # 宋利生 蔡露

# 返回值
def fun05(num):
  return num * 5
print(fun05(3)) # 15
print(fun05(5)) # 25

# 关键字参数
def fun06(s1='宋利生', s2 = "LOVE", s3='蔡露'):
  print(s1, s2, s3)
fun06() # 宋利生 LOVE 蔡露
fun06(s3='宋利生', s1='蔡露') # 蔡露 LOVE 宋利生

# 任意参数
def fun07(*test):
  print(test[0])
fun07("宋利生", "蔡露", "LOVE") # 宋利生

# pass 函数定义不能为空，但是如果您出于某种原因写了无内容的函数定义，请使用 pass 语句来避免错误
def fun08():
  pass

def tri_fun(k):
  print("k：" + str(k))
  if(k > 0):
    result = k + tri_fun(k-1)
    print(result)
  else:
    result = 0
  return result
tri_fun(5)