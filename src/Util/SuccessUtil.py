from src.Bean.Information import Information

class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
            "loginSuccess":-1002,
        },{
            -1001:"用户注册成功",
            -1002:"用户登陆成功",
        })
successUtil = SuccessUtil()