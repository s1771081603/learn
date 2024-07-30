"""
  Python 类/对象
  Python 是一种面向对象的编程语言。
  Python 中的几乎所有东西都是对象，拥有属性和方法。
  类（Class）类似对象构造函数，或者是用于创建对象的“蓝图”。
"""
# 创建类 如需创建类，请使用 class 关键字：
class user_class:
  name = '宋利生'
  age = 27
user = user_class()
print(user.name, user.age) # 宋利生 27 

"""
  __init__() 函数
  上面的例子是最简单形式的类和对象，在实际应用程序中并不真正有用。
  要理解类的含义，我们必须先了解内置的 __init__() 函数。
  所有类都有一个名为 __init__() 的函数，它始终在启动类时执行。
  使用 __init__() 函数将值赋给对象属性，或者在创建对象时需要执行的其他操作：
"""
class user_info_class:
  def __init__(self, name, age):
    self.name = name
    self.age = age
  def userInfo(self):
    print("用户名：" + self.name + '，' + "年龄：" + str(self.age))

user = user_info_class('宋利生', 27)
user.userInfo() # 用户名：宋利生，年龄：27

# self 参数是对类的当前实例的引用，用于访问属于该类的变量。
# 它不必被命名为 self，您可以随意调用它，但它必须是类中任意函数的首个参数。
class test_01:
  def __init__(a, name = '宋利生', age = 27):
    a.name = name
    a.age = age
  def fun(b):
    print(b.name, b.age)
test01 = test_01('宋利生', 27)
test01.fun() # 宋利生 27
test01.name = "蔡露"
test01.fun() # 蔡露 27
del test01.age
# test01.fun() # AttributeError: 'test_01' object has no attribute 'age'
del test01
# print(test01) # NameError: name 'test01' is not defined. Did you mean: 'test_01'?
test01 = test_01()
print(test01.name, test01.age) # 宋利生 27