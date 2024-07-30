"""
  Python 集合（数组）
  Python 编程语言中有四种集合数据类型：
    列表 List 是一种有序和可更改的集合。允许重复的成员。
    元组 Tuple 是一种有序且不可更改的集合。允许重复的成员。
    集合 Set 是一个无序和无索引的集合。没有重复的成员。
    词典 Dictionary 是一个无序，可变和有索引的集合。没有重复的成员。
"""
const_list = ["宋利生", "蔡露"]
# 列表 List 是一种有序和可更改的集合。允许重复的成员。
new_list = const_list.copy()
print(new_list) # ["宋利生", "蔡露"]
print(new_list[1])  # 蔡露
print(new_list[-1])  # 蔡露
print(new_list[1:])  # ["蔡露"]
print(new_list[-2:-1])  # ["宋利生"]
new_list[1] = "宋佳乐"
print(new_list) # ["宋利生", "宋佳乐"]
# 循环遍历每一项
for x in new_list:
  print(x) # 宋利生 宋佳乐
# 检查列表中是否存在
if "蔡露" in new_list:
  print('存在')
print(len(new_list)) # 2
# 向列表末尾添加一项
new_list.append("蔡露")
print(new_list) # ["宋利生", "宋佳乐", "蔡露"]
# 在指定的索引前添加项目
new_list.insert(0, "张凤珍")
print(new_list) # ["张凤珍", "宋利生", "宋佳乐", "蔡露"]
# 删除项目
new_list.remove("张凤珍")
print(new_list) # ["宋利生", "宋佳乐", "蔡露"]
# 删除指定的索引（如果未指定索引，则删除最后一项）
new_list.pop()
# print(new_list) # ["宋利生", "宋佳乐"]
new_list.pop(1)
print(new_list) # ["宋利生"]
# del 关键字删除指定的索引
new_list.insert(0, "蔡露")
new_list.insert(0, "张凤珍")
del new_list[0]
print(new_list) # ['蔡露', '宋利生']
del new_list
new_list = const_list.copy()
del new_list[0:len(new_list)]
print(new_list) # []
new_list = const_list.copy()
new_list.clear()
print(new_list) # []
new_list = const_list.copy()
print(new_list) # ["宋利生", "蔡露"]
new_list = list(const_list)
print(new_list) # ["宋利生", "蔡露"]
new_list.clear()
print(const_list) # ["宋利生", "蔡露"]

# 合并列表
new_list = ["测试"]
new_list = new_list + list(const_list)
print(new_list) # ["测试", "宋利生", "蔡露"]
new_list = ["测试"]
for x in const_list:
  new_list.append(x)
print(new_list) # ["测试", "宋利生", "蔡露"]
new_list = ["测试"]
new_list.extend(const_list)
print(new_list) # ["测试", "宋利生", "蔡露"]
print(new_list.index('宋利生')) # 1