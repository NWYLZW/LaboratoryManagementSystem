from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_user, logout_user

from src import templatePath, login_manager, MainLog
from src.Controler.UserControler import UserControler
from src.form.LoginForm import LoginForm
from src.Model.UserModel import User
from src.form.RegisterForm import RegisterForm

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)
userControler = UserControler()

@userBluePrint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    MainLog.record(MainLog.level.DEBUG,request.method)
    if request.method == 'POST' and form.validate():
        MainLog.record(MainLog.level.DEBUG,"form.validate")
        user = User.query.filter_by(userName=form.userName.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(url_for('panel.index'))
    return render_template('login.html', form=form)
@userBluePrint.route('/logout', methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('user.login'))
@userBluePrint.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        if form.validate_on_submit() and form.validate_userName(form.userName):
            userControler.addUser(form)
            return redirect(url_for('user.login'))
    return render_template('login.html', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))