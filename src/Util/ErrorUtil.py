from src.Bean.Information import Information

class ErrorUtil(Information):
    def __init__(self):
        super().__init__({
            "FormDataWrong":0,
            "backEndWrong0":1,
            "backEndWrong1":2,
            "backEndWrong2":3,
            'UserNameNone':1001,
            'PasswordWrong':1002,
            'UserNameExist':1003,
            'MarkIpError':2001,
        }, {
            0:"表单数据错误",
            1:"后端Error对象未配置参数，请附上url通知后端检查该接口",
            2:"后端Error对象参数配置错误，请附上url通知后端检查该接口",
            3:"后端程序错误",
            1001:"用户名不存在",
            1002:"密码错误",
            1003:"用户名已存在",
            2001:"未在实验室内签到",
        })
errorUtil = ErrorUtil()