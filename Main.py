from src.__init__ import manager

from src.Util.LogUtil import Log
MainLog = Log
MainLog.setIgnoreMinLevel(MainLog.level.ERROR)
MainLog.setIgnoreLevel({
    # MainLog.level.ERROR
    # MainLog.level.WARN
    # MainLog.level.INFO
    # MainLog.level.DEBUG
})

if __name__ == '__main__':
    MainLog.record(MainLog.level.INFO,"manager running")
    manager.run(default_command="dev")
