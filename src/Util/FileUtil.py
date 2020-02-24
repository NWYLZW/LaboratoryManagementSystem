# TODO 文件收发存储帮助类
import os

from src import MainLog


class FileUtil:
    def __init__(self):
        self.webPath = "./res/web"
        self.resImagePath = "./res/image"
    def saveToWeb(self,uploadFile=None,path="",fileName="")->bool:
        try:
            uploadFile.save( os.path.join( self.webPath, path, fileName) )
            return True
        except Exception as e:
            MainLog.record(MainLog.level.DEBUG,e)
            return False

fileUtil = FileUtil()