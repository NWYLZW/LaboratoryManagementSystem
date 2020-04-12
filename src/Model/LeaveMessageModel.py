# -*- coding: utf-8 -*-
from src import db

class LeaveMessageModel(db.Model):
    __tablename__ = "LeaveMessage"
    id = db.Column(db.Integer, primary_key=True)
    replyId = db.Column('preId', db.Integer, db.ForeignKey('LeaveMessage.id'))
    replyLeaveMessage = db.relationship('LeaveMessage', backref='replyMessages', remote_side=[id])
    def __init__(self):
        pass