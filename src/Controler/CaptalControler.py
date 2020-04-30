#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File           :   CaptalControler.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/4/28 21:15
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   
'''
import decimal

from flask_login import current_user

class CaptalControler():
    def __init__(self):
        pass
    def getJournalDaybook(self,laboratoryId):
        from src.Model.CaptalModel import Captal
        from src.Model.LaboratoryModel import Laboratory
        try:
            laboratoryId = int(laboratoryId)
            if laboratoryId==-1:return {'laboratory':{},'journalDaybook':[]}
        except: return {'laboratory':{},'journalDaybook':[]}
        laboratory = Laboratory.query.filter_by(id=laboratoryId).first()
        if laboratory==None: return {'laboratory':{},'journalDaybook':[]}
        captal = Captal.query.filter_by(laboratoryId=laboratoryId).first()
        if captal==None:
            captal = Captal.new(laboratoryId=laboratoryId)
            if captal == None: return {'laboratory':{},'journalDaybook':[]}
        myLabJournalDaybook={
            'laboratory':captal.laboratory.toDict(),
            'journalDaybook':[journalDaybook.toDict() for journalDaybook in captal.journalDaybook]
        }
        return myLabJournalDaybook
    def getMyLabJournalDaybook(self):
        from src.Model.CaptalModel import Captal
        captal = Captal.query.filter_by(laboratoryId=current_user.laboratoryId).first()
        if captal==None:
            captal = Captal.new(laboratoryId=current_user.laboratoryId)
            if captal == None: return {'laboratory':{},'journalDaybook':[]}
        myLabJournalDaybook={
            'laboratory':captal.laboratory.toDict(),
            'journalDaybook':[journalDaybook.toDict() for journalDaybook in captal.journalDaybook]
        }
        return myLabJournalDaybook
    def addSpend(self,changeReason:str,changeMoney:str):
        '''
        :param changeReason:修改资金的原因
        :param changeMoney:
        :return: {
        0:"资金变动成功",
        1:"数据库错误",
        2:"余额不足",
        3:"表单数据错误",
        }
        '''
        if changeReason == None or changeMoney == None:return 3
        changeMoney_split = changeMoney.split('.')
        if len(changeMoney_split) != 2: return 3
        try:temp = float(changeMoney)
        except ValueError: return 3
        if len(changeMoney_split[0]) > 10 or len(changeMoney_split[1]) > 2 : return 3
        changeMoney = decimal.Decimal(changeMoney).quantize(decimal.Decimal('.01'))

        from src.Model.CaptalModel import Captal
        captal = Captal.query.filter_by(laboratoryId=current_user.laboratoryId).first()
        if captal==None:
            captal = Captal.new(laboratoryId=current_user.laboratoryId)
            if captal == None: return 1
        return captal.cost(current_user.id,changeReason,changeMoney)
captalControler = CaptalControler()