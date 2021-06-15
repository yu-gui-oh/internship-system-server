import { Request, Response } from 'express';
import knex from '../database/connection';

class DriversController {
    async create (request: Request, response: Response) {
        const {
            name,
            cpf,
            cnh,
            cel_phone,
        } = request.body;
    
        const driver = {
            name,
            cpf,
            cnh,
            cel_phone,
        };

        await knex('drivers').insert(driver)
    
        return response.json(driver);
    }

    async index ( request: Request, response: Response ) {
        const drivers = await knex('drivers').select('*');

        return response.json(drivers);
    }

    async listIDs ( request: Request, response: Response ) {
        const drivers = await knex('drivers').select('*');

        const driversArray = drivers.map( driver => {
            return {
                id: driver.id,
                name: driver.name,
            }
        });

        return response.json(driversArray);
    }

    async show ( request: Request, response: Response ) {
        const { id } = request.params;

        const drivers = await 
            knex('drivers')
            .select('*')
            .where('id', id)
            .first();

        return response.json(drivers);
    }

    async update (request: Request, response: Response ) {
        const { id } = request.params;

        const newDriver = await knex('drivers')
                                    .update(request.body)
                                    .where('id', id);

        return response.json(newDriver);
    }
}

export default DriversController;