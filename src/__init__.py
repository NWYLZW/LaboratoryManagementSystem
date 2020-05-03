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
from flask import Flask, redirect, url_for
from flask_cors import CORS
from flask_login import LoginManager
app = Flask(__name__,
            static_folder="../res/web",
            static_url_path='',)
CORS(app, supports_credentials=True)
app.config.from_pyfile("./config.py")

# 初始化数据库
db = SQLAlchemy(app)
# 初始化登陆管理插件
login_manager = LoginManager(app)
login_manager.login_view = "user.login"
templatePath="../../res/web"

# 自定义的转换器注册
from src.Converter import addConverter
addConverter(app)

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
#     '''使用上下文处理器，使变量在模板全局中可访问'''
#     return dict(Permission=Permission)

@app.route("/")
def index():
    return redirect(url_for('main.index'))