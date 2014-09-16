from unittest import TestCase

from ggfrc import create_app
from ggfrc.core import db

class GGFRCTestCase(TestCase):

    def setUp(self):
        self.app = create_app('testing.config')
        self.client = self.app.test_client()

        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

    def tearDown(self):
        db.drop_all()
        self.app_context.pop()

