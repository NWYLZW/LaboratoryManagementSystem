from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict

from src import templatePath
from src.Util.ErrorUtil import errorUtil
from src.Util.FileUtil import fileUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
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
    return current_user.toDict()

@myBluePrint.route("/changeHeadPortrait", methods=['GET','POST'])
def changeHeadPortrait():
    if request.method == "POST":
        form = JPGAndPNGForm(CombinedMultiDict([request.files, request.form]))
        if form.validate_on_submit():
            if fileUtil.saveToRes(path="userHeadPortrait", uploadFile=form.image.data,
                                  fileName=str(current_user.id)+".png"):
                return render_template("changeHeadPortrait.html")
            else:
                return errorUtil.getData("changeHeadPortraitError")
        return errorUtil.getData("FormDataWrong",form.errors)
    return render_template("changeHeadPortrait.html")

@myBluePrint.route("/getHeadPortrait",methods=['GET'])
def getHeadPortrait():
    return fileUtil.getFromRes(path="userHeadPortrait", fileName=str(current_user.id) + ".png")
