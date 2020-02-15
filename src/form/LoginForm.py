# config=utf-8
from flask_wtf import FlaskForm as Form
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(Form):
    userName = StringField('userName', validators=[DataRequired('userName is null')])
    password = PasswordField('password', validators=[DataRequired('password is null')])
    submit = SubmitField()
