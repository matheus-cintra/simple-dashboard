import Joi from '@hapi/joi';
import User from './user.model';

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

const schemaResend = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

const userAlreadyExists = user => !!user.length;

const hasBody = async (req, res, next) => {
  try {
    if (req.query.resend === 'true') {
      schemaResend.validate(req.body.email);
    } else {
      console.log('Entrou aqui também');
      schema.validate(req.body, { abortEarly: false });
      const user = await User.find({ email: req.body.email });

      if (userAlreadyExists(user)) {
        return res.status(500).json({ error: 'Usuario já cadastrado' });
      }
    }

    return next();
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

export { hasBody };
