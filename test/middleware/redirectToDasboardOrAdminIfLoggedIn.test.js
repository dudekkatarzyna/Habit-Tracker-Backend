const redirectToDashboardOrAdminIfLoggedIn = require('../../middleware/redirectToDashboardOrAdminIfLoggedIn');

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

    test("should call next() if req doesn't contain user_sid", () => {

        delete req.cookies.user_sid;

        const nextSpy = jest.fn(() => {
        });

        redirectToDashboardOrAdminIfLoggedIn(req, res, nextSpy);
        expect(nextSpy).toBeCalled();
    });

    test("should call next() if req doesn't contain userId", () => {

        delete req.session.userId;

        const nextSpy = jest.fn(() => {
        });

        redirectToDashboardOrAdminIfLoggedIn(req, res, nextSpy);
        expect(nextSpy).toBeCalled();
    });


    test("should redirect to admin if isAdmin flag is set", () => {

        req.session.isAdmin = true;

        res.redirect = (arg) => {};
        const redirectSpy = jest.spyOn(res, 'redirect');

        redirectToDashboardOrAdminIfLoggedIn(req, res, next);
        expect(redirectSpy).toBeCalledWith('/admin');
    });

    test("should redirect to dasboard if isAdmin flag is not set", () => {

        req.session.isAdmin = false;

        res.redirect = (arg) => {};
        const redirectSpy = jest.spyOn(res, 'redirect');

        redirectToDashboardOrAdminIfLoggedIn(req, res, next);
        expect(redirectSpy).toBeCalledWith('/dashboard');
    });
});
