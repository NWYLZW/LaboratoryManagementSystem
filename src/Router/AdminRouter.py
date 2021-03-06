from flask import Blueprint, request, render_template, redirect, url_for
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict

from src import templatePath
from src.Controler.AdminControler import adminControler
from src.Model.DirectionModel import Direction
from src.Model.LaboratoryModel import Laboratory
from src.Model.ProfessionalClassModel import ProfessionalClass
from src.Util.ErrorUtil import errorUtil
from src.Util.SuccessUtil import successUtil
from src.form.LoginNoticeForm import LoginNoticeForm, editLoginNoticeForm

adminBluePrint = Blueprint(
    'admin',
    __name__,
    url_prefix='/admin',
    template_folder=templatePath+"/admin",)

# TODO 开发结束后，添加管理权限检测
@adminBluePrint.before_request
def adminBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@adminBluePrint.route("/delLoginNotice",methods=['POST'])
def delLoginNotice():
    messageDict = [
        'delLoginNoticeSuccess',
        'LoginNoticeIdNone',
        'LoginNoticeNone',
        'dataBaseError',
        'editLoginNoticeImageError',
    ]
    result = adminControler.delLoginNotice(request.form['id'])
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])
@adminBluePrint.route("/addLoginNotice",methods=['GET','POST'])
def addLoginNotice():
    # 文件是从request,files里面获取，这里使用CombinedMultiDict把form和file的数据组合起来，一起验证
    form = LoginNoticeForm(CombinedMultiDict([request.files, request.form]))
    if request.method == "POST":
        if form.validate_on_submit():
            messageDict = [
                'addLoginNoticeSuccess',
                'LoginNoticeMax6',
                'dataBaseError',
                'addLoginNoticeImageError',
            ]
            result = adminControler.addLoginNotice(form)
            if result == 0:
                return successUtil.getData(messageDict[result])
            else:
                return errorUtil.getData(messageDict[result])
        return form.errors
    return render_template("loginNoticeEdit.html", form=form)
@adminBluePrint.route("/editLoginNotice",methods=['GET','POST'])
def editLoginNotice():
    # 文件是从request,files里面获取，这里使用CombinedMultiDict把form和file的数据组合起来，一起验证
    form = editLoginNoticeForm(CombinedMultiDict([request.files, request.form]))
    if request.method == "POST":
        if form.validate_on_submit():
            messageDict = [
                'editLoginNoticeSuccess',
                'LoginNoticeMax6',
                'LoginNoticeIdNone',
                'LoginNoticeNone',
                'dataBaseError',
                'editLoginNoticeImageError',
                'LoginNoticeMin2',
            ]
            result = adminControler.editLoginNotice(request.form['id'],form)
            if result == 0:
                return successUtil.getData(messageDict[result])
            else:
                return errorUtil.getData(messageDict[result])
        return form.errors
    return render_template("loginNoticeEdit.html", form=form)

@adminBluePrint.route("/editPermission",methods=['GET','POST'])
def editPermission():
    if request.method == 'POST':
        messageDict = [
            'editPermissionSuccess',
            'UserNameNone',
            'dataBaseError',
        ]
        result = adminControler.givePermission(request.json)
        if result == 0:
            return successUtil.getData(messageDict[result])
        else:
            return errorUtil.getData(messageDict[result])
    return render_template('permissionEdit.html')
@adminBluePrint.route("/getPermissionList",methods=['POST'])
def getPermissionList():
    if request.method == 'POST':
        return adminControler.getPermissionList()

@adminBluePrint.route("/adminMainControler",methods=['GET'])
def adminMainControler():
    return render_template('adminMainControler.html')

@adminBluePrint.route("/updateDirection",methods=['POST'])
def updateDirection():
    messageDict = [
        'updateDirectionSuccess',
        'dataBaseError',
    ]
    result = Direction.updateDirection("Java", "Java", "Java世界最牛逼")
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])
@adminBluePrint.route("/updateLaboratory",methods=['GET'])
def updateLaboratory():
    messageDict = [
        'updateLaboratorySuccess',
        'dataBaseError',
    ]
    result = Laboratory.updateLaboratory("E", "601", "特别难爬的一实验室")
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])
@adminBluePrint.route("/addProfessionalClass",methods=['GET'])
def addProfessionalClass():
    messageDict = [
        'updateProfessionalClassSuccess',
        'dataBaseError',
    ]
    result = ProfessionalClass.addProfessionalClass("网络工程", 16, 1)
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])