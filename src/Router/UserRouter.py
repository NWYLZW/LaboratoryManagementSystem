from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_user, logout_user

from src import templatePath, login_manager, db
from src.form.LoginForm import LoginForm
from src.Model.UserModel import User

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)

@userBluePrint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User.query.filter_by(userName=form.userName.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(url_for('panel.index'))
    return render_template('simple_login.html', form=form)
@userBluePrint.route('/logout', methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('user.login'))
@userBluePrint.route('/registe', methods=['GET', 'POST'])
def registe():
    form = LoginForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            params = dict(userName=form.userName.data,password=form.userName.data)
            role = User(**params)
            db.session.add(role)
            db.session.commit()
            return redirect(url_for('user.login'))
    return render_template('simple_login.html', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))