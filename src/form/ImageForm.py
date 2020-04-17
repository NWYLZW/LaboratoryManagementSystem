from flask_wtf import FlaskForm
from wtforms import FileField
from flask_wtf.file import FileRequired, FileAllowed

class JPGForm(FlaskForm):
    image = FileField('image',validators=[FileRequired('未提交图片'),
                                   FileAllowed(['jpg'],'文件格式错误')])
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class PNGForm(FlaskForm):
    image = FileField('image',validators=[FileRequired('未提交图片'),
                                   FileAllowed(['png'],'文件格式错误')])
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)
class JPGAndPNGForm(FlaskForm):
    image = FileField('image',validators=[FileRequired('未提交图片'),
                                   FileAllowed(['jpg','png'],'文件格式错误')])
    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)