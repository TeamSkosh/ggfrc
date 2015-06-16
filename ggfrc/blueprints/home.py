from flask import Blueprint, render_template, current_app
import requests

bp = Blueprint('home', __name__, url_prefix='')

@bp.app_context_processor
def inject_ini_config():
    return dict(iniconfig=current_app.iniconfig)

@bp.route("/")
def home():
    return render_template("home.html")


