import { Router } from 'express';
import SignInService from '../services/signin.service';

class SigInController {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('', SignInService.signin);
    }
}

export default new SigInController();