from src.Bean.Information import Information

class ErrorUtil(Information):
    def __init__(self):
        super().__init__({
            'get':0,
            'post':1,
            'dataValidation':2,
        }, {
            0:"禁止以Get形式获取资源",
            1:"禁止以Post形式获取资源",
            2:"数据验证错误",
        })