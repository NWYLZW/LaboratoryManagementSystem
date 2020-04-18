from src import db, MainLog


class Direction(db.Model):
    __tablename__ = 'Direction'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    imgName = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)

    users = db.relationship('User', backref='direction', lazy='dynamic')
    def getCont(self):
        return self.users.count()
    def __init__(self,name:str="",imgName:str="",content:str=""):
        self.name = name
        self.imgName = imgName
        self.content = content
    def toDict(self)->dict:
        return {
            'id':self.id,
            'name':self.name,
            'imgName':self.imgName,
            'content':self.content,
        }
    @staticmethod
    def getDict()->dict:
        directionDict = {}
        for direction in Direction.query.filter_by().all():
            directionDict[direction.id] = {
                'name':direction.name,
                'imgName':direction.imgName,
                'content':direction.content,
            }
        return directionDict
    @staticmethod
    def updateDirection(id:str = "", name:str = "", imgName:str = "", content:str = ""):
        try:
            if not id.isdigit(): return 2
            direction = Direction.query.filter_by(id=int(id)).first()
            if direction is None:
                direction = Direction(name,imgName,content)
            else:
                direction.name = name
                direction.imgName = imgName
                direction.content = content
            db.session.add(direction)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"向数据库添加方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return 1
        db.session.commit()
        return 0
    @staticmethod
    def getAllData():
        directionList = []
        try:
            directions = Direction.query.filter_by().all()
            for direction in directions:
                directionDict = direction.toDict()
                directionDict['users'] = [user.toBriefDict() for user in direction.users.all()]
                directionList.append(directionDict)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,"从数据库获取方向信息发生错误")
            MainLog.record(MainLog.level.ERROR,e)
            return None
        db.session.commit()
        return directionList
