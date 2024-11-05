import re

txt_01 = "China is a great country"
a = re.search("^China.*country$", txt_01)
print(a)

b = re.findall("a", txt_01)
print(b)

c = re.search("\s", txt_01)
print("The first white-space character is located in position:", c.start())

d = re.search("China", txt_01)
print("The first white-space character is located in position:", d)

e = re.split("\s", txt_01)
print(e)

f = re.split("\s", txt_01, 2)
print(f)

g = re.sub("\s", "-", txt_01)
print(g)

h = re.sub("\s", "_", txt_01, 2)
print(h)

i = re.search(r"\bC\w+", txt_01)
print(i.span())
print(i.string)
print(i.group())

# 元字符
# []      一组字符	"[a-m]"	
# \	      示意特殊序列（也可用于转义特殊字符）	"\d"	
# .	      任何字符（换行符除外）	"he..o"	
# ^	      起始于	"^hello"	
# $	      结束于	"world$"	
# *	      零次或多次出现	"aix*"	
# +	      一次或多次出现	"aix+"	
# {}	    确切地指定的出现次数	"al{2}"	
# |	      两者任一	"falls|stays"	
# ()	    捕获和分组

# 特殊序列
# \A	如果指定的字符位于字符串的开头，则返回匹配项	"\AThe"	
# \b	返回指定字符位于单词的开头或末尾的匹配项	r"\bain"  r"ain\b"	
# \B	返回指定字符存在的匹配项，但不在单词的开头（或结尾处）	r"\Bain"  r"ain\B"	
# \d	返回字符串包含数字的匹配项（数字 0-9）	"\d"	
# \D	返回字符串不包含数字的匹配项	"\D"	
# \s	返回字符串包含空白字符的匹配项	"\s"	
# \S	返回字符串不包含空白字符的匹配项	"\S"	
# \w	返回一个匹配项，其中字符串包含任何单词字符（从 a 到 Z 的字符，从 0 到 9 的数字和下划线 _ 字符）	"\w"	
# \W	返回一个匹配项，其中字符串不包含任何单词字符	"\W"	
# \Z	如果指定的字符位于字符串的末尾，则返回匹配项	"Spain\Z"	

# 集合（Set）
# [arn]       返回一个匹配项，其中存在指定字符（a，r 或 n）之一
# [a-n]       返回字母顺序 a 和 n 之间的任意小写字符匹配项
# [^arn]      返回除 a、r 和 n 之外的任意字符的匹配项
# [0123]	    返回存在任何指定数字（0、1、2 或 3）的匹配项
# [0-9]	      返回 0 与 9 之间任意数字的匹配
# [0-5][0-9]	返回介于 0 到 9 之间的任何数字的匹配项
# [a-zA-Z]	  返回字母顺序 a 和 z 之间的任何字符的匹配，小写或大写
# [+]	        在集合中，+、*、.、|、()、$、{} 没有特殊含义，因此 [+] 表示：返回字符串中任何 + 字符的匹配项