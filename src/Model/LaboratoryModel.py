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
    def updateLaboratory(blockNum:str= "", doorNum:str= "", content:str= ""):
        try:
            laboratory = Laboratory.query.filter_by(blockNum=blockNum,doorNum=doorNum).first()
            if laboratory is None:
                laboratory = Laboratory(blockNum,doorNum,content)
            laboratory.content = content
            db.session.add(laboratory)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"向数据库添加实验室信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0