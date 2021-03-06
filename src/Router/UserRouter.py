from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_user, logout_user, login_required, current_user

from src import templatePath, login_manager, MainLog
from src.Controler.UserControler import userControler
from src.Model.DirectionModel import Direction
from src.Model.LaboratoryModel import Laboratory
from src.Model.ProfessionalClassModel import ProfessionalClass
from src.Util.ErrorUtil import errorUtil
from src.Util.FileUtil import fileUtil
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

@userBluePrint.route('/')
def index():
    return redirect(url_for("main.index"))

@userBluePrint.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('panel.index'))
    # TAG 测试时关闭csrf保护，接口开发完毕打开
    form = LoginForm(request.form,csrf_enabled=False)
    if request.method == 'POST':
        if form.validate():
            user = User.query.filter_by(schoolID=form.userName.data).first()
            if user is not None:
                if user.verify_password(form.password.data):
                    login_user(user)
                    return successUtil.getData('loginSuccess')
                return errorUtil.getData('PasswordWrong')
            return errorUtil.getData('UserNameNone')
        return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
    return render_template('login.html', form=form)

@userBluePrint.route('/logout', methods=['GET'])
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
            if form.validate_userName(form.schoolNum):
                if form.validata_Num():
                    if userControler.addUser(form):
                        return successUtil.getData('registerSuccess')
                    else:
                        return errorUtil.getData('backEndWrong2')
                return errorUtil.getData('FormDataWrong')
            return errorUtil.getData('UserNameExist')
        return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
    return render_template('newRegister.html', form=form)

@userBluePrint.route('/searchUser', methods=['GET','POST'])
@login_required
def searchUserTest():
    if request.method == "POST":
        return userControler.getBriefUserListData(request.json)
    elif request.method == "GET":
        return render_template('searchBriefUser.html')

# TODO 添加管理权限检测
@userBluePrint.route('/searchAllUser', methods=['POST'])
@login_required
def searchAllUser():
    return userControler.getUserListData(request.json)

@userBluePrint.route("/getHeadPortrait<int:ID>",methods=['GET'])
def getHeadPortrait(ID):
    try:
        return fileUtil.getFromRes(path="user/headPortrait", fileName=str(ID) + ".png")
    except Exception as e:
        MainLog.record(MainLog.level.WARN,"可能发生了盗取用户信息")
        MainLog.record(MainLog.level.WARN,e)
        return JsonUtil().dictToJson(errorUtil.getData('backEndWrong2'))

@userBluePrint.route("/getDirection",methods=['POST'])
def getDirection():
    return JsonUtil().dictToJson(Direction.getDict())
@userBluePrint.route("/getLaboratory",methods=['POST'])
def getLaboratory():
    return JsonUtil().dictToJson(Laboratory.getDict())
@userBluePrint.route("/getProfessionalList",methods=['POST'])
def getProfessionalList():
    return JsonUtil().dictToJson(ProfessionalClass.getDict())

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))