const redirectToHomeIfNotLoggedInAsAdmin = require('../../middleware/redirectToHomeIfNotLoggedInAsAdmin');


let req, res, next;
describe("middleware redirect to home if not logged in", () => {

    beforeEach(() => {
        req = {
            session: {
                userId: "1"
            },
            cookies: {
                user_sid: "0"
            }
        };
        res = {};
        next = () => {
        };
    });

    test("should call next() if isAdmin flag is set", () => {

        req.session.isAdmin = true;
        const nextSpy = jest.fn(() => {
        });

        redirectToHomeIfNotLoggedInAsAdmin(req, res, nextSpy);
        expect(nextSpy).toBeCalled();
    });

    test("should redirect to dasboard if isAdmin flag is not set", () => {

        req.session.isAdmin = false;

        res.redirect = (arg) => {
        };
        const redirectSpy = jest.spyOn(res, 'redirect');

        redirectToHomeIfNotLoggedInAsAdmin(req, res, next);
        expect(redirectSpy).toBeCalledWith('/dashboard');
    });
});

