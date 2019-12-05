import { config } from 'dotenv';
import mongoose from 'mongoose';

export default () => {
  config();
  const { MONGO_URI } = process.env;

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.warn(`Connected to MongoDB at ${MONGO_URI}`))
    .catch(err => {
      console.warn('Erro ao conectar com o banco > ', err);
      process.exit();
    });
};
