from src import db
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
            params = dict(
                userName=form.userName.data,
                nickName=form.userName.data,
                password=form.password.data,
                male=form.male.data,
                directionName=form.directionName.data,
                qqNum=form.password.data,
                laboratoryName=form.laboratoryName.data,
                professionalClass=form.professionalClass.data,
            )
            user = User(**params)
            db.session.add(user)
            db.session.commit()
            return True
        except:
            return False
    pass