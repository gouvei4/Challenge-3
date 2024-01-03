import express from 'express';
import SignUpController from '../controllers/signup.controller';
import SigInController from '../controllers/signin.controller';
import EventsController from '../controllers/events.controller';
import GetEventsController from '../controllers/get.events.controller';
import DeleteEventsController from '../controllers/delete.events.controller';
const routes = express.Router();

routes.get('/', function (request, response) {
    response.json({ API: 'Welcome to JWT Authentication' });
  });

routes.use('/users/sign-up', SignUpController.router);
routes.use('/users/sign-in', SigInController.router);
routes.use('/users/events', EventsController.router);
routes.use('/events', GetEventsController.router);
routes.use('/events', DeleteEventsController.router);



export default routes;