import { Request, Response } from 'express';
import knex from '../database/connection';

class CompanyController {
    async index ( request: Request, response: Response ) {
        const company = await knex('company').select('*');

        return response.json(company);
    }

    async update (request: Request, response: Response ) {
        const newCompany = await knex('company')
                                    .update(request.body)
                                    .where('id', 1);

        return response.json(newCompany);
    }
}

export default CompanyController;