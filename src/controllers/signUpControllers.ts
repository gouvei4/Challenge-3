import { Router } from 'express';
import signUpServices from '../services/signUpServices';

class SignUpController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('', signUpServices.signUp);
  }
}

export default new SignUpController();