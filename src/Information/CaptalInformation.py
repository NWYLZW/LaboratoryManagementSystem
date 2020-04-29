#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File           :   CaptalInformation.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/4/27 22:39
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   
'''
__all__ = ['captal']
captalChange = {'s':{
    'typeDict': {
        'setSpendSuccess':-7001,
    }, 'dict': {
        -7001:"设置花费成功",
    }},'e':{
    'typeDict': {
        'notSufficientFunds':5001,
    }, 'dict': {
        5001:"实验室余额不足",
    }},}
captal = {'s':{
    'typeDict': {
        **(captalChange['s']['typeDict']),
    }, 'dict': {
        **(captalChange['s']['dict']),
    }},'e':{
    'typeDict': {
        **(captalChange['e']['typeDict']),
    }, 'dict': {
        **(captalChange['e']['dict']),
    }},}