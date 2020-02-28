from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FileField
from wtforms.validators import InputRequired
from flask_wtf.file import FileRequired, FileAllowed


class LoginNoticeForm(FlaskForm):
    backImage = FileField('backImage',validators=[FileRequired('必须提交背景图'),
                                   FileAllowed(['jpg','png'],'文件格式错误')])
    title = StringField('title',validators=[InputRequired()])
    content = StringField('content',validators=[InputRequired()])
    isShow = StringField('isShow',validators=[InputRequired()])
    submit = SubmitField()

    def __init__(self, *args, **kwargs):
        kwargs['csrf_enabled'] = False
        FlaskForm.__init__(self, *args, **kwargs)

