#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
'''
@File           :   CaptalRouter.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/4/27 3:20
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   处理资金的路由
'''
from flask import Blueprint, redirect, url_for, request, render_template, abort
from flask_login import current_user

from src import templatePath
from src.Controler.CaptalControler import captalControler
from src.Model.LaboratoryModel import Laboratory
from src.Model.RoleModel import Permission
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
from src.Wrap.PermissionWrap import permission_required

captalBluePrint = Blueprint(
    'captal',
    __name__,
    url_prefix='/captal',
    template_folder=templatePath + "/captal"
)


@captalBluePrint.before_request
def captalBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))


@captalBluePrint.route("/panel", methods=['GET'])
def captalPanel():
    addSpendAbel = current_user.can(Permission.LABORATORY_MONEY_AD)
    allMoneySearchAbel = current_user.can(Permission.ALL_MONEY_S)
    return render_template('captalPanel.html', addSpendAbel=addSpendAbel, allMoneySearchAbel=allMoneySearchAbel)


@captalBluePrint.route("/getJournalDaybook", methods=['GET'])
@permission_required(Permission.ALL_MONEY_S)
def getJournalDaybook():
    laboratoryId = request.args.get('laboratoryId', '-1')
    return JsonUtil().dictToJson(captalControler.getJournalDaybook(laboratoryId))


@captalBluePrint.route("/getMyLabJournalDaybook", methods=['GET'])
@permission_required(Permission.LABORATORY_MONEY_S)
def getMyLabJournalDaybook():
    return JsonUtil().dictToJson(captalControler.getMyLabJournalDaybook())


@captalBluePrint.route("/addSpend", methods=['POST'])
@permission_required(Permission.LABORATORY_MONEY_AD)
def addSpend():
    messageDict = [
        'setSpendSuccess',
        'dataBaseError',
        'notSufficientFunds',
        'FormDataWrong',
    ]
    changeReason = request.json.get('changeReason', None)
    changeMoney = request.json.get('changeMoney', None)
    result = captalControler.addSpend(changeReason, changeMoney)
    if result == 0:
        return successUtil.getData(messageDict[result], message=captalControler.journalDaybookObj.toDict())
    else:
        return errorUtil.getData(messageDict[result])


@captalBluePrint.route('/getJournalDaybookExel', methods=['GET'])
def getJournalDaybookExel():
    mid = request.args.get('laboratoryId',"1")
    print(mid+" "+str(current_user.laboratoryId))
    if not mid.isdigit() or int(mid)<0:
        abort(405)
    if mid == str(current_user.laboratoryId) or current_user.can(Permission.ALL_MONEY_S):
        return captalControler.getJournalDaybookExel(mid)
    abort(403)
@captalBluePrint.route('getLabList',methods=['GET'])
def getLabList():
    if current_user.can(Permission.ALL_MONEY_S):
        return JsonUtil().dictToJson(Laboratory.getAllData(haveUser=False))
    else:
        return JsonUtil().dictToJson([current_user.laboratory.toDict()])