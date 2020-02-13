from flask import Flask
from flask_cors import *
from flask_script import Manager

from src.Router import bluePrints
from src.ComandManager import initManager

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 导入各个模块
for bluePrint in bluePrints:
    app.register_blueprint(bluePrint)

# 模式管理初始化
manager = Manager(app)
initManager(manager,app)
