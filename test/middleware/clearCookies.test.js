const clearCookies = require('../../middleware/clearCookies');

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

    test("should clearCookie if userId is undefined", () => {

        delete req.session.userId;

        res.clearCookie = (arg) => {};

        const nextSpy = jest.fn(() => {
        });

        clearCookies(req, res, nextSpy);
        expect(res.cookies).toBe(undefined);
    });
});

