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
        choices=[('Java', 'Java'),
                 ('Web前端', 'Web前端'),
                 ('Web后端', 'Web后端'),
                 ('人工智能', '人工智能'),
                 ('Php', 'Php'),],
        coerce=str,
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
        choices=[('E314', 'E314'),
                 ('E601', 'E601'),
                 ('F608', 'F608'),],
        coerce=str,
        validators=[DataRequired('laboratoryName is null')]
    )
    professional = SelectField(
        'professional',
        choices=[('网络工程', '网络工程'),
                 ('软件工程', '软件工程'),
                 ('通信工程', '通信工程'),
                 ('计算机科学与技术', '计算机科学与技术'),
                 ('人工智能', '人工智能'),],
        coerce=str,
        validators=[DataRequired('professional is null')]
    )
    gradle = SelectField(
        'gradle',
        choices=[('16', '16'),
                 ('17', '17'),
                 ('18', '18'),
                 ('19', '19'),],
        coerce=str,
        validators=[DataRequired('gradle is null')]
    )
    classNum = SelectField(
        'classNum',
        choices=[('01', '01'),
                 ('02', '02'),],
        coerce=str,
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