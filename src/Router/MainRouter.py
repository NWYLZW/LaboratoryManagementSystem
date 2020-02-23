from flask import Blueprint, render_template
from flask_login import current_user

from src import templatePath
from src.Controler.MainControler import mainControler

mainBluePrint = Blueprint(
    'main',
    __name__,
    url_prefix='/main',
    template_folder=templatePath+"/main",)
@mainBluePrint.route("/")
def index():
    return render_template("hello.html")

@mainBluePrint.route("/info/<infoName>")
def info(infoName):
    # TODO 获取用户的签到信息
    #  名字，签到次数
    return mainControler.getInfoByName(infoName,current_user)
@mainBluePrint.route("/buttonList")
def buttonList():
    # TODO 登陆显示签到按钮
    return mainControler.getButtonList(current_user.is_authenticated)