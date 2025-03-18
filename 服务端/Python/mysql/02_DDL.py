"""
数据库操作
  1、查询
    查询所有数据库 SHOW DATABASES;
    查询当前数据库 SELECT DATABASE();

  2、创建
    CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集] [COLLATE 排序规则];

  3、删除
    DROP DATABASE [IF EXISTS] 数据库名;

  4、使用
    USE 数据库名;
"""

"""
表操作
  查询
    1、查询当前数据库中所有的表
      SHOW TABLES;

    2、查询表结构
      DESC 表名;

    3、查询指定表的建表语句
      SHOW CREATE TABLE 表名;

  创建
    CREATE TABLE 表名(
      字段1 字段1类型 [COMMENT 字段1注释],
      字段2 字段2类型 [COMMENT 字段2注释],
      字段3 字段3类型 [COMMENT 字段3注释],
      字段n 字段n类型 [COMMENT 字段n注释],
    ) [comment 注释]
"""
import mysql.connector
import socket

def get_local_ip():
  try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('10.255.255.255', 1))
    local_ip = s.getsockname()[0]
  except Exception as e:
    local_ip = '127.0.0.1'
  finally:
    s.close()
  return local_ip + ''

# 连接到数据库
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="s1771081603",
  database="learn"
)

# 检查是否连接成功
if mydb.is_connected():
  print("连接成功！")

# mycursor.execute("CREATE DATABASE IF NOT IXESTS learn")

# mycursor.execute("SHOW DATABASES")
# mysqlDatabases = mycursor.fetchall()

# for databases in mysqlDatabases:
#   for database in databases:
#     print(database)

# mycursor.execute('SELECT DATABASE()')
# curDatabase = mycursor.fetchall()
# for databases in curDatabase:
#   for database in databases:
#     print(database)
# mycursor.execute('CREATE TABLE user_login (id int comment "用户编号", username varchar(50) comment "用户名", password varchar(50) comment "密码", age int comment "年龄")')

# def createTable(tableName, s2 = "LOVE", s3='蔡露'):
#   return 'CREATE TABLE' + tableName + '()'

user_login = [
  { 'name': 'id', 'type': 'int', 'comment': '用户编号' },
  { 'name': 'username', 'type': 'varchar(50)', 'comment': '用户名' },
  { 'name': 'password', 'type': 'varchar(50)', 'comment': '密码' },
  { 'name': 'age', 'type': 'int', 'comment': '年龄' },
  { 'name': 'ganger', 'type': 'varchar(50)', 'comment': '性别' },
  { 'name': 'email', 'type': 'varchar(50)', 'comment': '邮箱' },
  { 'name': 'phone', 'type': 'varchar(13)', 'comment': '手机号' }
]

# # 创建一个游标对象;
# mycursor = mydb.cursor()
# mycursor.execute("CREATE TABLE IF EXISTS user_login (id int,username varchar(50),password varchat(50),age int)")
# # 关闭游标
# mycursor.close()

# 创建一个游标对象;
mycursor = mydb.cursor()
# mycursor.execute('SHOW TABLES')
mycursor.execute('DESC user_login')
user_login = mycursor.fetchall()
for item in user_login:
  print(item)
# 关闭游标
mycursor.close()
# 关闭连接
mydb.close()