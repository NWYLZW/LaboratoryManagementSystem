from flask import Blueprint

noticeBluePrint = Blueprint(
    'notice',
    __name__,
    url_prefix='/notice',)

# TODO 总公告
#  专业公告
#  实验室公告
#  登陆界面新闻信息
@noticeBluePrint.route("/",methods=['POST'])
def mark():
    return ""