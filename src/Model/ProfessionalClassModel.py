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
        return self.professional+'-'+"%02d"%self.gradle+"%02d"%self.classNum
    def toDict(self)->dict:
        return {
            'professional':self.professional,
            'gradle':self.gradle,
            'classNum':self.classNum,
        }

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
        '''
        :param professional: 专业名
        :param gradle: 年级
        :param classNum: 班级
        :return: {
        0:"添加成功",
        1:"数据库错误",
        2:"专业已存在",
        }
        '''
        try:
            professionalClass = ProfessionalClass.query.filter_by(professional=professional).first()
            if professionalClass is None:
                professionalClass = ProfessionalClass(professional,gradle,classNum)
            else:return 2
            db.session.add(professionalClass)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"向数据库添加专业方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    @staticmethod
    def getAllData():
        professionalClassList = []
        try:
            professionalClasses = ProfessionalClass.query.filter_by().all()
            for professionalClass in professionalClasses:
                professionalClassDict = professionalClass.toDict()
                professionalClassDict['users'] = [user.toBriefDict() for user in professionalClass.users.all()]
                professionalClassList.append(professionalClassDict)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"从数据库获取方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return professionalClassList