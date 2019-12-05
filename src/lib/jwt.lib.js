import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const { ALGORITHM, SECRET_KEY } = process.env;

const sign = (data, jwtOptions = {}) => {
  const token = jwt.sign(data, SECRET_KEY, {
    ...jwtOptions
  });
  return token;
};

const encode = (data, options = {}) => {
  console.warn('ENTROU NO ENCODE > ', data, options);
  const token = sign(data, options);

  return token;
};

const decode = token => {
  const data = jwt.decode(token, SECRET_KEY, { algorithm: [ALGORITHM] });

  return data;
};

const refresh = (token, options) => {
  const data = decode(token);

  delete data.iat, delete data.exp;

  return encode(data, options);
};

export default { encode, decode, refresh };
