import express from 'express';

import UsersController from './controllers/UsersController';
import VehiclesController from './controllers/VehiclesController';
import PassengersController from './controllers/PassengersController';
import DriversController from './controllers/DriversController';
import DestinationsController from './controllers/DestinationsController';
import TravelsController from './controllers/TravelsController';
import CompanyController from './controllers/CompanyController';

const routes = express.Router();

const usersController = new UsersController();
const vehiclesController = new VehiclesController();
const passengersController = new PassengersController();
const driversController = new DriversController();
const destinationsController = new DestinationsController();
const travelsController = new TravelsController();
const companyController = new CompanyController();

routes.post('/create/users', usersController.create);
routes.post('/create/vehicles', vehiclesController.create);
routes.post('/create/passengers', passengersController.create);
routes.post('/create/drivers', driversController.create);
routes.post('/create/destinations', destinationsController.create);
routes.post('/create/travels', travelsController.create);

routes.get('/list/passengers', passengersController.index);
routes.get('/company/details', companyController.index);
export default routes;