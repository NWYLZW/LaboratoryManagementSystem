from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    userName = StringField('userName', validators=[DataRequired('userName is null')])
    verificationCode = StringField()
    password = PasswordField('password', validators=[DataRequired('password is null')])
    submit = SubmitField()
