import datetime

a = datetime.datetime.now()
print(a)
print(a.year)
print(a.strftime("%A"))

b = datetime.datetime(2024, 11, 5, 18, 30, 0, 0)
print(b)
print(b.strftime("%Y-%m-%d %H:%M:%S"))