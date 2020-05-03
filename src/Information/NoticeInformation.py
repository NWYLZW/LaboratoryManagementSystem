# -*- coding: utf-8 -*-
__all__ = ['notice']
loginNotice = {'s':{
    'typeDict': {
        'delLoginNoticeSuccess':-3001,
        'addLoginNoticeSuccess':-3002,
        'editLoginNoticeSuccess':-3003,
    },'dict': {
        -3001:"删除登陆界面轮播成功",
        -3002:"添加登陆界面轮播成功",
        -3003:"更新登陆界面轮播成功",
    }},'e':{
    'typeDict': {
        'LoginNoticeIdNone':3001,
        'LoginNoticeNone':3002,
        'LoginNoticeMax6':3003,
        'addLoginNoticeImageError':3004,
        'LoginNoticeMin2':3005,
        'editLoginNoticeImageError':3006,
    }, 'dict': {
        3001:"该Id loginNotice不存在",
        3002:"loginNotice不存在",
        3003:"LoginNotice最大为6",
        3004:"添加LoginNoticeImage出现了错误",
        3005:"LoginNotice最小为2",
        3006:"修改LoginNoticeImage出现了错误",
    }},}
normalNotice = {'s':{
    'typeDict': {
        'addNoticeSuccess':-3101,
        'viewNoticeSuccess':-3102,
    }, 'dict': {
        -3101:"添加公告成功",
        -3102:"查看公告成功",
    }},'e':{
    'typeDict': {
        'NoticeNone':3101,
    }, 'dict': {
        3101:"该公告不存在",
    }},}
notice = {'s':{
    'typeDict': {
        **(loginNotice['s']['typeDict']),
        **(normalNotice['s']['typeDict']),
    }, 'dict': {
        **(loginNotice['s']['dict']),
        **(normalNotice['s']['dict']),
    }},'e':{
    'typeDict': {
        **(loginNotice['e']['typeDict']),
        **(normalNotice['e']['typeDict']),
    }, 'dict': {
        **(loginNotice['e']['dict']),
        **(normalNotice['e']['dict']),
    }},}