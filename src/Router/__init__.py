from src.Router.AdminRouter import adminBluePrint
from src.Router.CaptalRouter import captalBluePrint
from src.Router.MainRouter import mainBluePrint
from src.Router.MarkRouter import markBluePrint
from src.Router.MenberRouter import menberBluePrint
from src.Router.MessageRouter import messageBluePrint
from src.Router.MyRouter import myBluePrint
from src.Router.NoticeRouter import noticeBluePrint
from src.Router.PanelRouter import panelBluePrint
from src.Router.ResourcesRouter import resourcesBluePrint
from src.Router.UserRouter import userBluePrint
from src.Router.WorkRouter import workBluePrint

bluePrints = [
    menberBluePrint,
    captalBluePrint,
    resourcesBluePrint,
    workBluePrint,
    panelBluePrint,
    userBluePrint,
    mainBluePrint,
    myBluePrint,
    markBluePrint,
    noticeBluePrint,
    adminBluePrint,
    messageBluePrint,
]