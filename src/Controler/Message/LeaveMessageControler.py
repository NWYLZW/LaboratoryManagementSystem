# -*- coding: utf-8 -*-
from src import MainLog, db
from src.Model.LeaveMessageModel import LeaveMessage

class LeaveMessageControler:
    def __init__(self):
        pass
    def addLeaveMessage(self, authorId:int=-1, isAnonymous:bool=False, content:str=""):
        '''
        :param authorId: 留言用户id
        :param isAnonymous: 是否匿名
        :param content: 留言的内容
        :return: {
        0:'留言成功',
        1:'数据库错误',
        }
        '''
        try:
            leaveMessage = LeaveMessage(
                authorId = authorId,
                isAnonymous = isAnonymous,
                content = content,
            )
            db.session.add(leaveMessage)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    def addReplyLeaveMessage(self, authorId:int=-1, isAnonymous:bool=False, content:str="",replyId:int=-1):
        '''
        :param authorId: 留言用户id
        :param isAnonymous: 是否匿名
        :param content: 回复留言的内容
        :param replyId: 回复的id号
        :return: {
        0:'留言成功',
        1:'数据库错误',
        2:'回复的留言id不存在',
        }
        '''
        try:
            if LeaveMessage.query.filter_by(id=replyId).count() == 0:return 2
            leaveMessage = LeaveMessage(
                authorId = authorId,
                isAnonymous = isAnonymous,
                content = content,
                replyId = replyId,
            )
            db.session.add(leaveMessage)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    def getLeaveMessageByPage(self, userId, page:int=1):
        '''
        :param authorId: 留言用户id
        :return: {
        None:'数据库错误',
        }
        '''
        try:
            if page <= 0 : page = 1
            leaveMessagesList = [
                leaveMessage.toDict(userId) for leaveMessage in
                LeaveMessage.query.filter_by(replyId=None).all()
            ]
            leaveMessagesList.reverse()
            leaveMessagesDict = {
                'sumCount': len(leaveMessagesList),
                'leaveMessages':leaveMessagesList[(page-1)*5:page*5],
            }
            return leaveMessagesDict
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return None
    def likeLeaveMessageById(self, userId, leaveMessageId):
        '''
        :param userId: 喜欢用户id
        :param leaveMessageId: 喜欢的留言id
        :return: {
        0:'赞成功',
        1:'数据库错误',
        2:'取消赞',
        3:'赞的留言不存在',
        }
        '''
        try:
            lm = LeaveMessage.query.filter_by(id=leaveMessageId).first()
            if lm == None: return 3
            return lm.like(userId)
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
leaveMessageControler = LeaveMessageControler()