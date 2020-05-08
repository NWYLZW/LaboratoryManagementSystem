from src import db, MainLog
from src.Model.UserModel import User
from src.Util.TimeUtil import timeUtil

class Notice(db.Model):
    __tablename__ = 'Notice'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    dateTime = db.Column(db.DateTime, nullable=False)
    # 类型 总公告 方向公告 实验室公告
    kindNum = db.Column(db.Integer, nullable=False)
    # 类型信息 方向名 实验室门牌号
    message = db.Column(db.String, default="")
    # 查阅过的用户列表
    viewUsers = db.relationship('NoticeViewUsers', backref='notice', lazy='dynamic')

    authorId = db.Column(db.Integer, nullable=False)
    @property
    def author(self):
        return User.query.filter_by(id=self.authorId).first()

    def __init__(self,title:str="",content:str="",kindNum:int=-1,message:str="",authorId:int=-1):
        self.dateTime = timeUtil.nowDateStr()
        self.title = title
        self.content = content
        self.kindNum = kindNum
        self.message = message
        self.authorId = authorId
    def toDict(self,userId):
        rspDict = {
            'id':self.id,
            'authorId':self.authorId,
            'authorName':self.author.nickName,
            'title':self.title,
            'content':self.content,
            'message':self.message,
            'kindNum':self.kindNum,
            'dateTime':str(self.dateTime),
            'isView':(self.viewUsers.filter_by(userId=userId).count()!=0),
            'viewCount':self.viewUsers.count(),
        }
        if userId == self.authorId:rspDict['viewUsers']=[viewUser.toDict() for viewUser in self.viewUsers]
        return rspDict
    @staticmethod
    def addNotice(title:str="",content:str="",kindNum:int=-1,message:str="",authorId:int=-1):
        try:
            db.session.add(Notice(title,content,kindNum,message,authorId))
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"查看消息数据库记录用户错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    def viewThis(self,userId):
        try:
            if NoticeViewUsers.query.filter_by(userId=userId,noticeId=self.id).count() != 0:
                return
            db.session.add(NoticeViewUsers(userId=userId,noticeId=self.id))
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"查看消息数据库记录用户错误")
            MainLog.record(MainLog.level.ERROR,e)
        db.session.commit()
    pass
class NoticeViewUsers(db.Model):
    __tablename__ = 'NoticeViewUsers'
    id = db.Column(db.Integer, primary_key=True)
    dateTime = db.Column(db.DateTime, nullable=False)

    userId = db.Column(db.Integer, nullable=False)
    @property
    def user(self):
        return User.query.filter_by(id=self.userId).first()

    noticeId = db.Column(db.Integer,db.ForeignKey('Notice.id'), nullable=False)
    def __init__(self,userId:int=-1,noticeId:int=-1):
        self.dateTime = timeUtil.nowDateStr()
        self.userId = userId
        self.noticeId = noticeId
    def toDict(self):
        return {
            'id':self.id,
            'userId':self.userId,
            'userName':self.user.nickName,
            'dateTime':str(self.dateTime),
        }
