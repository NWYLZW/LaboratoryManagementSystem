import datetime
import time

from flask_login import current_user
from sqlalchemy import and_

from src import db
from src.Model.MarkModel import Mark
from src.Util.JsonUtil import JsonUtil


class MarkControler():
    def __init__(self):
        pass

    def __lastYearTime(self):
        today = datetime.datetime.now()
        offset = datetime.timedelta(days=-365)
        re_date = (today + offset).strftime('%Y-%m-%d 00:00:00')
        return re_date
    def __validation(self):
        # TODO 验证IP是否为实验室IP，验证签到时间，验证签到次数，验证回签
        return True
    def mark(self):
        if self.__validation():
            db.session.add(Mark(dateTime=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),userId=current_user.id))
            db.session.commit()
            return "YES"
        else:
            return "NO"
    def getMarkList(self):
        userMarkDict = {
            'today':time.strftime("%Y-%m-%d", time.localtime()),
            'userMarkList':[],
        }
        for i in range(365): userMarkDict['userMarkList'].append({'markNum':0})
        for markItem in Mark.query.filter(and_(
            Mark.dateTime.between(self.__lastYearTime(),time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())),
            Mark.userId == current_user.id
        )).all():
            userMarkDict['userMarkList'][int((datetime.datetime.now() - markItem.dateTime).days)]['markNum'] += 1
        return JsonUtil().dictToJson(userMarkDict)
markControler = MarkControler()