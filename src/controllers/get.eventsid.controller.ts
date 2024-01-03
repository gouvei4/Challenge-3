import { Router } from 'express';
import GetEventId from '../services/get.eventid.service';

class GetEventIdController  {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/:id', GetEventId.getEventId);
    }
}

export default new GetEventIdController();