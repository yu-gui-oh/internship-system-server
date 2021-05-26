import { Request, Response } from 'express';
import knex from '../database/connection';

class DestinationsController {
    async create (request: Request, response: Response) {
        const {
            destination,
        } = request.body;
    
        await knex('destinations').insert({
            destination,
        })
    
        return response.json(destination);
    }

    async index ( request: Request, response: Response ) {
        const destinations = await knex('destinations').select('*');

        return response.json(destinations);
    }

    async show ( request: Request, response: Response ) {
        const { id } = request.params;

        const destinations = await 
            knex('destinations')
            .select('destination')
            .where('id', id)
            .first();

        return response.json(destinations);
    }
}

export default DestinationsController;