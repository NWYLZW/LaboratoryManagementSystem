from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user

from src import templatePath

myBluePrint = Blueprint(
    'my',
    __name__,
    url_prefix='/my',
    template_folder=templatePath+"/my",)

@myBluePrint.before_request
def panelBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@myBluePrint.route("/space/")
def space():
    return render_template("space/mySpace.html")