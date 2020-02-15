# config=utf-8
import pymysql
pymysql.install_as_MySQLdb()
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from src import db

class User(UserMixin, db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(128), unique=False)
    def is_authenticated(self):
        return True
    @property
    def is_active(self):
        return True
    def is_anonymous(self):
        return False
    @property
    def password(self):
        raise AttributeError('不能直接获取明文密码！')
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    def __repr__(self):
        return "<User '{:s}>".format(self.userName)