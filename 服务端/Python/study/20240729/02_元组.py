# 元组 Tuple 是一种有序且不可更改的集合，允许重复的成员。
const_tuple = ("宋利生", "LOVE", "蔡露")
print(const_tuple[1]) # LOVE
print(const_tuple[-2]) # LOVE
print(const_tuple[1:2]) # ("LOVE",)
print(const_tuple[-3:-1]) # ("宋利生", "LOVE")

new_tuple = list(const_tuple)
new_tuple[1] = "LIKE"
new_tuple = tuple(new_tuple)
print(new_tuple) # ("宋利生", "LIKE", "蔡露")
# 循环
for x in new_tuple:
  print(x) # 宋利生 LIKE 蔡露

# 判断是否在元组里
if "LIKE" in new_tuple:
  print("是的，存在喜欢")

# 长度
print(len(const_tuple)) # 3

# 单项元组必须加 ,
new_tuple = ("apple",)
print(type(new_tuple)) # tuple
new_tuple = ("apple")
print(type(new_tuple)) # str

# del 关键字删除
del new_tuple

# 合并元组
new_tuple = const_tuple
new_tuple = new_tuple + const_tuple
print(new_tuple) # ('宋利生', 'LOVE', '蔡露', '宋利生', 'LOVE', '蔡露')
print(new_tuple.count('LOVE')) # 2
new_tuple = tuple(const_tuple)
print(type(new_tuple)) # tuple