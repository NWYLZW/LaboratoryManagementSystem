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
    replyId = db.Column(db.Integer, db.ForeignKey('LeaveMessage.id'))
    replyLeaveMessage = db.relationship('LeaveMessage', backref='replyMessages', remote_side=[id])
    # 喜欢过的用户列表
    likeUsers = db.relationship('LeaveMessageLikeUsers', backref='LeaveMessage', lazy='dynamic')
    def __init__(self, authorId:int=-1, isAnonymous:bool=False, content:str="",replyId:int=-1):
        self.authorId = authorId
        self.isAnonymous = isAnonymous
        self.content = content
        self.dateTime = timeUtil.nowDateStr()
        if replyId != -1: self.replyId = replyId
    def toDict(self,userId):
        return {
            'id':self.id,
            'authorId':self.authorId,
            'authorName':self.author.nickName,
            'isAnonymous':self.isAnonymous,
            'content':self.content,
            'dateTime':str(self.dateTime),
            'isLike':(self.likeUsers.filter_by(userId=userId).count()!=0),
            'likeNum':self.likeUsers.count(),
            'replyMessages':[leaveMessage.toDict(userId) for leaveMessage in self.replyMessages],
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

class LeaveMessageLikeUsers(db.Model):
    __tablename__ = 'LeaveMessageLikeUsers'
    id = db.Column(db.Integer, primary_key=True)
    dateTime = db.Column(db.DateTime, nullable=False)

    userId = db.Column(db.Integer, nullable=False)
    @property
    def user(self):
        return User.query.filter_by(id=self.userId).first()

    leaveMessageId = db.Column(db.Integer,db.ForeignKey('LeaveMessage.id'), nullable=False)
    def __init__(self,userId:int=-1,leaveMessageId:int=-1):
        self.dateTime = timeUtil.nowDateStr()
        self.userId = userId
        self.leaveMessageId = leaveMessageId
