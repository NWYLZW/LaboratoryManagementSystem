from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, Email, ValidationError

from src.Model.DirectionModel import Direction
from src.Model.LaboratoryModel import Laboratory
from src.Model.ProfessionalClassModel import ProfessionalClass

class EditMyBaseData(FlaskForm):
    professionalChoices = ProfessionalClass.getProfessionalList()
    name = StringField(
        'name',
    )
    telNum = StringField(
        'telNum',
        validators=[Length(min=11,max=11)]
    )
    QQ = StringField(
        'QQ',
        validators=[Length(min=6,max=15)]
    )
    Sex = SelectField(
        'Sex',
        choices=[
            ('0', '男'),
            ('1', '女')],
        coerce=str,
    )
    professional = SelectField(
        'professional',
        choices=professionalChoices,
        coerce=str,
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
    oldPWD = StringField(
        'oldPWD',
        validators=[Length(min=6,max=20),DataRequired('oldPWD 不得为空')]
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