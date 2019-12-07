import { config } from 'dotenv';
import superagent from 'superagent';

config();
const { HOST, PORT, API_EMAIL } = process.env;

async function sendEmailConfirmation(email, token) {
  const url = `${API_EMAIL}/api/user`;
  const contentLink = `${HOST}:${PORT}/api/user`;
  const link = `${contentLink}/${token}`;
  const res = await superagent.post(url).send({
    email,
    contentLink,
    link,
  });

  return res;
}

export { sendEmailConfirmation };
