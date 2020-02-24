from flask import Blueprint

from src.Controler.NoticeControler import noticeControler

noticeBluePrint = Blueprint(
    'notice',
    __name__,
    url_prefix='/notice',)

# TODO 总公告
#  专业公告
#  实验室公告
#  登陆界面新闻信息
@noticeBluePrint.route("/loginNotice",methods=['GET'])
def loginNotice():
    return noticeControler.getLoginNotice()