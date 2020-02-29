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
            MainLog.record(MainLog.level.WARN,e)
            return False
    def changeToWeb(self,uploadFile=None,path="",oldFileName="",newFileName="")->bool:
        try:
            if uploadFile != None and newFileName != "":
                os.remove( os.path.join( self.webPath, path, oldFileName) )
                uploadFile.save( os.path.join( self.webPath, path, newFileName) )
            return True
        except Exception as e:
            MainLog.record(MainLog.level.WARN,e)
            return False
    def removeToWeb(self,path="",fileName="")->bool:
        try:
            os.remove( os.path.join( self.webPath, path, fileName) )
            return True
        except Exception as e:
            MainLog.record(MainLog.level.WARN,e)
            return False

fileUtil = FileUtil()