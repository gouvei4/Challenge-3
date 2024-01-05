import { Router } from 'express';
import DeleteEventDay from '../services/delete.events.service';

class DeleteEventsController  {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.delete('', DeleteEventDay.delete);
    }
}

export default new DeleteEventsController();