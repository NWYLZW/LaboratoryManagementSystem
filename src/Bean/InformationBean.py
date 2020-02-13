from src.Util.JsonUtil import JsonUtil

class InformationBean:
    def __init__(self, typeDict:dict={}, dictx:dict={}):
        self.InformationTypeDict = typeDict
        self.InformationDict = dictx
    def getData(self,typeName:str):
        type = self.InformationTypeDict[typeName]
        return JsonUtil().dictToJson({
            "type":type,
            "content":self.InformationDict[type],
        })