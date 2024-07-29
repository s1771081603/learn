"""
  Python 集合（数组）
  Python 编程语言中有四种集合数据类型：
    列表 List 是一种有序和可更改的集合。允许重复的成员。
    元组 Tuple 是一种有序且不可更改的集合。允许重复的成员。
    集合 Set 是一个无序和无索引的集合。没有重复的成员。
    词典 Dictionary 是一个无序，可变和有索引的集合。没有重复的成员。
"""
CONST_USER_NAME_LIST = ["宋利生", "蔡露"]
# 列表
userNameList = CONST_USER_NAME_LIST.copy()
print(userNameList) # ["宋利生", "蔡露"]
print(userNameList[1])  # 蔡露
print(userNameList[-1])  # 蔡露
print(userNameList[1:])  # ["蔡露"]
print(userNameList[-2:-1])  # ["宋利生"]
userNameList[1] = "宋佳乐"
print(userNameList) # ["宋利生", "宋佳乐"]
# 循环遍历每一项
for x in userNameList:
  print(x) # 宋利生 宋佳乐
# 检查列表中是否存在
if "蔡露" in userNameList:
  print('存在')
print(len(userNameList)) # 2
# 向列表末尾添加一项
userNameList.append("蔡露")
print(userNameList) # ["宋利生", "宋佳乐", "蔡露"]
# 在指定的索引前添加项目
userNameList.insert(0, "张凤珍")
print(userNameList) # ["张凤珍", "宋利生", "宋佳乐", "蔡露"]
# 删除项目
userNameList.remove("张凤珍")
print(userNameList) # ["宋利生", "宋佳乐", "蔡露"]
# 删除指定的索引（如果未指定索引，则删除最后一项）
userNameList.pop()
# print(userNameList) # ["宋利生", "宋佳乐"]
userNameList.pop(1)
print(userNameList) # ["宋利生"]
# del 关键字删除指定的索引
userNameList.insert(0, "蔡露")
userNameList.insert(0, "张凤珍")
del userNameList[0]
print(userNameList) # ['蔡露', '宋利生']
del userNameList
userNameList = CONST_USER_NAME_LIST.copy()
del userNameList[0:len(userNameList)]
print(userNameList) # []
userNameList = CONST_USER_NAME_LIST.copy()
userNameList.clear()
print(userNameList) # []
userNameList = CONST_USER_NAME_LIST.copy()
print(userNameList) # ["宋利生", "蔡露"]
userNameList = list(CONST_USER_NAME_LIST)
print(userNameList) # ["宋利生", "蔡露"]
userNameList.clear()
print(CONST_USER_NAME_LIST) # ["宋利生", "蔡露"]

# 合并列表
userNameList = ["测试"]
userNameList = userNameList + list(CONST_USER_NAME_LIST)
print(userNameList) # ["测试", "宋利生", "蔡露"]
userNameList = ["测试"]
for x in CONST_USER_NAME_LIST:
  userNameList.append(x)
print(userNameList) # ["测试", "宋利生", "蔡露"]
userNameList = ["测试"]
userNameList.extend(CONST_USER_NAME_LIST)
print(userNameList) # ["测试", "宋利生", "蔡露"]
print(userNameList.index('宋利生')) # 1