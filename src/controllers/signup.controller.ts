import { Router } from 'express';
import SignUpService from '../services/signup.service';

class SignUpController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('', SignUpService.signUp);
  }
}

export default new SignUpController();