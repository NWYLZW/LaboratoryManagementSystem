import time

from flask_login import current_user

from src import db, MainLog
from src.Model.LoginNoticeModel import LoginNotice
from src.Util.FileUtil import fileUtil


class AdminControler:
    def __init__(self):
        pass
    def delLoginNotice(self,id:int):
        '''
        根据Id删除登陆界面的notice
        :param id: 待删除的Id
        :return: 1 id为空 2 该idNotice不存在 3 数据库错误 4 文件删除错误 0 删除成功
        '''
        if not id:
            return 1
        loginNoticeX = LoginNotice.query.filter_by(id=id).first()
        if not loginNoticeX:
            return 2
        try:
            db.session.delete(loginNoticeX)
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"数据库错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 3
        db.session.commit()
        if fileUtil.removeToWeb(path="user/img/rotation",fileName=loginNoticeX.backgroundImageSrc):
            return 0
        else:
            return 4
    def addLoginNotice(self,form):
        '''
        :param form: 待提交表单
        :return: 1 最多只能有6个轮播图 2 数据库错误 3 图片添加失败 0 登陆页轮播信息添加成功
        '''
        isShowCount = LoginNotice.query.filter_by(isShow=True).count()
        if form.isShow == "True" and isShowCount == 6:
            return 1
        try:
            loginNoticex = LoginNotice(
                authorId=current_user.id,
                date=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                title=form.title.data,
                content=form.content.data,
                isShow=form.isShow.data)
            db.session.add(loginNoticex)
            # 将model对象flush下来，不然没有id
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"添加LoginNotice失败")
            MainLog.record(MainLog.level.ERROR,e)
            return 2
        db.session.commit()

        if not loginNoticex.backgroundImageSrc == "None":
            if fileUtil.saveToWeb(path="user/img/rotation", uploadFile=form.backImage.data,
                                  fileName=loginNoticex.backgroundImageSrc):
                return 0
            else:
                return 3
    def editLoginNotice(self,id:int,form):
        '''
        :param form: 待提交表单
        :return: 1 最多只能有6个轮播图 2 id为空 3 该idNotice不存在 4 数据库错误
        5 文件修改错误 6 轮播图不得少于俩张 0 修改成功
        '''
        isShowCount = LoginNotice.query.filter_by(isShow=True).count()
        if form.isShow == "True" and isShowCount == 6:
            return 1
        if not id:
            return 2
        loginNoticeX = LoginNotice.query.filter_by(id=id).first()
        if not loginNoticeX:
            return 3
        try:
            oldFileName = loginNoticeX.backgroundImageSrc
            if LoginNotice.query.filter_by(isShow=True).count() == 2 \
                and not loginNoticeX.isShow and form.isShow.data=="False":
                return 6
            loginNoticeX.setVlue(
                authorId=current_user.id,
                date=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
                title=form.title.data,
                content=form.content.data,
                isShow=form.isShow.data)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"添加LoginNotice失败")
            MainLog.record(MainLog.level.ERROR,e)
            return 4
        db.session.commit()

        if not loginNoticeX.backgroundImageSrc == "None":
            if fileUtil.changeToWeb(path="user/img/rotation", uploadFile=form.backImage.data,
                                  oldFileName=oldFileName,newFileName=loginNoticeX.backgroundImageSrc):
                return 0
            else:
                return 5

    def givePermission(self,userId:int,permissionId:int):
        pass

adminControler = AdminControler()