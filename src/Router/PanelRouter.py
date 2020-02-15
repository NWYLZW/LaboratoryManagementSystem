from flask import Blueprint, render_template

from src import templatePath

panelBluePrint = Blueprint(
    'panel',
    __name__,
    url_prefix='/panel',
    template_folder=templatePath+"/panel",)

@panelBluePrint.route("/")
def index():
    return render_template("main.html")