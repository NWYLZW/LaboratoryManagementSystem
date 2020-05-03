from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    userName = StringField('userName', validators=[DataRequired('用户名不得为空')])
    password = PasswordField('password', validators=[DataRequired('密码不得为空')])
    verificationCode = StringField()
    submit = SubmitField()
