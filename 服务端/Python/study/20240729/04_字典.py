# 字典 dict 无序、可变和有索引的集合。
const_dict = {'username': '宋利生', 'age': '27'}
new_dict = const_dict.copy()
print(new_dict) # {'username': '宋利生', 'age': '27'}
print(new_dict['username']) # 宋利生
print(new_dict.get('username')) # 宋利生
new_dict['username'] = "蔡露"
print(new_dict) # {'username': '蔡露', 'age': '27'}
for x in new_dict:
  print(x) # username age
for x in new_dict:
  print(new_dict[x]) # 蔡露 27
for x in new_dict.values():
  print(x)  # 蔡露 27
for x, y in new_dict.items():
  print(x, y) # username 蔡露 age 27
if "username" in new_dict:
  print("存在用户名")
print(len(new_dict)) # 2
new_dict["passworld"] = "s1771081603"
print(new_dict) # {'username': '蔡露', 'age': '27', 'passworld': 's1771081603'}
new_dict.pop("passworld")
print(new_dict) # {'username': '蔡露', 'age': '27'}
new_dict.popitem()
print(new_dict) # {'username': '蔡露'}
new_dict = const_dict.copy()
del new_dict['username']
print(new_dict) # {'age': '27'}
del new_dict
new_dict = const_dict.copy()
new_dict.clear()
print(new_dict) # {}
new_dict = dict(const_dict)
print(new_dict) # {'username': '宋利生', 'age': '27'}
new_dict01 = const_dict.copy()
new_dict02 = const_dict.copy()
new_dict03 = const_dict.copy()
new_dict04 = {
  "new_dict01": new_dict01,
  "new_dict02": new_dict02,
  "new_dict03": new_dict03
}
print(new_dict04)
print(dict.fromkeys(new_dict, 'username')) # 'username': 'username', 'age': 'username'}