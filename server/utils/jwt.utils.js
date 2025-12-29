const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyJWTToken = (token ,type = "access") => {
    try {
        if (type = "access") {
            return jwt.verify(token, ACCESS_TOKEN_SECRET);
        }else if (type = "refresh"){
            return jwt.verify(token, REFRESH_TOKEN_SECRET);
        }else{
            return null
        }
        
    } catch (error) {
        return null;
    }
};

module.exports = { generateAccessToken,generateRefreshToken, verifyJWTToken };