from flask import Flask, render_template
from flask_ini import FlaskIni

from ggfrc.core import db

def create_app(config=None):
    app = Flask('ggfrc')

    with app.app_context():
        app.iniconfig = FlaskIni()

        if config is None:
            app.iniconfig.read('local.config')
        else:
            app.iniconfig.read(config)

    db.init_app(app)

    from ggfrc.blueprints.auth import bp as auth
    from ggfrc.blueprints.home import bp as home
    from ggfrc.blueprints.fll import bp as fll
    app.register_blueprint(auth)
    app.register_blueprint(home)
    app.register_blueprint(fll)

    return app

