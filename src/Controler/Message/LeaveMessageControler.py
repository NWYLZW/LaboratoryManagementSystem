# -*- coding: utf-8 -*-
from flask_login import current_user

from src import MainLog, db
from src.Model.LeaveMessageModel import LeaveMessage, LeaveMessageViolation
from src.Util import JsonUtil


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
        self.addLeaveMessageObj = leaveMessage
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
        self.addLeaveMessageObj = leaveMessage
        return 0
    def getLeaveMessageByPage(self, user, page:int=1):
        '''
        :param authorId: 留言用户id
        :return: {
        None:'数据库错误',
        }
        '''
        try:
            if page <= 0 : page = 1
            leaveMessagesList = [
                leaveMessage.toDict(user) for leaveMessage in
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
            if leaveMessageId == -1: return 3
            lm = LeaveMessage.query.filter_by(id=leaveMessageId).first()
            if lm == None: return 3
            return lm.like(userId)
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
    def deleteLeaveMessageById(self, user, leaveMessageId):
        '''
        :param userId: 当前用户id
        :param leaveMessageId: 删除的留言id
        :return: {
        0:'删除成功',
        1:'数据库错误',
        2:'删除留言不存在',
        3:'无权限',
        }
        '''
        try:
            if leaveMessageId == -1: return 2
            lm = LeaveMessage.query.filter_by(id=leaveMessageId).first()
            if lm == None: return 2
            return lm.delete(user)
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
    def addReportLeavemessage(self,form):
        '''
        :param form:请求form体 reoprtReason可为空值
        :return: 1为数据有误，0是创建成功
        '''
        try:
            mid = LeaveMessageViolation(form.get('reportReason'),
                                        form.get('reportTag'), form.get('messageId')
                                        , current_user.id)
            db.session.add(mid)
            db.session.flush()
        except Exception as e:
            return 1
        db.session.commit()
        return 0
    def getReportLeavemessage(self,indexOf:int=1):
        '''
        :param indexOf:被举报信息的页数，每十个一页
        :return:被举报消息的字典化对象列表
        '''
        indexOf=int(indexOf)
        temp=LeaveMessageViolation.query.filter_by().all()
        listOfMessage=[]
        temp=list(reversed(temp))
        if indexOf*10<=len(temp):
            midList=temp[(indexOf-1)*10:indexOf*10]
        else:
            midList=temp[(indexOf-1)*10:len(temp)]
        for x in midList:
            mid=x.toDict(current_user)
            listOfMessage.append(mid)
            print(mid['dateTime'])
        if listOfMessage==None:
            return None
        return listOfMessage

leaveMessageControler = LeaveMessageControler()