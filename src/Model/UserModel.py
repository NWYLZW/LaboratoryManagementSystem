# config=utf-8
import pymysql

from src.Model.RoleModel import Role, Permission

pymysql.install_as_MySQLdb()
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from src import db

class User(UserMixin, db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(32), unique=True)
    nickName = db.Column(db.String(32), unique=False)
    passwordHash = db.Column(db.String(128), unique=False)

    roleId = db.Column(db.Integer, db.ForeignKey('Role.id'))

    maleBool = db.Column(db.Boolean, unique=False)
    directionName = db.Column(db.String(64), unique=False)
    qqNum = db.Column(db.String(64), unique=False)
    telNum = db.Column(db.String(64), unique=False)
    laboratoryName = db.Column(db.String(64), unique=False)
    professionalClass = db.Column(db.String(64), unique=False)
    def __init__(self,
                 userName: str = "", nickName: str = "", password: str = "", male: int = 1,
                 directionName: str = "", qqNum: str = "", telNum: str = "", laboratoryName: str = "",
                 professional: str = "",gradle: str = "",classNum: str = ""):
        self.userName = userName
        self.nickName = nickName
        self.password = password
        self.male = male
        self.directionName = directionName
        self.qqNum = qqNum
        self.telNum = telNum
        self.laboratoryName = laboratoryName
        self.professionalClass = professional + '-' + gradle + '-' + classNum
        if self.roleId is None:
            self.roleId = Role.query.filter_by(default=True).first().id
        pass
    def is_authenticated(self):
        return True
    @property
    def is_active(self):
        return True
    def is_anonymous(self):
        return False
    def __repr__(self):
        return "<User '{:s}>".format(self.userName)
    def can(self, permissions):
        return self.role is not None and (self.role.permissions & permissions) == permissions
    def is_administrator(self):
        return self.can(Permission.ADMINISTER)

    @property
    def role(self):
        if self.roleId is None:
            self.roleId = Role.query.filter_by(default=True).first().id
        return Role.query.filter_by(id=self.roleId).first()
    @role.setter
    def role(self,roleId):
        self.roleId = roleId
    @property
    def professionalClassX(self):
        return self.professionalClass
    @professionalClassX.setter
    def professionalClassX(self, professionalClassX):
        '''
        :param professionalClass: professional+'-'+gradle+'-'+classNum
        :return:
        '''
        self.professionalClass = professionalClassX
    @property
    def male(self):
        if self.maleBool:
            return "male"
        else:
            return "female"
    @male.setter
    def male(self,male):
        if male==1 or male=="1":
            self.maleBool = True
        else:
            self.maleBool = False
    @property
    def password(self):
        raise AttributeError('不能直接获取明文密码！')
    @password.setter
    def password(self, password):
        self.passwordHash = generate_password_hash(password)
    def verify_password(self, password):
        return check_password_hash(self.passwordHash, password)