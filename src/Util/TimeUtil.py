import datetime
import time
from datetime import datetime
class TimeUtil:
    def __init__(self):
        pass
    def nowDateObj(self):
        return datetime.datetime.now()
    def nowDateStr(self):
        return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    def strToDate(self,strValue:str):
        return datetime.strptime(strValue,"%Y-%m-%d %H:%M:%S")
timeUtil = TimeUtil()