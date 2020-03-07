import datetime
import time

class TimeUtil:
    def __init__(self):
        pass
    def nowDateObj(self):
        return datetime.datetime.now()
    def nowDateStr(self):
        return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

timeUtil = TimeUtil()