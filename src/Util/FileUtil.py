# TODO 文件收发存储帮助类
import os
import shutil

from flask import make_response, send_file

from src import MainLog

class FileUtil:
    def __init__(self):
        self.webPath = "./res/web"
        self.resImagePath = "./res/image"
    def saveToRes(self,uploadFile=None,path="",fileName="")->bool:
        try:
            uploadFile.save( os.path.join( self.resImagePath, path, fileName) )
            return True
        except Exception as e:
            MainLog.record(MainLog.level.WARN,e)
            return False
    def getFromRes(self,path="",fileName=""):
        response = make_response(
            send_file(
                os.path.join( '.'+self.resImagePath, path, fileName),
                as_attachment=True))
        response.headers["Content-Disposition"] = "attachment; filename={}".format(fileName.encode().decode('latin-1'))
        return response
    def copyWebToImageRes(self,webPath,resPath):
        try:
            shutil.copy(
                os.path.join(self.webPath,webPath),
                os.path.join(self.resImagePath,resPath))
        except Exception as e:
            MainLog.record(MainLog.level.WARN,"FileUtil.removeWebToRes")
            MainLog.record(MainLog.level.WARN,e)
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