import datetime
import time

from flask_login import current_user
from sqlalchemy import and_

from src import db
from src.Model.MarkModel import Mark
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil
from src.Util.TimeUtil import timeUtil


class MarkControler():
    def __init__(self):
        pass

    def __lastYearTime(self):
        today = datetime.datetime.now()
        offset = datetime.timedelta(days=-365)
        re_date = (today + offset).strftime('%Y-%m-%d 00:00:00')
        return re_date
    def __searchMarkByTimeAndUserId(self,searchStartTime,userId):
        '''
        搜索某用户从某一时间到现在的所有签到记录
        :param searchStartTime:  搜索起始时间
        :param userId: 用户Id
        :return: 签到信息Mark对象列表
        '''
        return Mark.query.filter(and_(
            Mark.dateTime.between(searchStartTime,time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())),
            Mark.userId == userId,)).all()
    def __validation(self,ip,nowTime)->int:
        # TODO 验证IP是否为实验室IP 错误返回 1
        #  实验室IP特点123.123.*.*
        #  验证是否为签到时间段 8 - 12 14 - 17 18 - 22 错误返回 2
        #  验证签到次数 每个时间段最多签到俩次 一天最多签到六次 错误返回 3 4
        #  验证回签 只有在当前时间段签到了一次，相隔2小时才能签第二次 错误返回 5
        #  均正确返回 0
        return 0
    def mark(self):
        messageList = [
            "markSuccess",
            "markIpError"
        ]
        nowTime = timeUtil.nowDateStr()
        flag = self.__validation('123.123.0.0',nowTime)
        if flag == 0:
            try:
                db.session.add(Mark(dateTime=nowTime,userId=current_user.id))
            except:
                return errorUtil.getData("backEndWrong2")
            db.session.commit()
            return successUtil.getData(messageList[flag])
        else:
            return errorUtil.getData(messageList[flag])
    def getMarkNum(self, userId):
        markNumSum = 0
        for markItem in self.__searchMarkByTimeAndUserId(self.__lastYearTime(),userId):
            difference = \
                int((
                    datetime.datetime(
                        datetime.datetime.now().year,
                        datetime.datetime.now().month,
                        datetime.datetime.now().day,
                        0,0,0) -
                    datetime.datetime(
                        markItem.dateTime.year,
                        markItem.dateTime.month,
                        markItem.dateTime.day,
                        0,0,0)
                ).days)
            if difference < 365 and difference >= 0:
                markNumSum += 1
        return markNumSum

    def getMarkList(self, userId):
        userMarkDict = {
            'today':time.strftime("%Y-%m-%d", time.localtime()),
            'userMarkList':[],
        }
        for i in range(365): userMarkDict['userMarkList'].append({'markNum':0})
        for markItem in self.__searchMarkByTimeAndUserId(self.__lastYearTime(),userId):
            # difference = int((datetime.datetime.now() - markItem.dateTime).days)
            difference = \
                int((
                    datetime.datetime(
                        datetime.datetime.now().year,
                        datetime.datetime.now().month,
                        datetime.datetime.now().day,
                        0,0,0) -
                    datetime.datetime(
                        markItem.dateTime.year,
                        markItem.dateTime.month,
                        markItem.dateTime.day,
                        0,0,0)
                ).days)
            if difference < 365 and difference >= 0:
                userMarkDict['userMarkList'][difference]['markNum'] += 1
        return JsonUtil().dictToJson(userMarkDict)

markControler = MarkControler()