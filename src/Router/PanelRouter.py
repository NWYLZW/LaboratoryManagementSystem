from flask import Blueprint

panelBluePrint = Blueprint(
    'panel',
    __name__,
    url_prefix='/panel'
)