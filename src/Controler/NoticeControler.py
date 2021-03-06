from flask_login import current_user

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
    def addNotice(self,json):
        if json.kindNum == 1:
            message = current_user.directionName
        Notice.addNotice(
            title=json.title,
            content=json.content,
            kindNum=json.kindNum,
            message=json.message,
            authorId=current_user.id,
        )
        return "0"
    def viewNotice(self,noticeId):
        Notice.query.filter_by(id=noticeId).first().viewThis(current_user.id)
        return "0"
noticeControler = NoticeControler()