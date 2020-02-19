from src import db

class Permission:
    # add delete search change
    # 个人信息增删查改
    PERSON_DATA_ADSC = 0x001
    # 同一实验室人员信息增删查改
    LABORATORY_DATA_ADSC = 0x002
    # 同一方向信人员息增删查改
    DIRECTION_DATA_ADSC = 0x003
    # 所有人员信息增删查改
    ALL_DATA_ADSC = 0x004
    # 同一实验室资金查
    LABORATORY_MONEY_S = 0x010
    # 同一实验室资金增删
    LABORATORY_MONEY_AD = 0x020
    # 所有实验室资金查
    ALL_MONEY_S = 0x030
    # 所有实验室资金改删
    ALL_MONEY_CD = 0x040
    ADMINISTER = 0x800

class Role(db.Model):
    __tablename__ = 'Role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    # index为改字段创建索引，default为设置默认值
    default = db.Column(db.Boolean, default=False, index=True)
    # 以数字表示权限等级
    permissions = db.Column(db.Integer)
    # 动态关联
    user = db.relationship('User', backref='Role', lazy='dynamic')
    @staticmethod
    def insert_roles():
        roles = {
            'CommonUser':(
                Permission.PERSON_DATA_ADSC |
                Permission.LABORATORY_MONEY_S
                ,True),
            'LaboratiryModerator':(
                Permission.PERSON_DATA_ADSC |
                Permission.LABORATORY_DATA_ADSC |
                Permission.LABORATORY_MONEY_S |
                Permission.LABORATORY_MONEY_AD
                ,False),
            'DirectionModerator':(
                Permission.PERSON_DATA_ADSC |
                Permission.DIRECTION_DATA_ADSC
                ,False),
            'Moderator':(
                Permission.PERSON_DATA_ADSC |
                Permission.ALL_DATA_ADSC |
                Permission.ALL_MONEY_S |
                Permission.ALL_MONEY_CD
                ,False),
            'Boos':(
                Permission.PERSON_DATA_ADSC |
                Permission.ALL_DATA_ADSC |
                Permission.ALL_MONEY_S
                ,False),
            'Administrator':(0xfff,False),
        }
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.permissions = roles[r][0]
            role.default = roles[r][1]
            db.session.add(role)
        db.session.commit()