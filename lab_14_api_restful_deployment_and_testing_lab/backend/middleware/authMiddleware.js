const jwt = require("jsonwebtoken");

module.exports = (requiredRole) => {
    return (req, res, next) => {
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Handle Bearer token prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Enforce role-based access if specified (e.g. "admin")
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: `Access denied: requires ${requiredRole} role` });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token is not valid" });
        }
    };
};
