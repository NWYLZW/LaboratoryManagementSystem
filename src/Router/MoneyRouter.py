from flask import Blueprint

moneyBluePrint = Blueprint(
    'money',
    __name__,
    url_prefix='/money'
)