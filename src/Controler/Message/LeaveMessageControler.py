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
        '0':'留言成功',
        '1':'数据库错误',
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
        '0':'留言成功',
        '1':'数据库错误',
        '2':'回复的留言id不存在',
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
    def getLeaveMessageByPage(self, page:int=1):
        '''
        :param authorId: 留言用户id
        :return: {
        None:'数据库错误',
        }
        '''
        try:
            if page <= 0 : page = 1
            return [leaveMessage.toDict() for leaveMessage in LeaveMessage.query.filter_by(replyId=None).limit(5*page).all()]
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return None
leaveMessageControler = LeaveMessageControler()