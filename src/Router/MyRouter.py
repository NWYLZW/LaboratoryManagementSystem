from flask import Blueprint, render_template

from src import templatePath

myBluePrint = Blueprint(
    'my',
    __name__,
    url_prefix='/my',
    template_folder=templatePath+"/my",)

@myBluePrint.route("/space/")
def index():
    return render_template("space/mySpace.html")