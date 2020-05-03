#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File           :   PositiveNegativeNumberConverter.py
@License        :   (C)Copyright 2020
@Modify Time    :   2020/5/3 22:09
@Author         :   Superme
@Contact        :   yijie4188@gmail.com
@Desciption     :   负数转化器
'''
from werkzeug.routing import BaseConverter

class PositiveNegativeNumberConverter(BaseConverter):
    """负数转化器"""
    regex = r'-?\d*'