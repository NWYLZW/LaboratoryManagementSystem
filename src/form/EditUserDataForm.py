from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, Email, ValidationError

from src.Model.DirectionModel import Direction
from src.Model.LaboratoryModel import Laboratory
from src.Model.ProfessionalClassModel import ProfessionalClass

class EditMyBaseData(FlaskForm):
    professionalChoices = ProfessionalClass.getProfessionalList()
    professionalChoices.append(('-1', '未选择'))
    name = StringField('name')
    telNum = StringField('telNum')
    def validate_telNum(self, field):
        if len(field.data) != 0:
            if len(field.data) != 11:
                raise ValidationError('电话长度有误')
    QQ = StringField('QQ')
    def validate_QQ(self, field):
        if len(field.data) != 0:
            if len(field.data) < 6 or len(field.data) > 11:
                raise ValidationError('QQ长度有误')
    Sex = SelectField(
        'Sex',
        choices=[
            ('-1', '未选择'),
            ('0', '男'),
            ('1', '女')],
        coerce=str,
        default=-1
    )
    professional = SelectField(
        'professional',
        choices=professionalChoices,
        coerce=str,
        default=-1
    )
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class EditMyPrivacyData(FlaskForm):
    oldEmail = StringField(
        'oldEmail',
        validators=[DataRequired('oldEmail 不得为空'),Email('oldEmail格式错误')]
    )
    newEmail = StringField(
        'newEmail',
        validators=[DataRequired('newEmail 不得为空'),Email('newEmail格式错误')]
    )
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class EditMyPWD(FlaskForm):
    email = StringField(
        'email',
        validators=[DataRequired('email 不得为空'),Email('email格式错误')]
    )
    newPWD = StringField(
        'newPWD',
        validators=[Length(min=6,max=20),DataRequired('newPWD 不得为空')]
    )
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class EditDirection(FlaskForm):
    directionChoices = [(str(key),value['name']) for key,value in Direction.getDict().items()]
    direction = SelectField(
        'direction',
        choices=directionChoices,
        coerce=str,
        validators=[DataRequired('direction 不得为空')]
    )
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class EditLaboratory(FlaskForm):
    laboratoryChoices = [(str(key),value['blockNum']+value['doorNum']) for key,value in Laboratory.getDict().items()]
    laboratory = SelectField(
        'laboratory',
        choices=laboratoryChoices,
        coerce=str,
        validators=[DataRequired('laboratory 不得为空')]
    )
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)