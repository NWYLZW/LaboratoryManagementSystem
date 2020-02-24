from src import db

class LoginNotice(db.Model):
    __tablename__ = 'LoginNotice'
    id = db.Column(db.Integer, primary_key=True)
    authorId = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    isShow = db.Column(db.Boolean, nullable=False)
    def __init__(self,authorId:int,date,title:str="",content:str="",isShow:str="False"):
        self.authorId = authorId
        self.date = date
        self.title = title
        self.content = content
        if isShow == "False":
            self.isShow = False
        else:
            self.isShow = True
    @property
    def backgroundImageSrc(self):
        return str(self.id)+self.title+".png"