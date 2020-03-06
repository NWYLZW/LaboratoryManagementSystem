SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_COMMIT_TEARDOWN = True
# 用户名:密码@服务器ip:mysql数据库端口/schema名
SQLALCHEMY_DATABASE_URI = "mysql://%s:%s@%s:%s/%s?charset=utf8" % (
    'LMS',
    'YJpZC8z7atbHPNCW',
    '39.102.32.28',
    '3306',
    'test_LMS'
)
SECRET_KEY = '\xae\xebd94\x9a\x883q\xfd\xc5\x02X \x15\xfd\xcbvv\xb9\xd6j\xcf\xa0'

# 默认2小时.该值一定要比数据库wait_timeout小
# 设置为-1则不永断连
SQLALCHEMY_POOL_RECYCLE = -1
SQLALCHEMY_POOL_TIMEOUT = 20