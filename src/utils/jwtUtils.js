import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        // userName: user.userName
    }, JWT_SECRET, { expiresIn: '1h' });
}; 