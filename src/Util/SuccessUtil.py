from src.Bean.Information import Information

class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
        },{
            -1001:"用户注册成功",
        })
successUtil = SuccessUtil()