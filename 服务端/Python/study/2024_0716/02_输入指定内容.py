# # input() 函数
# username = input("请输入用户名：")
# password = input("请输入密码：")

# # print("用户名：%s" %(username), "密码：%s" %(password), sep="\n")
# print("用户名： %s" %(username))
# print("密码： %s" %(password))

age = input("请输入你的年龄：")
age = int(age)
year = 2024
# birth = year - int(age)
# print("你的出生年份是：", birth)
print("你的出生年份是：%d" %(year - age))