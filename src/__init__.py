__all__ = ['db','MainLog','manager']
# 日志管理初始化
from flask_sqlalchemy import SQLAlchemy

from src.Util.LogUtil import Log
MainLog = Log
MainLog.setIgnoreMinLevel(MainLog.level.ERROR)
MainLog.setIgnoreLevel({
    # MainLog.level.ERROR
    # MainLog.level.WARN
    # MainLog.level.INFO
    # MainLog.level.DEBUG
})

# 应用初始化
from flask import Flask, redirect, url_for, render_template
from flask_cors import *
from flask_login import LoginManager
app = Flask(__name__,
            static_folder="../res/web",
            static_url_path='',)
CORS(app, supports_credentials=True)
app.config.from_pyfile("./config.py")

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "user.login"
templatePath="../../res/web"

# 导入各个模块
from src.Router import bluePrints
from src.ComandManager import initManager
for bluePrint in bluePrints:
    app.register_blueprint(bluePrint)

# 模式管理初始化
from flask_script import Manager
manager = Manager(app)
initManager(manager,app)

# 权限管理初始化
from src.Model.RoleModel import Role
Role().insert_roles()
# @app.context_processor
# def inject_permissions():
#     '''使用上下文处理器，是变量在模板全局中可访问'''
#     return dict(Permission=Permission)

@app.route("/")
def index():
    return redirect(url_for('main.index'))
# TODO 写几个错误响应页面
# @app.errorhandler(404)
# def pageNotFound():
#     return 'This page does not exist', 404
# @app.errorhandler(403)
# def cantDoIt():
#     return 'Your permission can\'t do it', 403