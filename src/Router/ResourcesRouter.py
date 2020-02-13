from flask import Blueprint

resourcesBluePrint = Blueprint(
    'resources',
    __name__,
    url_prefix='/resources'
)