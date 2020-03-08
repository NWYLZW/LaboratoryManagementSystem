from src import db


class Laboratory(db.Model):
    __tablename__ = 'Laboratory'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship('User', backref='laboratory', lazy='dynamic')
    def getCont(self):
        return self.users.count()