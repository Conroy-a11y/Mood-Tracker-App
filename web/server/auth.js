import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 days


export function createToken(user) {
return jwt.sign({ id: user.id, username: user.username, is_pro: user.is_pro }, process.env.JWT_SECRET, { expiresIn: TOKEN_TTL });
}


export function setAuthCookie(res, token) {
res.cookie(process.env.JWT_COOKIE_NAME, token, {
httpOnly: true,
sameSite: 'lax',
secure: process.env.JWT_COOKIE_SECURE === 'true',
maxAge: TOKEN_TTL * 1000
});
}


export function authMiddleware(req, res, next) {
const token = req.cookies[process.env.JWT_COOKIE_NAME];
if (!token) return res.status(401).json({ error: 'Not authenticated' });
try {
req.user = jwt.verify(token, process.env.JWT_SECRET);
next();
} catch {
return res.status(401).json({ error: 'Invalid token' });
}
}


export async function hashPassword(password) {
const saltRounds = 12;
return bcrypt.hash(password, saltRounds);
}


export async function verifyPassword(password, hash) {
return bcrypt.compare(password, hash);
}