# while 循环
print('----------start while----------')
i = 1
while i < 7:
  print(i) # 1 2 3 4 5 6
  i += 1
print(i) # 7

print('----------break----------')
i = 1
while i < 7:
  print(i) # 1 2 3
  if i == 3:
    break
  i += 1
print(i) # 3
print('----------continue----------')
while i < 7:
  i += 1
  if i == 3:
    continue
  print(i) # 4 5 6 7
print(i) # 7
print('----------else----------')
while i < 7:
  i += 1
  if i == 3:
    continue
  print(i) # 4 5 6 7
else:
  print("else") # else
print(i) # 7
print('----------end while----------')
print('----------start for----------')
const_list = ["宋利生", "蔡露"]
for i in const_list:
  print(i) # 宋利生 蔡露
for x in "宋利生":
  print(x) # 宋 利 生
print('----------break----------')
for i in const_list:
  print(i) # 宋利生
  if i == "宋利生":
    break
print('----------continue----------')
for i in const_list:
  print(i) # 蔡露
  if i == "宋利生":
    continue
print('----------range(10)----------')
for i in range(10):
  print(i) # 0 1 2 3 4 5 6 7 8 9
print('----------range(3,10)----------')
for i in range(3,10):
  print(i) # 3 4 5 6 7 8 9
print('----------range(3,10)----------')
for i in range(3,10,2):
  print(i) # 3 5 7 9
print('----------for嵌套----------')
for i in range(3,5):
  print(i) # 3 4
  for x in range(7,9):
    print(x) # 7 8
print('----------pass----------')
for i in range(0,10):
  pass
print('----------end for----------')