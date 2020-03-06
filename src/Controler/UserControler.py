from flask_login import current_user
from sqlalchemy import and_

from src import db, MainLog
from src.Model.UserModel import User
from src.Util.JsonUtil import JsonUtil


class UserControler:
    def __init__(self):
        pass

    def __searchByFuzzyRule(self,userList,userIdList,file,listWords):
        for userItem in User.query.filter(
            User().fuzzySearchRule(file, listWords)):
            if not userItem.id in userIdList and current_user.id != userItem.id:
                userIdList.append(userItem.id)
                userList.append(userItem)

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

    def getBriefUserListData(self, listWords):
        searchFile = [
            User.userName,
            User.nickName,
            User.directionName,
            User.laboratoryName,
        ]
        responUserList = []
        userIdList = []
        for file in searchFile:
            self.__searchByFuzzyRule(responUserList,userIdList,file,listWords)
        for index in range(responUserList.__len__()):
            responUserList[index] = responUserList[index].toBriefDict()
        return JsonUtil().dictToJson(responUserList)

    def getUserListData(self,listWords):
        searchFile = [
            User.userName,
            User.nickName,
            User.directionName,
            User.laboratoryName,
        ]
        responUserList = []
        userIdList = []
        for file in searchFile:
            self.__searchByFuzzyRule(responUserList,userIdList,file,listWords)
        for index in range(responUserList.__len__()):
            responUserList[index] = responUserList[index].toDict()
        return JsonUtil().dictToJson(responUserList)
userControler = UserControler()