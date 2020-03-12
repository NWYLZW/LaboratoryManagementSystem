# config=utf-8
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length

from src.Model.DirectionModel import Direction
from src.Model.LaboratoryModel import Laboratory
from src.Model.ProfessionalClassModel import ProfessionalClass
from src.Model.UserModel import User

class RegisterForm(FlaskForm):
    directionChoices = [(str(key),value['name']) for key,value in Direction.getDict().items()]
    laboratoryChoices = [(str(key),value['blockNum']+value['doorNum']) for key,value in Laboratory.getDict().items()]
    professionalChoices = [ProfessionalClass.getProfessionalList()]
    userName = StringField(
        'userName',
        validators=[DataRequired('userName is null')]
    )
    password = PasswordField(
        'password',
        validators=[Length(min=8,max=20),DataRequired('password is null')]
    )
    sex = SelectField(
        'sex',
        choices=[
            ('1', 'male'),
            ('2', 'female')],
        coerce=str,
        validators=[DataRequired('sex is null')]
    )
    qqNum = StringField(
        'qqNum',
        validators=[Length(min=6,max=15),DataRequired('qqNum is null')]
    )
    telNum = StringField(
        'telNum',
        validators=[Length(min=11,max=11),DataRequired('telNum is null')]
    )
    laboratoryId = SelectField(
        'laboratoryId',
        choices=laboratoryChoices,
        coerce=str,
        validators=[DataRequired('laboratoryId is null')]
    )
    directionId = SelectField(
        'directionId',
        choices=directionChoices,
        coerce=str,
        validators=[DataRequired('directionId is null')]
    )
    professional = SelectField(
        'professional',
        choices=professionalChoices,
        coerce=str,
        validators=[DataRequired('professional is null')]
    )
    submit = SubmitField()
    def validate_userName(self,field):
        '''
        检验用户名是否存在
        :param field: 用户名
        :return: 用户名是否存在
        '''
        if User.query.filter_by(userName=field.data).count() == 0:
            return True
        return False
    def validata_Num(self):
        if self.userName.data.isdigit() and self.telNum.data.isdigit() and self.qqNum.data.isdigit():
            return True
        else:
            return False