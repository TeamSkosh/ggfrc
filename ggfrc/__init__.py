from flask import Flask, render_template

app = Flask('ggfrc')

from ggfrc import views
