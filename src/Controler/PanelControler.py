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
        'name': "检索人员",
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
moneyContro = {
    'name': "资金管理",
    'url': '#5',
    'icoClass': 'fa fa-bank fa-1_5x',
    'child': [{
        'permission': [
            Permission.PERSON_DATA_ADSC,
        ],
        'name': "管理面板",
        'url': '#captal-panel',
        'icoClass': 'fa fa-calendar fa-1_5x',
    },]
}
adminContro = {
    'name': "超级管理",
    'url': '#4',
    'icoClass': 'fa fa-cubes fa-1_5x',
    'child': [{
        'permission': [
            Permission.ADMINISTER,
        ],
        'name': "权限修改",
        'url': '#admin-editPermission',
        'icoClass': 'fa fa-cube fa-1_5x',
    },{
        'permission': [
            Permission.ADMINISTER,
        ],
        'name': "修改轮播图",
        'url': '#admin-editLoginNotice',
        'icoClass': 'fa fa-cube fa-1_5x',
    },]
}
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
        useList = [commonUse.copy(),
                   my.copy(),
                   peopleContro.copy(),
                   moneyContro.copy(),
                   adminContro.copy(),]
        responUseList = []
        for i in range(useList.__len__()):
            childs = []
            useMenu = useList[i]
            for j in range(useMenu['child'].__len__()):
                child = useMenu['child'][j]
                if not child.get('permission'):
                    continue
                flag = False
                for permission in child['permission']:
                    if current_user.can(permission):
                        flag = True
                        break
                if flag:
                    # 返回json去除permission属性，防止窃取信息
                    childs.append({
                        'name': child['name'],
                        'url': child['url'],
                        'icoClass': child['icoClass'],
                    })
            if childs.__len__() != 0:
                responUseList.append(useList[i])
                useList[i]['child'] = childs
        print(responUseList)
        return JsonUtil().dictToJson(responUseList)

panelControler = PanelControler()