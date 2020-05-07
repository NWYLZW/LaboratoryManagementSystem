from src import db, MainLog

class Laboratory(db.Model):
    __tablename__ = 'Laboratory'
    id = db.Column(db.Integer, primary_key=True)
    blockNum = db.Column(db.String, nullable=False)
    doorNum = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)

    users = db.relationship('User', backref='laboratory', lazy='dynamic')
    def getCont(self):
        return self.users.count()
    def __init__(self,blockNum:str= "", doorNum:str= "", content:str= ""):
        self.blockNum = blockNum
        self.doorNum = doorNum
        self.content = content
    @property
    def captal(self):
        from src.Model.CaptalModel import Captal
        captal = Captal.query.filter_by(self.id).first()
        if captal!=None: return captal
        else:
            return Captal.new(self.id)
    def toDict(self)->dict:
        return {
            'id':self.id,
            'blockNum':self.blockNum,
            'doorNum':self.doorNum,
            'content':self.content,
        }
    @staticmethod
    def getDict()->dict:
        laboratoryDict = {}
        for laboratory in Laboratory.query.filter_by().all():
            laboratoryDict[laboratory.id] = {
                'blockNum':laboratory.blockNum,
                'doorNum':laboratory.doorNum,
                'content':laboratory.content,
            }
        return laboratoryDict
    @staticmethod
    def updateLaboratory(id:str= "", blockNum:str= "", doorNum:str= "", content:str= ""):
        try:
            if not id.isdigit() and id!='-1': return 2
            laboratory = Laboratory.query.filter_by(id=id).first()
            if laboratory is None:
                laboratory = Laboratory(blockNum,doorNum,content)
            else:
                laboratory.blockNum = blockNum
                laboratory.doorNum = doorNum
                laboratory.content = content
            db.session.add(laboratory)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"向数据库添加实验室信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    @staticmethod
    def getAllData(haveUser:bool=True):
        """
        :param haveUser:当值为True时会返回实验室成员信息
        :return:
        """
        laboratoryList = []
        try:
            laboratorys = Laboratory.query.filter_by().all()
            for laboratory in laboratorys:
                laboratoryDict = laboratory.toDict()
                if haveUser: laboratoryDict['users'] = [user.toBriefDict() for user in laboratory.users.all()]
                laboratoryList.append(laboratoryDict)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"从数据库获取方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return laboratoryList