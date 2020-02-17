# config=utf-8
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

from src.Model.UserModel import User

class RegisterForm(FlaskForm):
    userName = StringField(
        'userName',
        validators=[DataRequired('userName is null')]
    )
    password = PasswordField(
        'password',
        validators=[Length(min=8,max=20),DataRequired('password is null')]
    )
    male = SelectField(
        'male',
        choices=[(1, 'man'),
                 (2, 'woman')],
        coerce=int,
        validators=[DataRequired('male is null')]
    )
    directionName = SelectField(
        'directionName',
        choices=[(1, 'man'),
                 (2, 'Web前端'),
                 (3, 'Web后端'),
                 (4, '人工智能'),
                 (5, 'Php'),],
        coerce=int,
        validators=[DataRequired('directionName is null')]
    )
    qqNum = StringField(
        'qqNum',
        validators=[Length(min=6,max=15),DataRequired('qqNum is null')]
    )
    telNum = StringField(
        'telNum',
        validators=[Length(min=11,max=11),DataRequired('telNum is null')]
    )
    laboratoryName = SelectField(
        'laboratoryName',
        choices=[(1, 'E314'),
                 (2, 'E601'),
                 (3, 'F608'),],
        coerce=int,
        validators=[DataRequired('laboratoryName is null')]
    )
    professional = SelectField(
        'professional',
        choices=[(1, '网络工程'),
                 (2, '软件工程'),
                 (3, '通信工程'),
                 (4, '计算机科学与技术'),
                 (5, '人工智能'),],
        coerce=int,
        validators=[DataRequired('professional is null')]
    )
    gradle = SelectField(
        'gradle',
        choices=[(1, '16'),
                 (2, '17'),
                 (3, '18'),
                 (4, '19'),],
        coerce=int,
        validators=[DataRequired('gradle is null')]
    )
    classNum = SelectField(
        'classNum',
        choices=[(1, '01'),
                 (2, '02'),],
        coerce=int,
        validators=[DataRequired('classNum is null')]
    )
    submit = SubmitField()
    def validate_userName(self, field):
        '''
        检验用户名是否存在
        :param field: 用户名
        :return: 用户名是否存在
        '''
        if User.query.filter_by(userName=field.data).count() == 0:
            return True
        return False
    def getAllFiled(self)->dict:
        allFiled = {}
        allFiled['classNum'] = self.classNum
        allFiled['gradle'] = self.gradle
        allFiled['professional'] = self.professional
        allFiled['male'] = self.male
        allFiled['userName'] = self.userName
        allFiled['qqNum'] = self.qqNum
        allFiled['directionName'] = self.directionName
        allFiled['laboratoryName'] = self.laboratoryName
        allFiled['password'] = self.password
        allFiled['telNum'] = self.telNum
        return allFiled