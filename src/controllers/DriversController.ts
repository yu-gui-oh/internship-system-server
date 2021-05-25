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
}

export default DriversController;