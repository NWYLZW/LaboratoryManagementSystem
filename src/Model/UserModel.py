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
    schoolID = db.Column(db.String(32), unique=True)
    nickName = db.Column(db.String(32), nullable=False)
    sexBool = db.Column(db.Boolean, nullable=False)
    passwordHash = db.Column(db.String(128), nullable=False)

    roleId = db.Column(db.Integer, db.ForeignKey('Role.id'))
    directionId = db.Column(db.Integer, db.ForeignKey('Direction.id'))
    laboratoryId = db.Column(db.Integer, db.ForeignKey('Laboratory.id'))
    professionalClassId = db.Column(db.Integer, db.ForeignKey('ProfessionalClass.id'))

    email = db.Column(db.String(64))
    qqNum = db.Column(db.String(64))
    telNum = db.Column(db.String(64))
    def __init__(self,
                 schoolID: str = "", nickName: str = "", password: str = "", sex: int = 1,
                 directionId: int = -1, qqNum: str = "", telNum: str = "", laboratoryId: str = "",
                 professionalClassId: str = "", email:str = ""):
        self.schoolID = schoolID
        self.nickName = nickName
        self.password = password
        self.sex = sex
        self.email = email
        self.qqNum = qqNum
        self.telNum = telNum
        self.directionId = directionId
        self.laboratoryId = laboratoryId
        self.professionalClassId = professionalClassId
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
        return "<User '{:s}>".format(self.schoolID)

    def can(self, permissions):
        return self.role is not None and (self.role.permissions & permissions) == permissions
    def is_administrator(self):
        return self.can(Permission.ADMINISTER)

    @property
    def sex(self):
        if self.sexBool:
            return "male"
        else:
            return "female"
    @sex.setter
    def sex(self, sex):
        if sex== "0":
            self.sexBool = True
        else:
            self.sexBool = False
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
            "userName":self.schoolID,
            "nickName":self.nickName,
            "maleBool":self.sexBool,
            "directionName":self.direction.name,
            "laboratoryName":self.laboratoryName,
            "professionalClass":self.professionalClass,
        }
    def toDict(self):
        return {
            "id":self.id,
            "userName":self.schoolID,
            "nickName":self.nickName,
            "maleBool":self.sexBool,
            "qqNum":self.qqNum,
            "telNum":self.telNum,
            "roleId":self.roleId,
            "directionName":self.direction.name,
            "laboratoryName":self.laboratoryName,
            "professionalClass":self.professionalClass,
        }
