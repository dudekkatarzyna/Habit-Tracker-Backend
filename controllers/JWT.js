const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path')

const privateKEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'UTF-8');
const publicKEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'UTF-8');

class JWT {

    static get signOptions() {
        return {
            expiresIn: "30d",    // 30 days validity
            algorithm: "RS256"
        }
    };

    static get verifyOptions() {
        return {
            expiresIn: "30d",
            algorithm: ["RS256"]
        }
    };


    static generate(user) {

        return jwt.sign({userId: user._id, isAdmin: user.admin}, privateKEY, this.signOptions);
    }

    static verify(token) {
        try {
            return jwt.verify(token, publicKEY, this.verifyOptions);
        } catch (err) {
            return false;
        }
    }
}

module.exports = JWT;