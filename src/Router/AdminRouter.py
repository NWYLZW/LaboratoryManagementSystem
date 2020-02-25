from flask import Blueprint, request, render_template, redirect, url_for
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict

from src import templatePath
from src.Controler.AdminControler import adminControler
from src.Util.ErrorUtil import errorUtil
from src.Util.FileUtil import fileUtil
from src.Util.SuccessUtil import successUtil
from src.form.LoginNoticeForm import LoginNoticeForm

adminBluePrint = Blueprint(
    'admin',
    __name__,
    url_prefix='/admin',
    template_folder=templatePath+"/admin",)

# TODO 开发结束后，添加管理权限检测
@adminBluePrint.before_request
def panelBeforeRequest():
    if not current_user or not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@adminBluePrint.route("/delLoginNotice",methods=['GET','POST'])
def delLoginNotice():
    if request.method == "POST":
        messageDict = [
            'delLoginNoticeSuccess',
            'LoginNoticeIdNone',
            'LoginNoticeNone',
            'dataBaseError',
        ]
        result = adminControler.delLoginNotice(request.form['id'])
        if result == 0:
            return successUtil.getData(messageDict[result])
        else:
            return errorUtil.getData(messageDict[result])
    return render_template("loginNoticeEdit.html")
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
    form = LoginNoticeForm(CombinedMultiDict([request.files, request.form]))
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