from flask_login import current_user

from src.Model.RoleModel import Permission
from src.Util.JsonUtil import JsonUtil

commonUse = {
    'name': "常用",
    'url': '#1',
    'icoClass': 'fa fa-tags fa-1_5x',
    'child': [{
        'permission': [
            Permission.PERSON_DATA_ADSC,
        ],
        'name': "常用0",
        'url': '#None',
        'icoClass': 'fa fa-tag fa-1_5x',
    }, ]}
my = {
    'name': "我的",
    'url': '#1',
    'icoClass': 'fa fa-user-circle-o fa-1_5x',
    'child': [{
        'permission': [
            Permission.PERSON_DATA_ADSC,
        ],
        'name': "我的主页",
        'url': '#my-space',
        'icoClass': 'fa fa-building fa-1_5x',
    }, {
        'permission': [
            Permission.PERSON_DATA_ADSC,
        ],
        'name': "个人信息",
        'url': '#my-info',
        'icoClass': 'fa fa-vcard fa-1_5x',
    }, ]
}
peopleContro = {
    'name': "人员管理",
    'url': '#3',
    'icoClass': 'fa fa-users fa-1_5x',
    'child': [{
        'permission': [
            Permission.ALL_SIMPLE_DATA_S,
            Permission.LABORATORY_DATA_ADCS,
            Permission.DIRECTION_DATA_ADCS,
            Permission.ALL_FULL_DATA_S,
        ],
        'name': "人员列表",
        'url': '#user-searchUser',
        'icoClass': 'fa fa-address-book fa-1_5x',
    }, {
        'permission': [
            Permission.LABORATORY_DATA_ADCS,
            Permission.DIRECTION_DATA_ADCS,
            Permission.ALL_DATA_ADC,
        ],
        'name': "人员异动",
        'url': '#peopple-change',
        'icoClass': 'fa fa-user-plus fa-1_5x',
    }, ]
}
# moneyContro = {
#     'name': "资金管理",
#     'url': '#5',
#     'icoClass': 'fa fa-bank fa-1_5x',
#     'child': []
# }
# resourceContro = {
#     'name': "资源管理",
#     'url': '#4',
#     'icoClass': 'fa fa-area-chart fa-1_5x',
#     'child': []
# }
# workContro = {
#     'name': "工作管理",
#     'url': '#6',
#     'icoClass': 'fa fa-tasks fa-1_5x',
#     'child': []
# }

class PanelControler:
    def __init__(self):
        pass
    def getMenuDict(self):
        useList = [commonUse,my,peopleContro]
        for useMenu in useList:
            for i in range(useMenu['child'].__len__()):
                child = useMenu['child'][i]
                if not child.get('permission'):
                    continue
                flag = True
                for permission in child['permission']:
                    if current_user.can(permission):
                        flag = False
                        break
                del child['permission']
                if flag:
                    del useMenu['child'][i]
            if useMenu['child'].__len__() == 0: del useMenu
        return JsonUtil().dictToJson(useList)

panelControler = PanelControler()