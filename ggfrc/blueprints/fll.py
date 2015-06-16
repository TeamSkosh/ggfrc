from flask import  Blueprint, session, g, request, render_template

bp = Blueprint('fll', __name__, url_prefix="/fll")


@bp.route("/")
def index():
    return render_template("fll/index.html.j2")


@bp.route("/signup")
def signup():
    return render_template("fll/registration.html.j2")

