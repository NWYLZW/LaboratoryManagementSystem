from flask import Blueprint, request

from src.Controler.NoticeControler import noticeControler

noticeBluePrint = Blueprint(
    'notice',
    __name__,
    url_prefix='/notice',)

# TODO 添加管理员权限
# 管理员编辑页面获取信息
@noticeBluePrint.route("/loginNotice",methods=['POST'])
def loginNotice():
    return noticeControler.getLoginNotice()

# 登陆页面获取信息
@noticeBluePrint.route("/loginNoticeShow",methods=['POST'])
def loginNoticeShow():
    return noticeControler.getLoginNotice(True)

# TODO 权限检测
# 公告信息
@noticeBluePrint.route("/addNotice",methods=['GET'])
def addNotice():
    return noticeControler.addNotice(request.json)
@noticeBluePrint.route("/viewNotice",methods=['GET'])
def viewNotice():
    return noticeControler.viewNotice(2)