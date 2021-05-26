import { Request, Response } from 'express';
import knex from '../database/connection';

class VehiclesController {
    async create (request: Request, response: Response) {
        const {
            plate,
            vehicle,
            due_date,
            type,
        } = request.body;
    
        const automobile = {
            plate,
            vehicle,
            due_date,
            type,
        };

        await knex('vehicles').insert(automobile)
    
        return response.json(automobile);
    }

    async index ( request: Request, response: Response ) {
        const vehicles = await knex('vehicles').select('*');

        return response.json(vehicles);
    }

    async listIDs ( request: Request, response: Response ) {
        const vehicles = await knex('vehicles').select('*');

        const vehiclesArray = vehicles.map( vehicle => {
            return {
                id: vehicle.id,
                vehicle: vehicle.vehicle,
            }
        });

        return response.json(vehiclesArray);
    }

    async show ( request: Request, response: Response ) {
        const { id } = request.params;

        const vehicles = await 
            knex('vehicles')
            .select('*')
            .where('id', id)
            .first();

        return response.json(vehicles);
    }
}

export default VehiclesController;