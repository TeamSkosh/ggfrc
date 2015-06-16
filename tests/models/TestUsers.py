from .. import GGFRCTestCase

from ggfrc import models

from sqlalchemy.exc import IntegrityError


class UserModelTestCase(GGFRCTestCase):

    def test_get_user_by_email(self):
        test_user = models.User.testing_create()

        user = models.User.get_user_by_email(test_user.email)

        assert user is test_user

    def test_create_user_without_email(self):
        test_user = models.User()

        try:
            models.db.session.add(test_user)
            models.db.session.commit()
        except IntegrityError, e:
            return

        assert False, "Should not be able to create User without email."

    def test_create_user_with_email(self):
        test_user = models.User(email=u'test@test.test')

        models.db.session.add(test_user)
        models.db.session.commit()

        assert test_user.email == 'test@test.test'

