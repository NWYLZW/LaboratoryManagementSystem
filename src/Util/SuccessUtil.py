from src.Bean.Information import Information

class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
            "loginSuccess":-1002,
            "markSuccess":-2001,
        },{
            -1001:"用户注册成功",
            -1002:"用户登陆成功",
            -2001:"用户签到成功",
        })
successUtil = SuccessUtil()