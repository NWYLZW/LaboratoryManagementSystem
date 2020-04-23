from src import db

class Permission:
    # add delete search change
    # 个人信息增删改查
    PERSON_DATA_ADSC = 0x000001
    # 同一实验室人员信息增删改查
    LABORATORY_DATA_ADCS = 0x000002
    # 同一方向信人员息增删改查
    DIRECTION_DATA_ADCS = 0x000004
    # 所有人员信息增删改
    ALL_DATA_ADC = 0x000008
    # 所有人员简略信息查
    ALL_SIMPLE_DATA_S = 0x000010
    # 所有人员完整信息查
    ALL_FULL_DATA_S = 0x000020
    # 同一实验室资金查
    LABORATORY_MONEY_S = 0x000040
    # 同一实验室资金增删
    LABORATORY_MONEY_AD = 0x000080
    # 所有实验室资金查
    ALL_MONEY_S = 0x000100
    # 所有实验室资金改删
    ALL_MONEY_CD = 0x000200
    # 发布总公告
    PUBLISH_ALL_NOTICE = 0x000400
    # 发布实验室公告
    PUBLISH_LABORATORY_NOTICE = 0x000800
    # 发布方向公告
    PUBLISH_DIRECTION_NOTICE = 0x002000
    ADMINISTER = 0xffffff

class Role(db.Model):
    __tablename__ = 'Role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    # index为改字段创建索引，default为设置默认值
    default = db.Column(db.Boolean, default=False, index=True)
    # 以数字表示权限等级
    permissions = db.Column(db.Integer)
    # 动态关联
    users = db.relationship('User', backref='role', lazy='dynamic')
    @staticmethod
    def insert_roles():
        roles = {
            'CommonUser':(
                Permission.PERSON_DATA_ADSC |
                Permission.LABORATORY_MONEY_S |
                Permission.ALL_SIMPLE_DATA_S
                ,True),
            'LaboratiryModerator':(
                Permission.PERSON_DATA_ADSC |
                Permission.LABORATORY_MONEY_S |
                Permission.ALL_SIMPLE_DATA_S |
                Permission.LABORATORY_DATA_ADCS |
                Permission.PUBLISH_LABORATORY_NOTICE |
                Permission.LABORATORY_MONEY_AD
                , False),
            'DirectionModerator':(
                Permission.PERSON_DATA_ADSC |
                Permission.PUBLISH_DIRECTION_NOTICE |
                Permission.DIRECTION_DATA_ADCS
                ,False),
            'DirectionTeacher':(
                Permission.PERSON_DATA_ADSC |
                Permission.PUBLISH_DIRECTION_NOTICE |
                Permission.DIRECTION_DATA_ADCS
                ,False),
            # 'Moderator':(
            #     Permission.PERSON_DATA_ADSC |
            #     Permission.ALL_DATA_ADC |
            #     Permission.ALL_MONEY_S |
            #     Permission.ALL_MONEY_CD
            #     ,False),
            # 'Boos':(
            #     Permission.PERSON_DATA_ADSC |
            #     Permission.ALL_DATA_ADC |
            #     Permission.ALL_MONEY_S
            #     ,False),
            'Administrator':(Permission.ADMINISTER,False),
        }
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.permissions = roles[r][0]
            role.default = roles[r][1]
            db.session.add(role)
        db.session.commit()