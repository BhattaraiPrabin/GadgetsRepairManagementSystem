const jwt = require("jsonwebtoken");
const Staff = require("../models/staff.js");
const User = require("../models/user.js");
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
};
const tokenExtractor = (request, response, next) => {
    console.log("Hello");
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
        return next();
    }
    request.token = null;
    return response.status(401).json({ error: "Token Missing" });
};

const staffExtractor = async(request, response, next) => {
    try {
        if (request.token) {
            const decodedToken = jwt.verify(request.token, process.env.SECRET);
            if (!decodedToken.id) {
                return res.status(401).json({ error: "token invalid" });
            }

            request.staff = await Staff.findById(decodedToken.id);
            console.log(request.staff);
            return next();
        }
        request.staff = null;
        return next();
    } catch (error) {
        next(error);
    }
};

const userExtractor = async(request, response, next) => {
    try {
        if (request.token) {
            const decodedToken = jwt.verify(request.token, process.env.SECRET);
            if (!decodedToken.id) {
                return res.status(401).json({ error: "token invalid" });
            }

            request.user = await User.findById(decodedToken.id);
            console.log(request.user);
            return next();
        }
        request.user = null;
        return next();
    } catch (error) {
        next(error);
    }
};

const errorHandler = (error, request, response, next) => {
    console.log("---------");

    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message });
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired",
        });
    } else if (error.name === "TypeError") {
        return response.status(401).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    staffExtractor,
    userExtractor,
};