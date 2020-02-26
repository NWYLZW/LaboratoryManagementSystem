from sqlalchemy import and_

from src import db, MainLog
from src.Model.UserModel import User
from src.Util.JsonUtil import JsonUtil


class UserControler:
    def __init__(self):
        pass
    def __setSearchRole(self,
                 userName: str = "", nickName: str = "",
                 directionName: str = "", laboratoryName: str = "",professional: str = ""):
        rule = and_()
        if userName != "":
            rule = and_(rule,User.userName.like('%'+userName+'%'))
        if nickName != "":
            rule = and_(rule,User.nickName.like('%'+nickName+'%'))
        if directionName != "":
            rule = and_(rule,User.directionName==directionName)
        if laboratoryName != "":
            rule = and_(rule,User.laboratoryName==laboratoryName)
        if professional != "":
            rule = and_(rule,User.professionalClass.like('%'+professional+'%'))
        return rule
    def addUser(self,form):
        '''
        :param form:提交的表单
        :return: 返回是否成功
        '''
        try:
            user = User(
                userName=form.userName.data,
                nickName=form.userName.data,
                password=form.password.data,
                male=form.male.data,
                directionName=form.directionName.data,
                qqNum=form.qqNum.data,
                telNum=form.telNum.data,
                laboratoryName=form.laboratoryName.data,
                professional=form.professional.data,
                gradle=form.gradle.data,
                classNum=form.classNum.data,
            )
            db.session.add(user)
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,form.userName.data+"用户添加失败 错误信息:")
            MainLog.record(MainLog.level.ERROR,e)
            return False
        db.session.commit()
        return True
    def getBriefUserListData(self,form):
        UserDataList = User.query.filter(self.__setSearchRole(
            userName=form.userName.data,
            nickName=form.nickName.data,
            directionName=form.directionName.data,
            laboratoryName=form.laboratoryName.data,
            professional=form.professional.data,
        )).all()
        responUserList = []
        for userItem in UserDataList:
            responUserList.append(userItem.toBriefDict())
        return JsonUtil().dictToJson(responUserList)