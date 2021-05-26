import { Request, Response } from 'express';
import knex from '../database/connection';

class CompanyController {
    async index ( request: Request, response: Response ) {
        const company = await knex('company').select('*');

        return response.json(company);
    }
}

export default CompanyController;