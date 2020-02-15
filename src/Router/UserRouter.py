from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, login_user

from src import templatePath, login_manager
from src.form.LoginForm import LoginForm

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)

@userBluePrint.route('/')
@login_required
def index():
    return render_template('index.html')

from src.Model.UserModel import User
@userBluePrint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        user = User.query.filter_by(username="form.username.data").first()
        if user is not None and user.verify_password("form.password.data"):
            login_user(user)
            return redirect(url_for('index'))
        flash('用户名或密码错误')
    return render_template('simple_login.html', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))