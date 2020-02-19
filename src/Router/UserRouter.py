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

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)
userControler = UserControler()

@userBluePrint.route('/')
def index():
    # TODO wsq 重定向到/main/下面
    # 效果就是访问localhost:16000/user 会跳转到localhost:16000/main页面
    # 类似下面的logout函数
    return ""

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
        errorDict = {}
        allFiled = form.getAllFiled()
        for key in allFiled:
            if len(allFiled[key].errors)>0:
                errorDict[key] = allFiled[key].errors.__str__()
                # MainLog.record(MainLog.level.DEBUG,"form"+key+".errors"+str(len(allFiled[key].errors)))
                # MainLog.record(MainLog.level.DEBUG,"form"+key+".errors"+allFiled[key].errors.__str__())
        MainLog.record(MainLog.level.DEBUG,"下"+JsonUtil().dictToJson(errorDict))
        return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(errorDict))
    return render_template('register.html', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))