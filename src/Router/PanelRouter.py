from flask import Blueprint, render_template
from flask_login import login_required

from src import templatePath
from src.Wrap.PermissionWrap import admin_required

panelBluePrint = Blueprint(
    'panel',
    __name__,
    url_prefix='/panel',
    template_folder=templatePath+"/panel",)

@panelBluePrint.route("/")
@login_required
def index():
    return render_template("main.html")
@panelBluePrint.route("/admin")
@login_required
@admin_required
def admin():
    return "000"