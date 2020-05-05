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
from flask import Blueprint, redirect, url_for, request, render_template
from flask_login import current_user

from src import templatePath
from src.Controler.CaptalControler import captalControler
from src.Model.RoleModel import Permission
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
from src.Wrap.PermissionWrap import permission_required

captalBluePrint = Blueprint(
    'captal',
    __name__,
    url_prefix='/captal',
    template_folder=templatePath+"/captal"
)
@captalBluePrint.before_request
def captalBeforeRequest():
    if not current_user:
        return redirect(url_for('user.login'))
    if not current_user.is_authenticated:
        return redirect(url_for('user.login'))

@captalBluePrint.route("/panel",methods=['GET'])
def captalPanel():
    addSpendAbel = False
    if current_user.is_administrator() or current_user.can(Permission.LABORATORY_MONEY_AD):
        addSpendAbel = True
    return render_template('captalPanel.html',addSpendAbel=addSpendAbel)
@captalBluePrint.route("/getJournalDaybook",methods=['GET'])
@permission_required(Permission.ALL_MONEY_S)
def getJournalDaybook():
    laboratoryId = request.args.get('laboratoryId','-1')
    return JsonUtil().dictToJson(captalControler.getJournalDaybook(laboratoryId))
@captalBluePrint.route("/getMyLabJournalDaybook",methods=['GET'])
@permission_required(Permission.LABORATORY_MONEY_S)
def getMyLabJournalDaybook():
    return JsonUtil().dictToJson(captalControler.getMyLabJournalDaybook())
@captalBluePrint.route("/addSpend",methods=['POST'])
@permission_required(Permission.LABORATORY_MONEY_AD)
def addSpend():
    messageDict = [
        'setSpendSuccess',
        'dataBaseError',
        'notSufficientFunds',
        'FormDataWrong',
    ]
    changeReason = request.json.get('changeReason',None)
    changeMoney = request.json.get('changeMoney',None)
    result = captalControler.addSpend(changeReason,changeMoney)
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])
@captalBluePrint.route('/getJournalDaybookExel',methods=['GET'])
def getJournalDaybookExel():
    mid=request.args.get('laboratoryId')
    return captalControler.getJournalDaybookExel(mid)