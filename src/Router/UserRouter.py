from flask import Blueprint

userBluePrint = Blueprint(
    'user',
    __name__,
    url_prefix='/user'
)