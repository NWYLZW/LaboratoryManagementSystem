from flask import Blueprint

workBluePrint = Blueprint(
    'work',
    __name__,
    url_prefix='/work'
)