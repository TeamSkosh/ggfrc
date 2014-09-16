from flask import current_app, Blueprint, session, g, request
from ggfrc import models
import requests

bp = Blueprint('persona', __name__, url_prefix="/_auth")

@bp.before_app_request
def get_current_user():
    g.user = None
    email = session.get('email')
    if email is not None:
        g.user = email

@bp.route('/login', methods=['GET', 'POST'])
def login():

    resp = requests.post(current_app.iniconfig.get('persona', 'PERSONA_VERIFIER'), data={
        'assertion': request.form['assertion'],
        'audience': request.host_url,
    }, verify=True)

    if resp.ok:
        verification_data = resp.json()

        if verification_data['status'] == 'okay':
            email = verification_data['email']

            if not models.User.get_user(email):
                pass
            else:
                session['email'] = email

            return 'OK'

    abort(400)


@bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return 'OK'
