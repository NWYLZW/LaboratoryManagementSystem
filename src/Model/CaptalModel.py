from src import db, MainLog
from src.Model.UserModel import User

class Captal(db.Model):
    __table__ = "Captal"
    laboratoryId = db.Column(db.INTEGER,primary_key=True)
    @property
    def laboratory(self):
        from src.Model.LaboratoryModel import Laboratory
        return Laboratory.query.filter_by(self.laboratoryId).first()
    journalDaybook = db.relationship('JournalDaybook', backref='Captal', lazy='dynamic')
    remainingMoney = db.Column(db.DECIMAL(10,2),nullable=False)
    def __init__(self,laboratoryId:int=-1):
        self.laboratoryId = laboratoryId
        pass
    @staticmethod
    def new(laboratoryId):
        try:
            captal = Captal(laboratoryId)
            db.session.add(captal)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"新建账单表错误")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return captal
    def cost(self,userId,changeReason,changeMoney):
        try:
            if changeMoney+self.remainingMoney<0:
                return 2
            journalDaybook = JournalDaybook(userId,changeReason,changeMoney)
            db.session.add(journalDaybook)
            self.remainingMoney += changeMoney
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"新建账单表错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
class JournalDaybook(db.Model):
    __table__ = "JournalDaybook"
    id = db.Column(db.INTEGER,primary_key=True)
    captalId = db.Column(db.Integer,db.ForeignKey('Captal.laboratoryId'), nullable=False)
    changeMoneyUserId = db.Column(db.Integer, nullable=False)
    @property
    def changeMoneyUser(self):
        return User.query.filter_by(id=self.changeMoneyUserId).first()
    changeReason = db.Column(db.Text)
    changeMoney = db.Column(db.DECIMAL(10,2),nullable=False)
    def __init__(self,userId,changeReason,changeMoney):
        self.userId = userId
        self.changeReason = changeReason
        self.changeMoney = changeMoney
        pass