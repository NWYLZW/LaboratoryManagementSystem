import pymysql
from sqlalchemy import and_

from src.Controler.MarkControler import markControler
from src.Model.RoleModel import Role, Permission
from src.Util.TimeUtil import timeUtil

pymysql.install_as_MySQLdb()
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from src import db, MainLog


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
                 professionalClassId: str = "", email: str = ""):
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
        '''
        判断是否有权限
        :param permissions: 权限类型
        :return: 是否拥有某个权限
        '''
        return self.role is not None and (self.role.permissions & permissions) == permissions
    def is_administrator(self):
        '''
        判断是否有管理权限
        :return: 是否有超管权限
        '''
        return self.can(Permission.ADMINISTER)

    @property
    def sex(self):
        if self.sexBool:
            return "male"
        else:
            return "female"
    @sex.setter
    def sex(self, sex):
        if sex == "0":
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

    @property
    def registerTime(self):
        userRegisterTime = UserRegisterTime.query.filter_by(self.userId).first()
        if userRegisterTime != None:
            return userRegisterTime
        try:
            userRegisterTime = UserRegisterTime(userId=self.id)
            db.session.add(userRegisterTime)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"获取专业班级失败 错误信息:")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return userRegisterTime
    def fuzzySearchRule(self, file, listWords):
        return and_(*[file.like('%' + w + '%') for w in listWords])

    def toBriefDict(self):
        return {
            "id": self.id,
            "schoolID": self.schoolID,
            "nickName": self.nickName,
            "maleBool": self.sexBool,
            "directionName": self.direction.name,
            "directionImgName": self.direction.imgName,
            "laboratoryName": self.laboratory.blockNum + '-' + self.laboratory.doorNum,
            "professionalClass": self.professionalClass.getProfessionalClass(),
            "markNumInYear": markControler.getMarkNum(self.id),
        }

    def toDict(self):
        return {
            "id": self.id,
            "schoolID": self.schoolID,
            "nickName": self.nickName,
            "maleBool": self.sexBool,
            "qqNum": self.qqNum,
            "telNum": self.telNum,
            "roleId": self.roleId,
            "roleName": self.role.name,
            "directionName": self.direction.name,
            "directionImgName": self.direction.imgName,
            "laboratoryName": self.laboratory.blockNum + '-' + self.laboratory.doorNum,
            "professionalClass": self.professionalClass.getProfessionalClass(),
        }


class UserRegisterTime(db.Model):
    RegisterTime = db.Column(db.datetime, nullable=False)
    userId = db.Column(db.Integer, nullable=False)

    def __init__(self,userId:int=-1):
        if userId == -1:
            return None
        self.userId=userId
        if self.RegisterTime == None:
            self.RegisterTime = timeUtil.nowDateStr()
