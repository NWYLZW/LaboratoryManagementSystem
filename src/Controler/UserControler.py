import traceback

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
                qqNum=form.password.data,
                telNum=form.telNum.data,
                laboratoryName=form.laboratoryName.data,
                professional=form.professional.data,
                gradle=form.gradle.data,
                classNum=form.classNum.data,
            )
            db.session.add(user)
            db.session.commit()
            return True
        except Exception:
            MainLog.record(MainLog.level.ERROR,form.userName.data+"用户添加失败 错误信息:")
            traceback.print_exc()
            return False
    pass