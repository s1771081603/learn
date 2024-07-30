# Python 条件和 If 语句
a,b,c = 10, 20, 30
if a > 5:
  print("a > 5")
elif b > 30:
  print("b > 30")
else:
  print("都不满足")

if a > 10 and b > 20:
  print("a > 10 and b > 20")
else:
  print("a <= 10 or b <= 20")

if a > 10 or b >15:
  print("a > 10 or b > 15")
else:
  print("a <= 10 and b <= 15")

# if 语句不能为空，但是如果您处于某种原因写了无内容的 if 语句，请使用 pass 语句来避免错误。
if a > 20:
  pass