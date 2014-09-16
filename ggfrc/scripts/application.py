from flask.ext.script import Manager
from ggfrc import create_app

app = create_app()

manager = Manager(app)

def command():
    manager.run()
