from .. import GGFRCTestCase
from ggfrc.blueprints import auth


class AuthBPTestCase(GGFRCTestCase):

    def test_get_login_route_without_data(self):
        resp = self.client.get("/_auth/login")
        self.assertEqual(resp.status_code, 400)


    def test_get_logout_page(self):
        resp = self.client.get("/_auth/logout")
        self.assertEqual(resp.status_code, 405)


    def test_post_logout_page(self):
        resp = self.client.post("/_auth/logout")
        self.assertEqual(resp.status_code, 200)


    def test_verify_user_returns_false_with_blank_values(self):
        try:
            ret = auth._verify_user("", "")
        except RuntimeError, e:
            return

        assert False, "Expected runtime error"



