import jwt, { decode } from 'jsonwebtoken';

export const authenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "No token provided." });
    }
    const token = authHeader.split(' ')[1];
    const SECRET_KEY = process.env.JWT_SECRET || 'secret';

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // Nếu token sai hoặc hết hạn, báo lỗi 401
            return res.status(401).json({ error: "Invalid or expired token." });
        }
    
    req.user = decoded;
    next();
    });
};