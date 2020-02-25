from src import db, MainLog
from src.Model.UserModel import User


class UserControler:
    def __init__(self):
        pass
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
    pass