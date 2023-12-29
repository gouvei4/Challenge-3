import express from 'express';
import SignUpController from '../controllers/signUpControllers';

const routes = express.Router();

routes.get('/', function (request, response) {
    response.json({ API: 'Welcome to JWT Authentication' });
  });

routes.use('/users/sign-up', SignUpController.router);

export default routes;