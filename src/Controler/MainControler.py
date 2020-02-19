from src.Util.JsonUtil import JsonUtil

class MainControler:
    def __init__(self):
        pass
    def getButtonList(self,isLogin:bool):
        if isLogin:
            # MainLog.record(MainLog.level.DEBUG,"已登录")
            return JsonUtil().dictToJson([{
            'title': '用户信息',
            'url': '#userInfo'
        }, {
            'title': '面板',
            'url': '/panel'
        }, {
            'title': '登出',
            'url': '/user/logout'
        }, ])
        else:
            # MainLog.record(MainLog.level.DEBUG,"未登录")
            return JsonUtil().dictToJson([{
            'title': '关于',
            'url': '#about'
        }, {
            'title': '登陆',
            'url': '/user/login'
        }, {
            'title': '加入我们',
            'url': '/user/register'
        }, ])
    def getInfoByName(self,infoName,current_user):
        if not current_user.is_authenticated :
            infoDict = {
                "welcome":"<h1>LMS</h1><h2>(Laboratory Management System)</h2><h2>Welcome to you</h2>",
            }
            return infoDict[infoName]
        else:
            pass

mainControler = MainControler()