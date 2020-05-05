# -*- coding: utf-8 -*-
from flask import Blueprint, request
from flask_login import current_user, login_required

from src.Controler.Message.LeaveMessageControler import leaveMessageControler
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil

__all__ = ["initChildRoute"]
routeName = "/leave"

def initChildRoute(bluePrint:Blueprint):
    @bluePrint.route(routeName+"/add",methods=['POST'])
    @login_required
    def addLeaveMessage():
        messageDict = [
            'leaveMessageSuccess',
            'dataBaseError',
        ]
        isAnonymous = request.json['isAnonymous']
        content = request.json['content']
        try:
            result = leaveMessageControler.addLeaveMessage(
                current_user.id,
                isAnonymous,
                content)
        except Exception:
            return errorUtil.getData('FormDataWrong')
        if result == 0:
            return successUtil.getData(
                messageDict[result]
                ,message=leaveMessageControler.addLeaveMessageObj
                    .toDict(current_user))
        else:
            return errorUtil.getData(messageDict[result])
    @bluePrint.route(routeName+"/addReply",methods=['POST'])
    @login_required
    def addReplyLeaveMessage():
        messageDict = [
            'replyLeaveMessageSuccess',
            'dataBaseError',
            'LeaveMessageIsNone',
        ]
        isAnonymous = request.json['isAnonymous']
        content = request.json['content']
        replyId = request.json['replyId']
        try:
            result = leaveMessageControler.addReplyLeaveMessage(
                current_user.id,
                isAnonymous,
                content,
                replyId)
        except Exception:
            return errorUtil.getData('FormDataWrong')
        if result == 0:
            return successUtil.getData(
                messageDict[result]
                ,message=leaveMessageControler.addLeaveMessageObj
                    .toDict(current_user))
        else:
            return errorUtil.getData(messageDict[result])
    @bluePrint.route(routeName+"/get",methods=['GET'])
    @login_required
    def getLeaveMessage():
        page = request.args.get("page")
        if not page.isdigit() : return errorUtil.getData('FormDataWrong')
        result = leaveMessageControler.getLeaveMessageByPage(current_user,int(page))
        if result != None:
            return JsonUtil().dictToJson(result)
        else:
            return errorUtil.getData('dataBaseError')
    @bluePrint.route(routeName+"/like",methods=['POST'])
    @login_required
    def likeLeaveMessage():
        messageDict = [
            'likeLeaveMessageSuccess',
            'dataBaseError',
            'unlikeLeaveMessageSuccess',
            'LeaveMessageIsNone',
        ]
        leaveMessageId = request.json.get("leaveMessageId",'-1')
        result = leaveMessageControler.likeLeaveMessageById(current_user.id,int(leaveMessageId))
        if result == 0 or result == 2:
            return successUtil.getData(messageDict[result])
        else:
            return errorUtil.getData(messageDict[result])
    @bluePrint.route(routeName+"/delete",methods=['POST'])
    @login_required
    def deleteLeaveMessage():
        messageDict = [
            'deleteLeaveMessageSuccess',
            'dataBaseError',
            'LeaveMessageIsNone',
            'permissionError',
        ]
        leaveMessageId = request.json.get("leaveMessageId",'-1')
        result = leaveMessageControler.deleteLeaveMessageById(current_user,int(leaveMessageId))
        if result == 0:
            return successUtil.getData(messageDict[result])
        else:
            return errorUtil.getData(messageDict[result])
    @bluePrint.route(routeName+"/alert",methods=['GET'])
    @login_required
    def alertLeaveMessage():
        return "alert"