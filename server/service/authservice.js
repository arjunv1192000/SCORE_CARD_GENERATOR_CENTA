import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/key.js';

const authservice = {
  comparePassword: async (password, hashPassword) => await bcrypt.compare(password, hashPassword),
  generateAccessToken: (admin) => jwt.sign({ admin }, config.ACESS_TOKEN_SCERET, { expiresIn: '20m' }),
  verifyAccessToken: (token) => jwt.verify(token, config.ACESS_TOKEN_SCERET),
};

export default authservice;
    