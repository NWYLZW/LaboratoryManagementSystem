from flask import Blueprint, redirect, url_for
from flask_login import current_user

from src.Controler.MarkControler import markControler

markBluePrint = Blueprint(
    'mark',
    __name__,
    url_prefix='/mark',)

@markBluePrint.before_request
def panelBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@markBluePrint.route("/",methods=['POST'])
def mark():
    return markControler.mark()
@markBluePrint.route("/myList",methods=['POST'])
def myList():
    return markControler.getMarkList(current_user.id)