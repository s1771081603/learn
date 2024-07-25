int_01 = 27 # int
float_01 = 7.28 # int
complex_01 = 2j # complex

print(type(int_01), 'int_01')
print(type(float_01), 'float_01')
print(type(complex_01), 'complex_01')

int_02 = 37216654545182186317
int_03 = -465167846
print(type(int_02), 'int_02')
print(type(int_03), 'int_03')

float_02 = 3.14
float_03 = 3.0
float_04 = -3.14
float_05 = -3.0
float_06 = 49.8e1
print(type(float_02), 'float_02')
print(type(float_03), 'float_03')
print(type(float_04), 'float_04')
print(type(float_05), 'float_05')
print(type(float_06), 'float_06')

complex_02 = 2+3j
complex_03 = -2+3j
print(type(complex_02), 'complex_02')
print(type(complex_03), 'complex_03')
print(complex_03)

import random
print(random.randrange(0,11))

# 浮点转整数会去掉小数点后的数字
print(int(2.9))
print(int(-2.9))
