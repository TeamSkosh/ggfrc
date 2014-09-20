from .. import GGFRCTestCase


class FLLBPTestCase(GGFRCTestCase):

    def test_can_get_landing_page(self):
        resp = self.client.get("/fll/")

        self.assertEqual(resp.status_code, 200)


    def test_can_get_signup_page(self):
        resp = self.client.get("/fll/signup")

        self.assertEqual(resp.status_code, 200)
