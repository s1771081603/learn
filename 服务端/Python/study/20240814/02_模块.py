# Python 模块
# 创建模块
# 如需创建模块，只需将所需代码保存在文件扩展名为 .py 的文件中：

# 使用模块
# 现在，我们就可以用 import 语句来使用我们刚刚创建的模块：
import mymodule
mymodule.greeting("Bill")
a = mymodule.person1
print(a)

import mymodule as mx
b = mx.person1
print(b)

import platform

# d = dir(platform)
# for e in d:
#   print(e)

c = platform.system()
print(c)

from mymodule import person1

print (person1["age"])