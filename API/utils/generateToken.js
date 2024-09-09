import jwt from 'jsonwebtoken';

// Create token
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  };

  export default createToken;