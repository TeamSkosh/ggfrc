from ggfrc import app
from flask import render_template, request, session, g

import requests

@app.before_request
def get_current_user():
    g.user = None
    email = session.get('email')
    if email is not None:
        g.user = email


@app.context_processor
def inject_ini_config():
    return dict(iniconfig=app.iniconfig)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/fll/registration", methods=('GET', 'POST'))
def fll_registration():
    return render_template("fll/registration.html")


@app.route('/_auth/login', methods=['GET', 'POST'])
def login_handler():

    resp = requests.post(app.iniconfig.get('persona', 'PERSONA_VERIFIER'), data={
        'assertion': request.form['assertion'],
        'audience': request.host_url,
    }, verify=True)

    if resp.ok:
        verification_data = resp.json()
        if verification_data['status'] == 'okay':
            session['email'] = verification_data['email']
            return 'OK'

    abort(400)


@app.route('/_auth/logout', methods=['POST'])
def logout_handler():
    session.clear()
    return 'OK'
