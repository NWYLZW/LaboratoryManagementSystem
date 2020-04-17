from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict

from src import templatePath, MainLog
from src.Controler.UserControler import userControler
from src.Util.ErrorUtil import errorUtil
from src.Util.FileUtil import fileUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
from src.form.EditUserDataForm import EditMyBaseData, EditLaboratory, EditMyPrivacyData, EditMyPWD, EditDirection
from src.form.ImageForm import JPGAndPNGForm

myBluePrint = Blueprint(
    'my',
    __name__,
    url_prefix='/my',
    template_folder=templatePath+"/my",)

@myBluePrint.before_request
def panelBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@myBluePrint.route("/space")
def space():
    return render_template("space/mySpace.html")
@myBluePrint.route("/info")
def info():
    return render_template("info/myInfo.html")

@myBluePrint.route("/data", methods=['POST'])
def data():
    return JsonUtil().dictToJson(current_user.toDict())

@myBluePrint.route("/editMyBaseData", methods=['POST'])
def editMyBaseData():
    form = EditMyBaseData(request.form)
    if form.validate_on_submit():
        if userControler.editUser(current_user.id,form): return successUtil.getData('editMyBaseDataSuccess')
        else: return errorUtil.getData('dataBaseError')
    return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))

@myBluePrint.route("/editMyPrivacyData", methods=['POST'])
def editMyPrivacyData():
    form = EditMyPrivacyData(request.form)
    if form.validate_on_submit():
        return "0"
    return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
@myBluePrint.route("/editMyPWD", methods=['POST'])
def editMyPWD():
    form = EditMyPWD(request.form)
    if form.validate_on_submit():
        return "0"
    return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
@myBluePrint.route("/editDirection", methods=['POST'])
def editDirection():
    form = EditDirection(request.form)
    if form.validate_on_submit():
        return "0"
    return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))
@myBluePrint.route("/editLaboratory", methods=['POST'])
def editLaboratory():
    form = EditLaboratory(request.form)
    if form.validate_on_submit():
        return "0"
    return errorUtil.getData('FormDataWrong',message=JsonUtil().dictToJson(form.errors))

@myBluePrint.route("/changeHeadPortrait", methods=['GET','POST'])
def changeHeadPortrait():
    if request.method == "POST":
        form = JPGAndPNGForm(CombinedMultiDict([request.files, request.form]))
        if form.validate_on_submit():
            if fileUtil.saveToRes(path="user/headPortrait", uploadFile=form.image.data,
                                  fileName=str(current_user.id)+".png"):
                return render_template("changeHeadPortrait.html")
            else:
                return errorUtil.getData("changeHeadPortraitError")
        return errorUtil.getData("FormDataWrong",form.errors)
    return render_template("changeHeadPortrait.html")
@myBluePrint.route("/getHeadPortrait",methods=['GET'])
def getHeadPortrait():
    return fileUtil.getFromRes(path="user/headPortrait", fileName=str(current_user.id) + ".png")

@myBluePrint.route("/changeBackground", methods=['GET','POST'])
def changeBackground():
    if request.method == "POST":
        form = JPGAndPNGForm(CombinedMultiDict([request.files, request.form]))
        if form.validate_on_submit():
            if fileUtil.saveToRes(path="user/mySpaceBackground", uploadFile=form.image.data,
                                  fileName=str(current_user.id)+".png"):
                return render_template("changeBackgroundImage.html")
            else:
                return errorUtil.getData("changeBackgroundError")
        return errorUtil.getData("FormDataWrong",form.errors)
    return render_template("changeBackgroundImage.html")
@myBluePrint.route("/getBackground",methods=['GET'])
def getBackground():
    return fileUtil.getFromRes(path="user/mySpaceBackground", fileName=str(current_user.id) + ".png")
