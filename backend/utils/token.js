import jwt from 'jsonwebtoken'
const generateToken = (id, userName, email, tableName = []) => {
    return jwt.sign({ id, userName, email, tableName }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken;
