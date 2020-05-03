import decimal

from src import db, MainLog
from src.Model.UserModel import User
from src.Util.TimeUtil import timeUtil


class Captal(db.Model):
    __tablename__ = "Captal"
    laboratoryId = db.Column(db.INTEGER,primary_key=True)
    @property
    def laboratory(self):
        from src.Model.LaboratoryModel import Laboratory
        return Laboratory.query.filter_by(id=self.laboratoryId).first()
    journalDaybook = db.relationship('JournalDaybook', backref='Captal', lazy='dynamic')
    remainingMoney = db.Column(db.DECIMAL(10,2),nullable=False)
    def __init__(self,laboratoryId:int=-1):
        self.laboratoryId = laboratoryId
        pass
    @staticmethod
    def new(laboratoryId):
        '''
        :param laboratoryId:实验室id
        :return:返回一个账单对象
        '''
        try:
            captal = Captal(laboratoryId)
            captal.remainingMoney = decimal.Decimal('0.00')
            db.session.add(captal)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"新建账单表错误")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return captal
    def cost(self,userId:int,changeReason:str,changeMoney:decimal):
        '''
        :param userId:
        :param changeReason:
        :param changeMoney:
        :return: {
        0:"资金变动成功",
        1:"数据库错误",
        2:"余额不足",
        }
        '''
        try:
            if changeMoney+self.remainingMoney<0:
                return 2
            journalDaybook = JournalDaybook(
                captalId=self.laboratoryId,changeMoneyUserId=userId,
                changeReason=changeReason,changeMoney=changeMoney,
                remainingMoney=changeMoney+self.remainingMoney)
            db.session.add(journalDaybook)
            self.remainingMoney += changeMoney
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"账单添加花销失败")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
class JournalDaybook(db.Model):
    __tablename__ = "JournalDaybook"
    id = db.Column(db.INTEGER,primary_key=True)
    captalId = db.Column(db.Integer,db.ForeignKey('Captal.laboratoryId'), nullable=False)
    changeMoneyUserId = db.Column(db.Integer, nullable=False)
    @property
    def changeMoneyUser(self):
        return User.query.filter_by(id=self.changeMoneyUserId).first()
    changeReason = db.Column(db.Text)
    changeMoney = db.Column(db.DECIMAL(10,2),nullable=False)
    dateTime = db.Column(db.DateTime, nullable=False)
    remainingMoney = db.Column(db.DECIMAL(10,2),nullable=False)
    def __init__(self,captalId,changeMoneyUserId,changeReason,changeMoney,remainingMoney):
        self.captalId = captalId
        self.changeMoneyUserId = changeMoneyUserId
        self.changeReason = changeReason
        self.changeMoney = changeMoney
        self.remainingMoney = remainingMoney
        self.dateTime = timeUtil.nowDateStr()
        pass
    def toDict(self):
        return {
            'id':self.id,
            'captalId':self.captalId,
            'changeMoneyUserId':self.changeMoneyUserId,
            'changeMoneyUser':self.changeMoneyUser.toBriefDict(),
            'changeReason':self.changeReason,
            'changeMoney':str(self.changeMoney),
            'remainingMoney':str(self.remainingMoney),
            'dateTime':str(self.dateTime),
        }