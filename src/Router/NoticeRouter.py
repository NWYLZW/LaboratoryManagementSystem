from flask import Blueprint, request

from src.Controler.NoticeControler import noticeControler
from src.Util.ErrorUtil import errorUtil
from src.Util.JsonUtil import JsonUtil
from src.Util.SuccessUtil import successUtil

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
@noticeBluePrint.route("/addNotice",methods=['POST'])
def addNotice():
    messageDict = [
        'addNoticeSuccess',
        'dataBaseError',
        'FormDataWrong',
        'permissionError',
    ]
    result = noticeControler.addNotice(request.json['title'],request.json['content'],request.json['kindNum'])
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])
@noticeBluePrint.route("/getNotices",methods=['GET'])
def getNotices():
    return JsonUtil().dictToJson(noticeControler.getNotices())
@noticeBluePrint.route("/viewNotice",methods=['GET'])
def viewNotice():
    messageDict = [
        'viewNoticeSuccess',
        'dataBaseError',
        'FormDataWrong',
        'NoticeNone',
    ]
    noticeId = request.args.get("noticeId")
    result = noticeControler.viewNotice(noticeId)
    if result == 0:
        return successUtil.getData(messageDict[result])
    else:
        return errorUtil.getData(messageDict[result])