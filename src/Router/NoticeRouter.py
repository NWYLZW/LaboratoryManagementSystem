from flask import Blueprint

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

# TODO 总公告
#  专业公告
#  实验室公告