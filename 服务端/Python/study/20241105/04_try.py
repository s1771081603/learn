try:
  print(x)
except NameError:
  print("Variable x is not defined")
except:
  print("Something else went wrong")

try:
  print(x)
except:
  print("Something went wrong")
finally:
  print("The 'try except' is finished")

try:
  a = open("demofile.txt")
  a.write("Lorum Ipsum")
except:
  print("Something went wrong when writing to the file")
finally:
  a.close()
# 如需抛出（引发）异常，请使用 raise 关键词。