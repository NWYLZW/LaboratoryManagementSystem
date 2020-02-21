from src import db

class Mark(db.Model):
    __tablename__ = 'Mark'
    id = db.Column(db.Integer, primary_key=True)
    dateTime = db.Column(db.DateTime, nullable=False)
    userId = db.Column(db.Integer, nullable=False)

    def __init__(self,dateTime,userId):
        self.dateTime = dateTime
        self.userId = userId
        pass