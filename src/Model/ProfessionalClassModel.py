from src import db, MainLog


class ProfessionalClass(db.Model):
    __tablename__ = 'ProfessionalClass'
    id = db.Column(db.Integer, primary_key=True)
    professional = db.Column(db.String, nullable=False)
    gradle = db.Column(db.Integer, nullable=False)
    classNum = db.Column(db.Integer, nullable=False)

    users = db.relationship('User', backref='professionalClass', lazy='dynamic')
    def getCont(self):
        return self.users.count()
    def __init__(self,professional:str= "", gradle:int= -1, classNum:int= -1):
        self.professional = professional
        self.gradle = gradle
        self.classNum = classNum
    def getProfessionalClass(self):
        return self.professional+'-'+str(self.gradle)+str(self.classNum)

    @staticmethod
    def getDict()->dict:
        professionalClassDict = {}
        for professionalClass in ProfessionalClass.query.filter_by().all():
            professionalClassDict[professionalClass.id] = {
                'professional':professionalClass.professional,
                'gradle':professionalClass.gradle,
                'classNum':professionalClass.classNum,
            }
        return professionalClassDict
    @staticmethod
    def getProfessionalList()->list:
        professionalClassList = []
        professionalList = []
        for professionalClass in ProfessionalClass.query.filter_by().all():
            if professionalClass.professional not in professionalList:
                professionalList.append(professionalClass.professional)
                professionalClassList.append(
                    (str(professionalClass.id),
                     professionalClass.professional))

        return professionalClassList
    @staticmethod
    def addProfessionalClass(professional:str= "", gradle:int= -1, classNum:int= -1):
        try:
            professionalClass = ProfessionalClass(professional,gradle,classNum)
            db.session.add(professionalClass)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"向数据库添加专业方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0