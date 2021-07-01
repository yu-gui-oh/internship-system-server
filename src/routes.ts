import express from 'express';

import UsersController from './controllers/UsersController';
import VehiclesController from './controllers/VehiclesController';
import PassengersController from './controllers/PassengersController';
import DriversController from './controllers/DriversController';
import DestinationsController from './controllers/DestinationsController';
import TravelsController from './controllers/TravelsController';
import CompanyController from './controllers/CompanyController';
import TravelPassengersController from './controllers/TravelPassengersController';

const routes = express.Router();

const usersController = new UsersController();
const vehiclesController = new VehiclesController();
const passengersController = new PassengersController();
const driversController = new DriversController();
const destinationsController = new DestinationsController();
const travelsController = new TravelsController();
const companyController = new CompanyController();
const travelPassengersController = new TravelPassengersController();

routes.post('/create/users', usersController.create);
routes.post('/create/vehicles', vehiclesController.create);
routes.post('/create/passengers', passengersController.create);
routes.post('/create/drivers', driversController.create);
routes.post('/create/destinations', destinationsController.create);
routes.post('/create/travels', travelsController.create);

routes.get('/company/details', companyController.index);
routes.post('/edit/company', companyController.update);

routes.get('/destinations/:id', destinationsController.show);
routes.get('/destinations', destinationsController.index);

routes.get('/list/passengers', passengersController.index);
routes.get('/passengers/agendamento/:passengerSearchParam', passengersController.listIDs);
routes.get('/passengers/:id', passengersController.show);

routes.get('/list/vehicles', vehiclesController.index);
routes.get('/vehicles', vehiclesController.listIDs);
routes.get('/vehicles/:id', vehiclesController.show);

routes.get('/list/drivers', driversController.index);
routes.get('/drivers', driversController.listIDs);
routes.get('/drivers/:id', driversController.show);

routes.get('/list/travels', travelsController.listIDs);
routes.get('/travels/active', travelsController.listActive);
routes.get('/travels/:id', travelsController.show);

routes.post('/edit/passenger/:id', passengersController.update);
routes.post('/edit/driver/:id', driversController.update);
routes.post('/edit/vehicle/:id', vehiclesController.update);
routes.post('/edit/travel/:id', travelsController.update);

routes.get('/travels/search/:searchParam', travelsController.listSearch);
routes.get('/drivers/search/:searchParam', driversController.listSearch);
routes.get('/passengers/search/:searchParam', passengersController.listSearch);
routes.get('/vehicles/search/:searchParam', vehiclesController.listSearch);

routes.post('/new/travel/passengers', travelPassengersController.insertPassengers);
routes.get('/list/travel/passengers/:id', travelPassengersController.getTravelPassengers);
routes.post('/delete/travel/passengers', travelPassengersController.deleteTravelPassenger);

export default routes;