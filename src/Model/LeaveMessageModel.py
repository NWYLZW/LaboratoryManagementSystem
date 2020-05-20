# -*- coding: utf-8 -*-
from src import db, MainLog
from src.Model.UserModel import User
from src.Util.TimeUtil import timeUtil

class LeaveMessage(db.Model):
    __tablename__ = "LeaveMessage"
    id = db.Column(db.Integer, primary_key=True)
    authorId = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=True)
    @property
    def author(self):
        return User.query.filter_by(id=self.authorId).first()
    isAnonymous = db.Column(db.Integer, nullable=True)
    content = db.Column(db.TEXT, nullable=True)
    dateTime = db.Column(db.DateTime, nullable=False)
    replyId = db.Column(db.Integer,db.ForeignKey('LeaveMessage.id'))
    replyLeaveMessage = db.relationship('LeaveMessage', backref='replyMessages',
                                        # 外键引用的是自身时
                                        remote_side=[id])
    # 喜欢过的用户列表
    likeUsers = db.relationship('LeaveMessageLikeUsers', backref='LeaveMessage', lazy='dynamic',
                                        # 级联删除
                                        cascade='all, delete-orphan',passive_deletes = True)
    def __init__(self, authorId:int=-1, isAnonymous:bool=False, content:str="",replyId:int=-1):
        self.authorId = authorId
        self.isAnonymous = isAnonymous
        self.content = content
        self.dateTime = timeUtil.nowDateStr()
        if replyId != -1: self.replyId = replyId
    def toDict(self,user):
        if len(self.replyMessages)>0:
            replyMessages = [leaveMessage.toDict(user) for leaveMessage in self.replyMessages]
            replyMessages.reverse()
        else:replyMessages = []
        if self.isAnonymous:
            authorId = -1
            authorName = '匿名'
        else:
            authorId = self.authorId
            authorName = self.author.nickName
        deleteAble = False
        if user.is_administrator() or self.authorId==user.id:
            deleteAble = True
        likeUsers = self.likeUsers.all()
        isLike = False
        for likeUser in likeUsers:
            if likeUser.userId == user.id:
                isLike = True;break
        return {
            'id':self.id,
            'authorId':authorId,
            'authorName':authorName,
            'isAnonymous':self.isAnonymous,
            'deleteAble':deleteAble,
            'content':self.content,
            'dateTime':str(self.dateTime),
            'isLike':isLike,
            'likeNum':len(likeUsers),
            'replyMessages':replyMessages,
        }
    def like(self,userId):
        try:
            lmlu = LeaveMessageLikeUsers.query.filter_by(
                userId=userId,
                leaveMessageId=self.id
            ).first()
            if lmlu == None:
                lmlu = LeaveMessageLikeUsers(
                    userId=userId,
                    leaveMessageId=self.id
                )
                db.session.add(lmlu)
                rspType = 0
            else:
                db.session.delete(lmlu)
                rspType = 2
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return rspType
    def delete(self,user):
        try:
            if not(user.is_administrator() or self.authorId==user.id):
                return 3
            for likeUser in self.likeUsers.all():
                db.session.delete(likeUser)
            for replyMessage in self.replyMessages:
                replyMessage.delete(user)
            db.session.delete(self)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0


class LeaveMessageLikeUsers(db.Model):
    __tablename__ = 'LeaveMessageLikeUsers'
    id = db.Column(db.Integer, primary_key=True)
    dateTime = db.Column(db.DateTime, nullable=False)

    userId = db.Column(db.Integer, nullable=False)
    @property
    def user(self):
        return User.query.filter_by(id=self.userId).first()

    leaveMessageId = db.Column(db.Integer,
                               db.ForeignKey('LeaveMessage.id'), nullable=False)
    def __init__(self,userId:int=-1,leaveMessageId:int=-1):
        self.dateTime = timeUtil.nowDateStr()
        self.userId = userId
        self.leaveMessageId = leaveMessageId
class LeaveMessageViolation(db.Model):
    __tablename__="LeaveMessageViolation"
    id=db.Column(db.Integer,primary_key=True)
    messageId=db.Column(db.Integer,nullable=False)
    userId=db.Column(db.Integer,nullable=False)
    dateTime=db.Column(db.DateTime,nullable=False)
    reportTag=db.Column(db.String,nullable=False)
    reportReason=db.Column(db.String,nullable=True)
    def __init__(self,reportReason:str=None,
                 reportTag:str=None,messageId:int=-1,userId:int=-1):
        self.userId=userId
        self.reportTag=reportTag
        self.reportReason=reportReason
        self.dateTime=timeUtil.nowDateStr()
        self.messageId=messageId
    def toDict(self,taker):
        temp={
            "messageId":self.messageId,
            "dateTime":str(self.dateTime),
            "reportTag":self.reportTag,
            "reportReason":self.reportReason
        }
        if(taker.is_administrator()):
            temp["userId"]=self.userId
        return  temp
