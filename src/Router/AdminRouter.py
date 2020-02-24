from flask import Blueprint, request, render_template, redirect, url_for
from flask_login import current_user
from werkzeug.datastructures import CombinedMultiDict

from src import templatePath
from src.Controler.AdminControler import adminControler
from src.Util.FileUtil import fileUtil
from src.form.LoginNoticeForm import LoginNoticeForm

adminBluePrint = Blueprint(
    'admin',
    __name__,
    url_prefix='/admin',
    template_folder=templatePath+"/admin",)
@adminBluePrint.before_request
def panelBeforeRequest():
    if not current_user or not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@adminBluePrint.route("/addLoginNotice",methods=['GET','POST'])
def addLoginNotice():
    # 文件是从request,files里面获取，这里使用CombinedMultiDict把form和file的数据组合起来，一起验证
    form = LoginNoticeForm(CombinedMultiDict([request.files, request.form]))
    if request.method == "POST":
        filename = adminControler.addLoginNotice(title=form.title,content=form.content,isShow=form.isShow)
        if form.validate_on_submit():
            if not  filename == "None":
                if fileUtil.saveToWeb(path="user/img/rotationx",uploadFile=request.files.get('backImage'),fileName=filename):
                    return "LoginNotice 添加成功"
                else:
                    return "文件图片添加失败"
            else:
                return "数据库错误"
        return form.errors
    return render_template("loginNoticeEdit.html", form=form)