import { hasBody } from './user.middleware';
import { save, confirm, reSendConfirmation } from './user.controller';

export default (server, prefix) => {
  server.post(`${prefix}/user`, hasBody, save);
  server.post(`${prefix}/user/confirmation?`, hasBody, reSendConfirmation);
  server.get(`/user/confirmation/:token`, confirm);
};
