import User from './user.model';
import jwt from '../../../lib/jwt.lib';

const save = async ({ body }, res) => {
  try {
    const { email } = await User.create(body);
    console.log('EMAIL > ', email);
    const token = jwt.encode({ email }, { expiresIn: '1h' });
    return res.status(200).json({ email: email, token: token });
  } catch (err) {
    return res.status(202).json({ error: err });
  }
};

export { save };
