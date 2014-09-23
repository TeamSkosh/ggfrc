from flask.ext.script import Manager
from ggfrc import app

manager = Manager(app)

def command():
    manager.run()
