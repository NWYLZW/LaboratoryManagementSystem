import time

from flask_login import current_user

from src import db, MainLog
from src.Model.LoginNoticeModel import LoginNotice


class AdminControler:
    def __init__(self):
        pass
    def addLoginNotice(self,title,content,isShow):
        '''
        :param title: 文章标题
        :param content: 文章内容
        :return: 图片文件名
        '''
        try:
            loginNoticex = LoginNotice(
                authorId=current_user.id,
                date=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                title=title.data,
                content=content.data,
                isShow=isShow.data)
            db.session.add(loginNoticex)
            # 将model对象flush下来，不然没有id
            db.session.flush()
            db.session.commit()
            return loginNoticex.backgroundImageSrc
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"添加信息失败")
            MainLog.record(MainLog.level.ERROR,e)
            return "None"
    # TODO 编辑的时候文件名的修改问题

adminControler = AdminControler()