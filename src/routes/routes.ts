import express from 'express';
import SignUpController from '../controllers/signup.controller';
import SigInController from '../controllers/signin.controller';
import EventsController from '../controllers/events.controller';
import GetEventsController from '../controllers/get.events.controller';
import DeleteEventsController from '../controllers/delete.events.controller';
import GetEventIdController from '../controllers/get.eventsid.controller';
import DeleteEventsIdController from '../controllers/delete.eventsid.controller';

const routes = express.Router();

routes.get('/', function (request, response) {
  response.json({ API: 'Welcome to JWT Authentication' });
});

routes.use('/api/v1/users/sign-up', SignUpController.router);
routes.use('/api/v1/users/sign-in', SigInController.router);
routes.use('/api/v1/users/events', EventsController.router);
routes.use('/api/v1/events', GetEventsController.router);
routes.use('/api/v1/events', DeleteEventsController.router);
routes.use('/api/v1/events', GetEventIdController.router);
routes.use('/api/v1/events', DeleteEventsIdController.router);


export default routes;
