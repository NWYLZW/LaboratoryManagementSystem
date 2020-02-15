# 日志记录模块
import time
from enum import Enum, unique

@unique
class logLevel(Enum):
    ERROR = 0
    WARN = 1
    INFO = 2
    DEBUG = 3

class log:
    def __init__(self):
        self.level = logLevel
        self.__ignoreLevel:logLevel = logLevel.ERROR
        self.__logLevelName = {
            0:"ERROR",
            1:"WARN",
            2:"INFO",
            3:"DEBUG",
        }
        self.__ignoreLevelDict = {}
        pass
    def record(self,TAG:logLevel,message:str):
        if not TAG in self.__ignoreLevelDict:
            if TAG.value >= self.__ignoreLevel.value:
                print("["+self.__logLevelName.get(TAG.value)+"]  "
                      +time.strftime("%Y-%m-%d %H:%M:%S  ", time.localtime())
                      +message)
    def setIgnoreMinLevel(self, ignoreLevel:logLevel):
        self.__ignoreLevel = ignoreLevel
    def setIgnoreLevel(self, ignoreLevelDict:dict):
        self.__ignoreLevelDict = ignoreLevelDict
Log = log()