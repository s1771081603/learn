# open() 函数有两个参数：文件名和模式。
# 有四种打开文件的不同方法（模式）：
#   "r" - 读取 - 默认值。打开文件进行读取，如果文件不存在则报错。
#   "a" - 追加 - 打开供追加的文件，如果不存在则创建该文件。
#   "w" - 写入 - 打开文件进行写入，如果文件不存在则创建该文件。
#   "x" - 创建 - 创建指定的文件，如果文件存在则返回错误。
# 此外，您可以指定文件是应该作为二进制还是文本模式进行处理。
#   "t" - 文本 - 默认值。文本模式。
#   "b" - 二进制 - 二进制模式（例如图像）。

# # a = open("./服务端/Python/study/20241105/myfile.txt", "x")
# b = open('./服务端/Python/study/20241105/myfile.txt', 'r')
# # print(b)
# # open() 函数返回文件对象，此对象有一个 read() 方法用于读取文件的内容：
# print(b.read())
# # 默认情况下，read() 方法返回整个文本，但您也可以指定要返回的字符数：
# # print(b.read(5))
# # 您可以使用 readline() 方法返回一行：
# # print(b.readline())
# # print(b.readline())
# # for x in b:
# #   print(x)
# b.close()

c = open('./服务端/Python/study/20241105/myfile.txt', 'w')
c.write("\nNow the file has more content!")
c.close()

d = open("./服务端/Python/study/20241105/myfile.txt", "r")
print(d.read())

import os
if os.path.exists("./服务端/Python/study/20241105/myfile.txt"):
  os.remove("./服务端/Python/study/20241105/myfile.txt")
else:
  print("The file does not exist")
# 删除文件夹
# os.rmdir("myfolder")