from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_user, logout_user, login_required, current_user

from src import templatePath, login_manager, MainLog
from src.Controler.UserControler import UserControler
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
from src.form.LoginForm import LoginForm
from src.Model.UserModel import User
from src.form.RegisterForm import RegisterForm
from src.form.SearchBriefUserForm import SearchBriefUserForm

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)
userControler = UserControler()

@userBluePrint.route('/')
def index():
    return redirect(url_for("main.index"))

@userBluePrint.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('panel.index'))
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User.query.filter_by(userName=form.userName.data).first()
        if user is not None:
            if user.verify_password(form.password.data):
                login_user(user)
                return successUtil.getData('loginSuccess')
            return errorUtil.getData('PasswordWrong')
        return errorUtil.getData('UserNameNone')
    return render_template('login.html', form=form)

@userBluePrint.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('user.login'))

@userBluePrint.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('panel.index'))
    form = RegisterForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            if form.validate_userName(form.userName):
                if form.validata_Num():
                    if userControler.addUser(form):
                        return successUtil.getData('registerSuccess')
                    else:
                        return errorUtil.getData('backEndWrong2')
                return errorUtil.getData('FormDataWrong')
            return errorUtil.getData('UserNameExist')
        return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
    return render_template('register.html', form=form)

@userBluePrint.route('/searchUser/', methods=['GET', 'POST'])
@login_required
def searchBriefUser():
    if request.method == "POST":
        # TODO 不同用户权限不同搜索表单验证
        form = SearchBriefUserForm(request.form)
        return userControler.getBriefUserListData(form)
    elif request.method == "GET":
        # TODO 不同用户权限不同搜索界面
        return render_template('searchBriefUser.html')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))