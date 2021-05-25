import { Request, Response } from 'express';
import knex from '../database/connection';

class UsersController {
    async create (request: Request, response: Response) {
        const {
            name,
            password,
        } = request.body;
    
        const user = {
            name, 
            password,
        };

        await knex('users').insert(user)
    
        return response.json(user);
    }
}

export default UsersController;