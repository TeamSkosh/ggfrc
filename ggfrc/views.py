from ggfrc import app
from flask import render_template


@app.route("/")
def home():
    return render_template("home.html")

@app.route("/fll/registration", methods=('GET', 'POST'))
def fll_registration():
    return render_template("fll/registration.html")
