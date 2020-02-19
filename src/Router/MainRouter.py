from flask import Blueprint, render_template
from flask_login import current_user

from src import templatePath, MainLog
from src.Util.JsonUtil import JsonUtil

mainBluePrint = Blueprint(
    'main',
    __name__,
    url_prefix='/main',
    template_folder=templatePath+"/main",)
@mainBluePrint.route("/")
def index():
    return render_template("hello.html")
@mainBluePrint.route("/buttonList")
def buttonList():
    if not current_user.is_authenticated:
        # MainLog.record(MainLog.level.DEBUG,"未登录")
        return JsonUtil().dictToJson([{
            'title': '关于',
            'url': '#info'
        }, {
            'title': '登陆',
            'url': '/user/login'
        }, {
            'title': '加入我们',
            'url': '/user/register'
        }, ])
    else:
        # MainLog.record(MainLog.level.DEBUG,"已登录")
        return JsonUtil().dictToJson([{
            'title': '关于',
            'url': '#info'
        }, {
            'title': '面板',
            'url': '/panel'
        }, {
            'title': '登出',
            'url': '/user/logout'
        }, ])