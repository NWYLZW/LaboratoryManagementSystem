from flask import Blueprint, render_template

from src import templatePath

mainBluePrint = Blueprint(
    'main',
    __name__,
    url_prefix='/main',
    template_folder=templatePath+"/main",)
@mainBluePrint.route("/")
def index():
    return render_template("hello.html")
