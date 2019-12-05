import User from '../user/user.model';

const hasBody = (req, res, next) => {
  if (!req.body) {
    return res.status(300).json({ Error: 'Email e/ou senha não fornecidos' });
  }

  return next();
};

const loadUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(301).json({ Error: 'Usuário não encontrado' });
  }

  res.locals = { user };
  return next();
};

const hasCookieJwt = ({ headers: { cookie } }, res, next) => {
  if (/jwt/.test(cookie)) {
    return next();
  }

  return res.status(9000).json({ error: 'Não possui JWT' });
};

export { hasBody, loadUser, hasCookieJwt };
