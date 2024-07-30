# 集合 set 无序无索引
const_set = { "宋利生", "LOVE", "蔡露" }
new_set = const_set.copy()
for x in new_set:
  print(x) # 宋利生 LOVE 蔡露 无序
print("LOVE" in new_set) # True
# 添加项目
new_set.add("张凤珍")
print(new_set) # { "你猜", "宋利生", "LOVE", "蔡露" } 无序
new_set.update(["张凤珍", "宋秋兵", "宋佳乐"])
print(new_set) # { "张凤珍", "宋利生", "LOVE", "蔡露", "宋秋兵", "宋佳乐" }
print(len(new_set)) # 6
new_set.remove("宋佳乐")
print(new_set) # { "张凤珍", "宋利生", "LOVE", "蔡露", "宋秋兵" }
# new_set.remove("宋佳乐") # 会报错
new_set.discard("宋佳乐") # 不会报错
print(new_set)
new_set.clear()
print(new_set) # set()
del new_set
new_set = { "张凤珍", "宋秋兵", "宋佳乐" }
print(new_set)
new_set = new_set.union(const_set.copy())
print(new_set) # { "张凤珍", "宋利生", "LOVE", "蔡露", "宋秋兵", "宋佳乐" }
new_set = { "张凤珍", "宋秋兵", "宋佳乐" }
new_set.update(const_set.copy())
print(new_set) # { "张凤珍", "宋利生", "LOVE", "蔡露", "宋秋兵", "宋佳乐" }