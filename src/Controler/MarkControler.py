import datetime
import re
import time

from flask_login import current_user
from sqlalchemy import and_

from src import db
from src.Model.MarkModel import Mark
from src.Util.JsonUtil import JsonUtil
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
    def __getSqlDateByTime(self, userId:int, startHour:time, endHour:time, startTime: datetime.date):
        '''
        :param startHour: 开始的时间
        :param endHour:结束的时间
        :param startTime:今天的日期的datetime.date对象
        :return:userId用户从startTime日期的startHour到endHour这段时间的签到对象的列表
        '''
        begin=datetime.datetime.combine(startTime,startHour)
        end=datetime.datetime.combine(startTime,endHour)
        return Mark.qurry.filter(
            and_(
                Mark.userId==userId,
                Mark.dateTime>=begin,
                Mark.dateTime<=end
            )
        )
    def __validation(self,ip:str,nowTime:datetime)->int:
        temp=nowTime.hour
        if re.match("123\.123\.\d{1,3}\.\d{1,3}", ip) is not None:
            return 1
        if (12 >= temp >= 8) or (17 >= temp >= 14) or (18 <= temp <= 22):
            start=datetime.date(year=nowTime.year,month=nowTime.month,day=nowTime.day)
            userMark=Mark.qurry.filter_by(
                userId=current_user.userId,
                dateTime=start
            )
            if userMark.length>6:
                return 4
            if 12 >= temp >= 8:
                userMark=self.__getSqlDateByTime(current_user.userId, time(8, 00, 00), time(12, 00, 00), start)
            elif 17 >= temp >= 14:
                userMark=self.__getSqlDateByTime(current_user.userId, time(14, 00, 00), time(17, 00, 00), start)
            elif 22 >= temp >= 18:
                userMark=self.__getSqlDateByTime(current_user.userId, time(18, 00, 00), time(22, 00, 00), start)
            if userMark.length>=2: return 3
            elif userMark.length==1:
                if temp-userMark[0].hour>=2: return 0
                else: return 5
            else: return 0
        else: return 2
    def mark(self):
        '''
        :return: [
        0: 签到成功,
        1: 数据库错误,
        2: 不为指定实验室IP,
        3: 未在签到时间段内,
        4: 时间段内只能签到2次,
        5: 一天最多签到6次,
        6: 距离上次签到未抵达2小时,
        ]
        '''
        nowTime = timeUtil.nowDateObj()
        flag = self.__validation('123.123.0.0',nowTime)
        if flag == 0:
            try:
                db.session.add(Mark(dateTime=nowTime,userId=current_user.id))
                db.session.flush()
            except: return 1
            db.session.commit()
            return 0
        return flag + 1
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