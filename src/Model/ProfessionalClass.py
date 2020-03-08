from src import db


class ProfessionalClass(db.Model):
    __tablename__ = 'ProfessionalClass'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship('User', backref='professionalClass', lazy='dynamic')
    def getCont(self):
        return self.users.count()