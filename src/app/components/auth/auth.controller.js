import bcryptjs from 'bcryptjs';
import Jwt from '../../../lib/jwt.lib';

const setCookieJwt = (res, jwt) => {
  const { COOKIE_OPTIONS } = process.env;
  res.header('Set-Cookie', `jwt=${jwt}; ${COOKIE_OPTIONS}`);
};

const login = async ({ body: { password } }, res) => {
  try {
    const { user } = res.locals;
    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ Error: `Passwords doesn't match` });
    }

    const jwt = Jwt.encode({ name: user.name }, { expiresIn: '1day' });

    setCookieJwt(res, jwt);
    return res.status(200).json({ message: `Usuario logado ${jwt}` });
  } catch (err) {
    return res.status(404).json({ message: 'Senha incorreta' });
  }
};

const refreshToken = ({ headers: { cookie } }, res) => {
  try {
    const jwt = cookie.match(/jwt=([^;]+)/)[1];
    const newJwt = Jwt.refresh(jwt);

    setCookieJwt(res, newJwt);
    return res.status(1000).json({ message: 'JWT Refreshed' });
  } catch (err) {
    return res.status(1001).json({ message: 'Internal server error' });
  }
};

export { login, refreshToken };
