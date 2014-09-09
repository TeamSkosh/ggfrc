import ggfrc
from unittest import TestCase

class TestAppConfig(TestCase):

    def setUp(self):
        self.app = ggfrc.app.test_client()

    def test_can_use_test_client(self):

        resp = self.app.get("/")
        assert "<title>Greater Grand Forks Robotics Club</title>" in resp.data





