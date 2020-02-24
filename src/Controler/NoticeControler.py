import time

from flask_login import current_user

from src.Model.LoginNoticeModel import LoginNotice
from src.Util.JsonUtil import JsonUtil


class NoticeControler:
    def __init__(self):
        pass
    def getLoginNotice(self,show:bool=False):
        loginNoticeList = []
        if show:
            LoginNoticeQueryList = LoginNotice.query.filter_by(isShow=True).all()
        else:
            LoginNoticeQueryList = LoginNotice.query.filter_by(authorId=current_user.id).all()
        for loginNotice in LoginNoticeQueryList:
            loginNoticeList.append({
                'authorId':loginNotice.authorId,
                'date':loginNotice.date.strftime("%Y-%m-%d %H:%M:%S"),
                'title':loginNotice.title,
                'content':loginNotice.content,
                'isShow':loginNotice.isShow,
                'backgroundImageSrc':loginNotice.backgroundImageSrc,
            })
        return JsonUtil().dictToJson(loginNoticeList)
noticeControler = NoticeControler()