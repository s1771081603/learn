myName = "宋利生"
title = "2024年，我要" # 统一用的头
"""
  print(sep, end)
    sep       设置打印多个内容的分隔符
    end       设置执行结束后的操作

    格式化输出
      %s  字符串
      %d  数字  %2d   两位数字    %02d    不足两位用0填充
      %f  浮点数    %.1f    保留一位小数
"""
print("我是", myName, sep = "")
print(title, "减肥", sep = "", end="\n\n")
print(title, "读100本书", sep = "", end="\n\n")
print(title, "去10个城市旅游", sep = "", end="\n\n")

year = 2024
month = 7
day = 15
week = "一"
weather = "晴"
temp = 19.5
print("今天是 %d 年 %02d 月 %d 日， 星期 %s 天气 %s 温度 %.1f 度" %(year, month, day, week, weather, temp))