import pymysql
from sqlalchemy import and_

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
    maleBool = db.Column(db.Boolean, unique=False)
    passwordHash = db.Column(db.String(128), unique=False)

    roleId = db.Column(db.Integer, db.ForeignKey('Role.id'))
    directionId = db.Column(db.Integer, db.ForeignKey('Direction.id'))
    # laboratoryId = db.Column(db.Integer, db.ForeignKey('Laboratory.id'))
    # professionalClassId = db.Column(db.Integer, db.ForeignKey('ProfessionalClass.id'))

    qqNum = db.Column(db.String(64), unique=False)
    telNum = db.Column(db.String(64), unique=False)

    # directionId = db.Column(db.String(64), unique=False)
    laboratoryName = db.Column(db.String(64), unique=False)
    professionalClass = db.Column(db.String(64), unique=False)
    def __init__(self,
                 userName: str = "", nickName: str = "", password: str = "", male: int = 1,
                 directionId: int = -1, qqNum: str = "", telNum: str = "", laboratoryName: str = "",
                 professional: str = "",gradle: str = "",classNum: str = ""):
        self.userName = userName
        self.nickName = nickName
        self.password = password
        self.sex = male
        self.directionId = directionId
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
    def sex(self):
        if self.maleBool:
            return "male"
        else:
            return "female"
    @sex.setter
    def sex(self, sex):
        if sex==1 or sex== "1":
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

    def fuzzySearchRule(self,file,listWords):
        return and_(*[file.like('%'+w+'%') for w in listWords])

    def toBriefDict(self):
        return {
            "userName":self.userName,
            "nickName":self.nickName,
            "maleBool":self.maleBool,
            "directionName":self.direction.name,
            "laboratoryName":self.laboratoryName,
            "professionalClass":self.professionalClass,
        }
    def toDict(self):
        return {
            "id":self.id,
            "userName":self.userName,
            "nickName":self.nickName,
            "maleBool":self.maleBool,
            "qqNum":self.qqNum,
            "telNum":self.telNum,
            "roleId":self.roleId,
            "directionName":self.direction.name,
            "laboratoryName":self.laboratoryName,
            "professionalClass":self.professionalClass,
        }
