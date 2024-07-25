# 创建变量
name = "宋利生"
age = 27
num1 = num2 = num3 = 20
a, b = 10, 20
print("%s %d %d %d %d %d %d" %(name, age, num1, num2, num3, a, b))


price = 10.5
weight = 7.5
money = price * weight
print("共计消费了 %.2f 元" %(money))

# type 判断是什么数据类型 isinstance(price, int)  判断价格是否是整数类型

"""
  str：字符串   + 字符串拼接   * 重复字符串
    str[0]  str[2:]   str[:4]   str[2:4]   str[2:4:2]  索引与切片
    str[::-1]   字符串反转

  int：整数
  
  float：浮点
    round(number, ndigits) number 浮点数 ndigits 四舍五入几位

    import math
    math.ceil(number)   向上取整    number 需要取整的数
    math.floor(number)   向下取整    number 需要取整的数
  
    boolean 布尔值  True   False  None、0、0.0、False、所有的空容器(空列表、空元组、空字典、空集合、空字符串)
"""

"""
  类型转换
    str()

    int(x, [基数])

    float()

    bool()
"""

# 进制转换
# int(x, n)