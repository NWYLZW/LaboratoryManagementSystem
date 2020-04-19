from flask_login import current_user
from sqlalchemy import and_, or_

from src import db, MainLog
from src.Model.LoginNoticeModel import LoginNotice
from src.Model.NoticeModel import Notice
from src.Util.JsonUtil import JsonUtil


class NoticeControler:
    def __init__(self):
        pass
    def getLoginNotice(self,show:bool=False):
        loginNoticeList = []
        if show:
            LoginNoticeQueryList = LoginNotice.query.filter_by(isShow=True).all()
        else:
            LoginNoticeQueryList = LoginNotice.query.filter_by().all()
        for loginNotice in LoginNoticeQueryList:
            loginNoticeList.append({
                'id':loginNotice.id,
                'authorId':loginNotice.authorId,
                'date':loginNotice.date.strftime("%Y-%m-%d %H:%M:%S"),
                'title':loginNotice.title,
                'content':loginNotice.content,
                'isShow':loginNotice.isShow,
                'backgroundImageSrc':loginNotice.backgroundImageSrc,
            })
        return JsonUtil().dictToJson(loginNoticeList)
    def getNotices(self):
        notices = Notice.query.filter(or_(
            Notice.message=="",
            Notice.message==current_user.direction.name,
            Notice.message==current_user.laboratory.blockNum+'-'+current_user.laboratory.doorNum,
        )).all()
        return [notice.toDict(current_user.id) for notice in notices]
    def addNotice(self,title:str="",content:str="",kindNum:str="0"):
        '''
        :param title: 公告标题
        :param content: 公告的内容
        :param kindNum: 0全体|1方向|2实验室
        :return:{
        0:"添加成功",
        1:"数据库错误",
        2:"表单数据错误",
        }
        '''
        # TODO 检测是否有权限发送该等级的公告
        if kindNum.isdigit(): kindNum = int(kindNum)
        else: return 2
        if kindNum == 1:
            message = current_user.direction.name
        elif kindNum == 2:
            message = current_user.laboratory.blockNum+'-'+current_user.laboratory.doorNum
        else: message = ""
        return Notice.addNotice(
            title=title,
            content=content,
            kindNum=kindNum,
            message=message,
            authorId=current_user.id)
    def viewNotice(self,noticeId):
        '''
        :param title: 公告标题
        :param content: 公告的内容
        :param kindNum: 0全体|1方向|2实验室
        :return:{
        0:"添加成功",
        1:"数据库错误",
        2:"表单数据错误",
        3:"该公告不存在",
        }
        '''
        try:
            if noticeId.isdigit(): kindNum = int(noticeId)
            else: return 2
            notice = Notice.query.filter_by(id=noticeId).first()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        if notice != None: notice.viewThis(current_user.id)
        else:return 3
        return 0
noticeControler = NoticeControler()