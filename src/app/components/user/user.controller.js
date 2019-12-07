import User from './user.model';
import jwt from '../../../lib/jwt.lib';
import sendGrid from '../../../lib/sendgrid.lib';

const save = async (req, res) => {
  try {
    const emailToSend = req.body.email;

    const activateToken = jwt.encode({ emailToSend }, { expiresIn: '1h' });
    const { email } = await User.create({
      ...req.body,
      activateToken: activateToken,
    });
    const response = await sendGrid.sendEmail(email, activateToken);

    return res
      .status(201)
      .json({ email: email, token: activateToken, message: response });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const reSendConfirmation = async ({ body }, res) => {
  try {
    const { email } = body;
    const { activateToken } = await User.findOne({ email: email });

    const token = jwt.refresh(activateToken, { expiresIn: '24h' });

    User.updateOne({ email: email }, { $set: { activateToken: token } });

    const response = await sendGrid.sendEmail(email, token);

    return res
      .status(201)
      .json({ email: email, token: token, message: response });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const confirm = async (req, res) => {
  try {
    let token = req.url.split('/')[3];
    const { email } = (await User.findOne({ activateToken: token })) || {};

    if (email === undefined)
      return res.status(404).json({ error: 'email not found' });
    User.updateOne(
      { email: email },
      { $set: { emailConfirmed: true } },
      (e, dt) => {
        if (e) console.log('erro ', e);
        console.log(dt);
      },
    );
    res.status(200).json({ confirmed: 'Email Confirmado com sucesso' });
  } catch (err) {
    console.log('error', err);
  }
};

export { save, confirm, reSendConfirmation };
