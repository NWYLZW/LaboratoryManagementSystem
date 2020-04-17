from src.Bean.Information import Information


class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
            "loginSuccess":-1002,
            **(editMyData['typeDict']),
            "markSuccess":-2001,
            **loginNotice['typeDict'],
            'editPermissionSuccess':-4001,
            'updateDirectionSuccess':-5001,
            'updateLaboratorySuccess':-5002,
            'updateProfessionalClassSuccess':-5003,
            **leaveMessage['typeDict'],
        },{
            -1001:"欢迎成为我们的一员",
            -1002:"用户登陆成功",
            **(editMyData['dict']),
            -2001:"用户签到成功",
            **loginNotice['dict'],
            -4001:"修改权限成功",
            -5001:"更新方向信息成功",
            -5002:"更新实验室信息成功",
            -5003:"添加专业班级信息成功",
            **leaveMessage['dict'],
        })
editMyData = {
    'typeDict':{
            "editMyBaseDataSuccess": -1101,
            "editMyPrivacyDataSuccess": -1102,
            "editMyPWDSuccess": -1103,
            "editDirectionSuccess": -1104,
            "editLaboratorySuccess": -1105,
    },
    'dict':{
            -1101:"基本信息修改成功",
            -1102:"邮箱修改成功",
            -1103:"密码修改成功",
            -1104:"方向修改申请成功",
            -1105:"实验室调换申请成功",
    }
}
loginNotice = {
    'typeDict': {
        'delLoginNoticeSuccess':-3001,
        'addLoginNoticeSuccess':-3002,
        'editLoginNoticeSuccess':-3003,
    },
    'dict': {
        -3001:"删除login轮播成功",
        -3002:"添加login轮播成功",
        -3003:"编辑login轮播成功",
    }
}
leaveMessage = {
    'typeDict': {
        'leaveMessageSuccess':-6001,
        'replyLeaveMessageSuccess':-6002,
    },
    'dict': {
        -6001:"留言成功",
        -6002:"回复留言成功",
    }
}

successUtil = SuccessUtil()