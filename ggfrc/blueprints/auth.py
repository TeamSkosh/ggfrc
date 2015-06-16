from flask import current_app, Blueprint, session, g, request
from ggfrc import models, db
import requests

bp = Blueprint('persona', __name__, url_prefix="/_auth")

@bp.before_app_request
def get_current_user():
    g.user = None
    email = session.get('email')

    if email is not None:
        user = models.User.get_user_by_email(email)
        g.user = email

@bp.route('/login', methods=['GET', 'POST'])
def login():

    resp = _verify_user(request.form['assertion'], request.host_url)

    if not resp or resp.ok:
        verification_data = resp.json()

        if verification_data['status'] == 'okay':
            email = verification_data['email']

            # This user has never logged in before
            if not models.User.get_user_by_email(email):
                user = models.User(email=email)
                db.session.add(user)
                saved = db.session.commit()

                if not saved:
                    return "USER NOT CREATED", 500
            else:
                session['email'] = email

            return 'OK'

    abort(400)


def _verify_user(assertion, audience):

    if not assertion and not audience:
        raise RuntimeError("Cannot assert nothing")

    return requests.post(current_app.iniconfig.get('persona', 'PERSONA_VERIFIER'), data={
        'assertion': assertion,
        'audience': audience
    }, verify=True)

@bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return 'OK'
