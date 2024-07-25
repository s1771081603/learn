'''
  文本类型： str
  数值类型： int, float, complex
  序列类型： list, tuple, range
  映射类型： dict
  集合类型： set, frozenset
  布尔类型： bool
  二进制类型： bytes, bytearray, memoryview
'''
# 设置数据类型
string = "Hello World" # str
int_01 = 27 # int
float_01 = 7.28 # float
complex_01 = 1j # complex
list_01 = [1, 2, 3] # list
tuple_01 = (1, 2, 3) # tuple
range_01 = range(0, 6) # range
dict_01 = {
  "name": "宋利生",
  "age": 27,
  "details": {
    "username": "songlisheng",
    "passworld": "s1771081603."
  }
} # dict
print(dict_01["details"]) # { "username": "songlisheng", "passworld": "s1771081603." }
print(dict_01["details"]["username"]) # songlisheng

set_01 = {1, 2, 3, "songlisheng"} # set
frozenset_01 = frozenset({1, 2, 3, "songlisheng"}) # frozenset
bool_01 = True # bool
bytes_01 = b"Hello"
bytearray_01 = bytearray(5) # bytearray
memoryview_01 = memoryview(bytes(5)) # memoryview