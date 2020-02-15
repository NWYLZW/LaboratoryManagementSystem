from src import manager,MainLog

if __name__ == '__main__':
    MainLog.record(MainLog.level.INFO,"manager running")
    manager.run(default_command="dev")
