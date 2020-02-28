from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user

from src import templatePath
from src.Controler.PanelControler import panelControler

panelBluePrint = Blueprint(
    'panel',
    __name__,
    url_prefix='/panel',
    template_folder=templatePath+"/panel",)
@panelBluePrint.before_request
def panelBeforeRequest():
    if not current_user or not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@panelBluePrint.route("/")
def index():
    return render_template("main.html")
@panelBluePrint.route("/menu",methods=["POST"])
def menu():
    return panelControler.getMenuDict()