str_01 = " SONG {} Lisheng{}, {}今年27岁{} "

# 获取指定位置处的字符。
print(str_01[1])

# 指定开始索引和结束索引，以冒号分隔，以返回字符串的一部分。
print(str_01[1:9])

# 使用负索引从字符串末尾开始切片。
print(str_01[-9:-1])

# 字符串长度
print(len(str_01))

# 字符串方法
# 删除开头和结尾的空格
print(str_01.strip())

# 返回小写字符串
print(str_01.lower())

# 返回大写字符串
print(str_01.upper())

# 通过指定字符串来替换
print(str_01.replace(' ',''))

# 通过指定字符将字符串拆分为子字符串，默认为空格
print(str_01.split())

# 检查字符串中是否包含指定短语
print("Lisheng" in str_01)

# 字符串级联（串联）
print(str_01 + "测试")

# format() 方法接受传递的参数，格式化它们，并将它们放在占位符 {} 所在的字符串中，接受不限数量的参数。
"""
  format()
  该方法接受不限量的参数，格式化他们并放在 {} 所在的字符串中。
  您可以使用索引号 {0} 来确保参数被放在正确的占位符中。
"""
print(str_01.format(1, 2, 3, '4'))


"""
  字符串方法
    capitalize()  把首字符转换为大写，其他的都转成小写。
    casefold()  把首字符转换为小写。
    center()  返回居中的字符串。
    count() 返回指定值在字符串中出现的次数。
    encode()  返回字符串的编码版本。
    endswith()  如果字符串以指定值结尾，则返回 true。
    expandtabs()  设置字符串的 tab 尺寸。
    find()  在字符串中搜索指定的值并返回它被找到的位置。
    format()  格式化字符串中的指定值。
    format_map()  格式化字符串中的指定值。
    index() 在字符串中搜索指定的值并返回它被找到的位置。
    isalnum() 如果字符串中的所有字符都是字母数字，则返回 True。
    isalpha() 如果字符串中的所有字符都在字母表中，则返回 True。
    isdecimal() 如果字符串中的所有字符都是小数，则返回 True。
    isdigit() 如果字符串中的所有字符都是数字，则返回 True。
    isidentifier()  如果字符串是标识符，则返回 True。
    islower() 如果字符串中的所有字符都是小写，则返回 True。
    isupper() 如果字符串中的所有字符都是大写，则返回 True。
    isnumeric() 如果字符串中的所有字符都是数，则返回 True。
    isprintable() 如果字符串中的所有字符都是可打印的，则返回 True。
    isspace() 如果字符串中的所有字符都是空白字符，则返回 True。
    istitle() 如果字符串遵循标题规则，则返回 True。
    join()  把可迭代对象的元素连接到字符串的末尾。
    ljust() 返回字符串的左对齐版本。
    lower() 把字符串转换为小写。
    upper() 把字符串转换为大写。
    swapcase()  切换大小写，小写成为大写，反之亦然。
    lstrip()  返回字符串的左修剪版本。
    rpartition()  返回元组，其中字符串分为三部分。
    rsplit()  在指定的分隔符处拆分字符串，并返回列表。
    rstrip()  返回字符串的右边修剪版本。
    split() 在指定的分隔符处拆分字符串，并返回列表。
    splitlines()  在换行符处拆分字符串并返回列表。
    startswith()  如果以指定值开头的字符串，则返回 true。
    strip() 返回字符串的剪裁版本。
    title() 把每个单词的首字符转换为大写。
    translate() 返回被转换的字符串。
    zfill() 在字符串的开头填充指定数量的 0 值。
"""