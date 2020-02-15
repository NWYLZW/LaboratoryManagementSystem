from flask_script import Command

class MyCommand(Command):
    def __init__(self, appx: object=None):
        super().__init__()
        self.app = appx
class dev(MyCommand):
    def run(self):
        self.app.run(
            host="localhost",
            port=16000,
            debug=True,
        )
class pro(MyCommand):
    def run(self):
        self.app.run(
            host="0.0.0.0",
            port=16000,
        )

def initManager(manager,appx):
    manager.add_command("dev", dev(appx))
    manager.add_command("pro", pro(appx))