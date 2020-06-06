from flask import Blueprint, redirect, url_for
from flask_login import current_user

from src.Controler.MarkControler import markControler
from src.Util.ErrorUtil import errorUtil
from src.Util.SuccessUtil import successUtil

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
    messageList = [
        "markSuccess",
        "dataBaseError",
        "markIpError"
    ]
    result = markControler.mark()
    if result == 0:
        return successUtil.getData(messageList[result])
    else:
        return errorUtil.getData(messageList[result])
@markBluePrint.route("/myList",methods=['POST'])
def myList():
    return markControler.getMarkList(current_user.id)