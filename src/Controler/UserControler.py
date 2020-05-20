from flask_login import current_user

from src import db, MainLog
from src.Model.ProfessionalClassModel import ProfessionalClass
from src.Model.UserModel import User
from src.Util.FileUtil import fileUtil
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
    def __getProfessionalClass(self,professional,gradle,classNum):
        try:
            professionalClass = ProfessionalClass.query.filter_by(
                professional=professional,
                gradle=gradle,
                classNum=classNum).first()
            if professionalClass is None:
                professionalClass = ProfessionalClass(
                    professional=professional,
                    gradle=gradle,
                    classNum=classNum)
                db.session.add(professionalClass)
                db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"获取专业班级失败 错误信息:")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return professionalClass

    def addUser(self,form):
        '''
        :param form:提交的表单
        :return: 返回是否成功
        '''
        try:
            professionalClass = self.__getProfessionalClass(
                dict(form.professional.choices).get(form.professional.data),
                form.schoolNum.data[2:4],
                form.schoolNum.data[-4:-2])
            if professionalClass is None:
                return False
            user = User(
                schoolID = form.schoolNum.data,
                nickName = form.name.data,
                password = form.password.data,
                sex= form.Sex.data,
                email = form.email.data,
                qqNum = form.QQ.data,
                telNum = form.telNum.data,
                directionId = form.direction.data,
                laboratoryId = form.laboratory.data,
                professionalClassId = professionalClass.id,
            )
            user.addRegisterTime(user.registerTime)
            db.session.add(user)
            db.session.flush()
            # TODO 删除用户时删除头像与壁纸
            fileUtil.copyWebToImageRes(
                'baseLibrary/img/headPortrait/'+str(user.id%10)+'.jpg',
                'user/headPortrait/'+str(user.id)+'.png')
            fileUtil.copyWebToImageRes(
                'baseLibrary/img/defaultBackgroundImage.png',
                'user/mySpaceBackground/'+str(user.id)+'.png')
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,form.schoolNum.data+"用户添加失败 错误信息:")
            MainLog.record(MainLog.level.ERROR,e)
            return False
        db.session.commit()
        return True
    def editUser(self,userId,form):
        try:
            user = User.query.filter_by(id=userId).first()
            if form.name.data != '': user.nickName = form.name.data
            if form.telNum.data != '': user.telNum = form.telNum.data
            if form.QQ.data != '': user.qqNum = form.QQ.data
            if form.Sex.data != '-1': user.sex = form.Sex.data
            if form.professional.data != '-1':
                professionalClass = self.__getProfessionalClass(
                    dict(form.professional.choices).get(form.professional.data),
                    user.professionalClass.gradle,
                    user.professionalClass.classNum)
                if professionalClass is None:
                    return False
                user.professionalClassId = professionalClass.id
            db.session.add(user)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,'id为'+str(current_user.id)+'用户名为'+current_user.nickName+"用户数据修改失败 错误信息:")
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