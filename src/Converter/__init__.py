#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File           :   __init__.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/5/3 22:08
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   
'''
__all__ = ['addConverter']
from .PositiveNegativeNumberConverter import PositiveNegativeNumberConverter
def addConverter(app):
    app.url_map.converters['positiveNegative'] = PositiveNegativeNumberConverter