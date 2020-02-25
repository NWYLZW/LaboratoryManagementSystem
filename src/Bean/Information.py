from src.Util.JsonUtil import JsonUtil

class Information:
    def __init__(self, typeDict:dict=None, dictx:dict=None):
        self.InformationTypeDict = typeDict
        self.InformationDict = dictx
    def getData(self,typeName:str="backEndWrong0",message:str=""):
        type = self.InformationTypeDict.get(typeName)
        if type is None:
            return JsonUtil().dictToJson({
                "type":2,
                "content":self.InformationDict[2],
            })
        if message == "":
            return JsonUtil().dictToJson({
                "type":type,
                "content":self.InformationDict[type],
            })
        else:
            return JsonUtil().dictToJson({
                "type":type,
                "content":self.InformationDict[type],
                "message":message,
            })