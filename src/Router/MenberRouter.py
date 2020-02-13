from flask import Blueprint

menberBluePrint = Blueprint(
    'menber',
    __name__,
    url_prefix='/menber'
)