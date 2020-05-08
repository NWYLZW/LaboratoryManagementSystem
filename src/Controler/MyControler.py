#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File           :   MyControler.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/5/8 19:45
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   
'''
from src import db, MainLog


class MyControler:
    def __init__(self):
        pass
    def editMyEmail(self,user,oldEmail,newEmail):
        '''
        :param user: 用户对象
        :param oldEmail: 旧邮箱
        :param newEmail: 新邮箱
        :return: {
        0:"邮箱修改成功",
        1:"数据库错误",
        2:"旧邮箱错误",
        }
        '''
        if not user.email == oldEmail: return 2
        try:
            user.email = newEmail
            db.session.add(user)
            db.session.flush()
        except Exception as e:
            MainLog.record(MainLog.level.ERROR,user.id+" 邮箱修改时数据库错误")
            MainLog.record(MainLog.level.ERROR,e)
        db.session.commit()
        return 0

myControler = MyControler()