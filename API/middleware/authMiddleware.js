// to verify the jsonwebtoken

import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){return res.status(401).json({success: false, message: 'Authorisation token required'})}

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Invalid or exxpired token'})
    }
}

export default requireAuth;