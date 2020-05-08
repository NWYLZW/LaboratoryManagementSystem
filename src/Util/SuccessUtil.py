from src.Bean.Information import Information
from src.Information.CaptalInformation import captal
from src.Information.MyInformation import my
from src.Information.NoticeInformation import notice

class SuccessUtil(Information):
    def __init__(self):
        super().__init__({
            "registerSuccess":-1001,
            "loginSuccess":-1002,
            **(editMyData['typeDict']),
            "markSuccess":-2001,
            **(notice['s']['typeDict']),
            'editPermissionSuccess':-4001,
            'updateDirectionSuccess':-5001,
            'updateLaboratorySuccess':-5002,
            'addProfessionalClassSuccess':-5003,
            **leaveMessage['typeDict'],
            **(captal['s']['typeDict']),
            **(my['s']['typeDict']),
        },{
            -1001:"欢迎成为我们的一员",
            -1002:"用户登陆成功",
            **(editMyData['dict']),
            -2001:"用户签到成功",
            **(notice['s']['dict']),
            -4001:"修改权限成功",
            -5001:"更新方向信息成功",
            -5002:"更新实验室信息成功",
            -5003:"添加专业班级信息成功",
            **leaveMessage['dict'],
            **(captal['s']['dict']),
            **(my['s']['dict']),
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
leaveMessage = {
    'typeDict': {
        'leaveMessageSuccess':-6001,
        'replyLeaveMessageSuccess':-6002,
        'likeLeaveMessageSuccess':-6003,
        'unlikeLeaveMessageSuccess':-6004,
        'deleteLeaveMessageSuccess':-6005,
    },
    'dict': {
        -6001:"留言成功",
        -6002:"回复留言成功",
        -6003:"赞留言成功",
        -6004:"取消赞留言成功",
        -6005:"删除留言成功",
    }
}

successUtil = SuccessUtil()