from ggfrc.core import db

from flask import current_app
from datetime import datetime



class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.UnicodeText, unique=True, nullable=False)
    first_name = db.Column(db.Unicode(40))
    last_name = db.Column(db.Unicode(40))
    date_registered = db.Column(db.DateTime)

    @classmethod
    def testing_create(cls, **kwargs):
        defaults = {
                'email': u'test@test.test',
                'first_name': u'First',
                'last_name': u'Last',
                'date_registered': datetime.now()
        }

        values = dict()
        kw_keys = kwargs.keys()

        for k in defaults.keys():
            if k in kw_keys:
                values[k] = kw_keys[k]
            values[k] = defaults[k]

        u = User(**values)

        db.session.add(u)
        db.session.commit()
        return u

    @classmethod
    def get_user(cls, email):
        return User.query.filter_by(email=email).first()

