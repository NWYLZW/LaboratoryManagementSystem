from src import db


class Direction(db.Model):
    __tablename__ = 'Direction'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship('User', backref='direction', lazy='dynamic')