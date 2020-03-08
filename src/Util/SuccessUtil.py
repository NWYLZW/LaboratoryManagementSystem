from src.Bean.Information import Information

class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
            "loginSuccess":-1002,
            "markSuccess":-2001,
            'delLoginNoticeSuccess':-3001,
            'addLoginNoticeSuccess':-3002,
            'editLoginNoticeSuccess':-3003,
            'editPermissionSuccess':-4001,
            'updateDirectionSuccess':-5001,
        },{
            -1001:"用户注册成功",
            -1002:"用户登陆成功",
            -2001:"用户签到成功",
            -3001:"删除login轮播成功",
            -3002:"添加login轮播成功",
            -3003:"编辑login轮播成功",
            -4001:"修改权限成功",
            -5001:"更新方向信息成功",
        })
successUtil = SuccessUtil()