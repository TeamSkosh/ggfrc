from flask import Flask, render_template
from flask_ini import FlaskIni

app = Flask('ggfrc')

with app.app_context():
    app.iniconfig = FlaskIni()
    app.iniconfig.read('local.config')

from ggfrc import views
