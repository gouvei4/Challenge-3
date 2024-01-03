import { Router } from 'express';
import DeleteEventId from '../services/delete.eventid.service';

class DeleteEventsIdController  {
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.delete('/:id', DeleteEventId.deleteEventId);
    }
}

export default new DeleteEventsIdController();