// to verify the jsonwebtoken

import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

export default requireAuth;