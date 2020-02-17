# config=utf-8
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, ValidationError

from src.Model.UserModel import User


class RegisterForm(FlaskForm):
    userName = StringField(
        'userName',
        validators=[DataRequired('userName is null')]
    )
    nickname = StringField(
        'nickname',
        validators=[DataRequired('nickname is null')]
    )
    password = PasswordField(
        'password',
        validators=[DataRequired('password is null')]
    )
    male =BooleanField(
        'male',
        validators=[DataRequired('male is null')]
    )
    directionName = StringField(
        'directionName',
        validators=[DataRequired('directionName is null')]
    )
    qqNum = StringField(
        'qqNum',
        validators=[DataRequired('qqNum is null')]
    )
    laboratoryName = StringField(
        'laboratoryName'
        , validators=[DataRequired('laboratoryName is null')]
    )
    professionalClass = StringField(
        'professionalClass',
        validators=[DataRequired('professionalClass is null')]
    )
    submit = SubmitField()

    def validate_userName(self, field):
        '''
        检验用户名是否存在
        :param field: 用户名
        :return: -1 用户名存在 1 用户名不存在
        '''
        if User.query.filter_by(userName=field.data).count() == 1:
            return False
        return True