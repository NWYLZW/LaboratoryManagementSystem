from flask_login import current_user

from src import db, MainLog
from src.Model.ProfessionalClassModel import ProfessionalClass
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
            gradle = form.schoolNum.data[2:3]
            classNum = form.schoolNum.data[-2:-3]
            MainLog.record(MainLog.level.DEBUG,gradle)
            MainLog.record(MainLog.level.DEBUG,classNum)
            return True
            professionalClass = ProfessionalClass.query.filter_by(
                professional=form.professional.data,
                gradle=gradle,
                classNum=classNum).first()
            if professionalClass is None:
                professionalClass = ProfessionalClass(
                    professional=form.professional.data,
                    gradle=gradle,
                    classNum=classNum)
                db.session.add(professionalClass)
                db.session.flush()
            user = User(
                schoolID = form.schoolNum.data,
                nickName = form.name.data,
                password = form.password.data,
                sex= form.sex.data,
                email = form.email.data,
                qqNum = form.qqNum.data,
                telNum = form.telNum.data,
                directionId = form.directionId.data,
                laboratoryId = form.laboratoryId.data,
                professionalClassId = professionalClass.id,
            )
            db.session.add(user)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,form.userName.data+"用户添加失败 错误信息:")
            MainLog.record(MainLog.level.ERROR,e)
            return False
        db.session.commit()
        return True

    def getBriefUserListData(self, listWords):
        searchFile = [
            User.schoolID,
            User.nickName,
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
            User.schoolID,
            User.nickName,
        ]
        responUserList = []
        userIdList = []
        for file in searchFile:
            self.__searchByFuzzyRule(responUserList,userIdList,file,listWords)
        for index in range(responUserList.__len__()):
            responUserList[index] = responUserList[index].toDict()
        return JsonUtil().dictToJson(responUserList)
userControler = UserControler()