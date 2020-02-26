from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField


class SearchBriefUserForm(FlaskForm):
    userName = StringField('userName')
    nickName =  StringField('nickName')
    directionName =  StringField('directionName')
    laboratoryName =  StringField('laboratoryName')
    professional =  StringField('professional')
    submit = SubmitField()