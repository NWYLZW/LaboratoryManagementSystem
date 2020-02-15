from flask import Blueprint, render_template

from src import templatePath

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user',
    template_folder=templatePath+"/user",)

@userBluePrint.route("/")
def index():
    return render_template("simple_login.html")