from src.Bean.Information import Information
from src.Information.CaptalInformation import captal
from src.Information.MyInformation import my
from src.Information.NoticeInformation import notice

class ErrorUtil(Information):
    def __init__(self):
        super().__init__({
            "FormDataWrong":0,
            "backEndWrong0":1,
            "backEndWrong1":2,
            "backEndWrong2":3,
            'dataBaseError':4,
            'permissionError':5,
            **(userData['typeDict']),
            'MarkIpError':2001,
            'OutOfTimeError':2002,
            'MarkTimeExceedError':2003,
            'TotalMarkTimeExceedError':2004,
            'MarkTimeNotEnoughError':2005,
            **(notice['e']['typeDict']),
            **leaveMessage['typeDict'],
            **(captal['e']['typeDict']),
            **(my['e']['typeDict']),
        }, {
            0:"表单数据错误",
            1:"后端Error对象未配置参数，请附上url通知后端检查该接口",
            2:"后端Error对象参数配置错误，请附上url通知后端检查该接口",
            3:"后端程序错误",
            4:"数据库错误",
            5:"无权限操作",
            **(userData['dict']),
            2001:"未在实验室内签到",
            2002:"未在签到时间内",
            2003:"该时间段内已签到两次",
            2004:"一天最多签到六次",
            2005:"距离上次签到未达到两个小时",
            **(notice['e']['dict']),
            **leaveMessage['dict'],
            **(captal['e']['dict']),
            **(my['e']['dict']),
        })
userData = {
    'typeDict':{
        'UserNameNone':1001,
        'PasswordWrong':1002,
        'UserNameExist':1003,
        'changeHeadPortraitError':1004,
        'changeBackgroundError':1005,
    },
    'dict':{
        1001:"该schoolId用户不存在",
        1002:"密码错误",
        1003:"schoolId用户已存在，若有错误请联系管理",
        1004:"头像修改失败",
        1005:"背景修改失败",
    }
}
leaveMessage = {
    'typeDict': {
        'LeaveMessageIsNone':4001,
    },
    'dict': {
        4001:"留言不存在",
    }
}

errorUtil = ErrorUtil()