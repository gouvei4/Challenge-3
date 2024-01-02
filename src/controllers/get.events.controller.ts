import { Router } from 'express';
import GetEvents from '../services/get.events.service';

class GetEventsController  {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('', GetEvents.getEvents);
    }
}

export default new GetEventsController();