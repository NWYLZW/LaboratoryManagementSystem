# -*- coding: utf-8 -*-
from flask import Blueprint

from src import templatePath

messageBluePrint = Blueprint(
    'message',
    __name__,
    url_prefix='/message',
    template_folder=templatePath+"/message",)

# @messageBluePrint.route("/test",methods=['GET'])
# def test():
#     return "message/test"

from .LeaveMessageRouter import initChildRoute
initChildRoute(messageBluePrint)