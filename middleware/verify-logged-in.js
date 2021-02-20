const jwt = require("jsonwebtoken");

// Header: 
// authorization: "Bearer the-token"
function verifyLoggedIn(request, response, next) {

    // If there is no authorization header: 
    if (!request.headers.authorization) {
        response.status(401).send("You are not logged-in!");
        return;
    }

    // Take the token: 
    const token = request.headers.authorization.split(" ")[1];

    // If no value in the token: 
    if (!token) {
        response.status(401).send("You are not logged-in!");
        return;
    }

    // Verify the token: 
    jwt.verify(token, "RandomKey", (err, payload) => { // payload.user

        if (err && err.message === "jwt expired") {
            response.status(403).send("Your login session has expired. Please login again.");
            return;
        }

        if (err) {
            response.status(401).send("You are not logged-in!");
            return;
        }

        // For refresh token - generate new token here...

        next();
    });
}

module.exports = verifyLoggedIn;