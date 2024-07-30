"""
  Python 继承
  继承允许我们定义继承另一个类的所有方法和属性的类。
  父类是继承的类，也称为基类。
  子类是从另一个类继承的类，也称为派生类。

  如果您不想向该类添加任何其他属性或方法，请使用 pass 关键字。

  我们想要把 __init__() 函数添加到子类（而不是 pass 关键字）。
  当您添加 __init__() 函数时，子的 __init__() 函数会覆盖对父的 __init__() 函数的继承，子类将不再继承父的 __init__() 函数。
"""
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

# 如果您不想向该类添加任何其他属性或方法，请使用 pass 关键字。
class Student_01(Person):
  pass

# 我们想要把 __init__() 函数添加到子类（而不是 pass 关键字）。
# 当您添加 __init__() 函数时，子的 __init__() 函数会覆盖对父的 __init__() 函数的继承，子类将不再继承父的 __init__() 函数。
class Student_02(Person):
  def __init__(self, name, age):
    self.name = age
    self.age = name

# 如需保持父的 __init__() 函数的继承，请添加对父的 __init__() 函数的调用：
class Student_03(Person):
  def __init__(self, name, age):
    Person.__init__(self,name, age)

# Python 还有一个 super() 函数，它会使子类从其父继承所有方法和属性：
class Student_04(Person):
  def __init__(self, name, age, year):
    super().__init__(name, age)
    self.year = year
  def fun(self):
    print(self.name, self.age, self.year)
student01 = Student_04('宋利生', 27, 1997)
student01.fun()