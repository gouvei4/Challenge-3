import { Router } from 'express';
import EventService from '../services/create.events.service';

class EventsController  {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('', EventService.create);
    }
}

export default new EventsController();