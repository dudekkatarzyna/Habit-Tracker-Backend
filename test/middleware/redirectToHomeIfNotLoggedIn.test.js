const redirectToHomeIfNotLoggedIn = require('../../middleware/redirectToHomeIfNotLoggedIn');

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

    test("should call next() if req contains userId and user_sid", () => {

        const nextSpy = jest.fn(() => {
        });

        redirectToHomeIfNotLoggedIn(req, res, nextSpy);
        expect(nextSpy).toBeCalled();
    });
    test("should call / if req doesn't contain userId", () => {

        delete req.session.userId;

        res.redirect = (arg) => {};

        const redirectSpy = jest.spyOn(res, 'redirect');

        redirectToHomeIfNotLoggedIn(req, res, next);
        expect(redirectSpy).toBeCalledWith('/');
    });
    test("should call / if req doesn't contain user_sid", () => {

        delete req.cookies.user_sid;

        res.redirect = (arg) => {};

        const redirectSpy = jest.spyOn(res, 'redirect');

        redirectToHomeIfNotLoggedIn(req, res, next);
        expect(redirectSpy).toBeCalledWith('/');
    });
});
