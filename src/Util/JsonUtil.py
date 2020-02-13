import json

class JsonUtil():
    def __init__(self):
        pass
    def dictToJson(self,dictx:dict={}):
        return json.dumps(dictx, default=lambda obj: obj.__dict__, sort_keys=False, indent=4)