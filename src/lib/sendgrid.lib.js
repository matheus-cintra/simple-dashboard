import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, API_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

function sendEmail(email, token) {
  const message = {
    to: email,
    from: 'cintra-dash@dashteam.com',
    subject: 'Confirmation Email',
    html: `<h2>Olá, seja bem vindo ao Cintra Dash, seu dashboard financeiro. \n
    Para finalizar seu cadastro, clique no link abaixo. \n
    <a href="${API_EMAIL}/user/confirmation/${token}">Confirmação Email</a></h2>`,
  };
  return sgMail.send(message);
}

export default { sendEmail };
