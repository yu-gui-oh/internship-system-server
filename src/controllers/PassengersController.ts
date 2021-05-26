import { Request, Response } from 'express';
import knex from '../database/connection';

class PassengersController {
    async create (request: Request, response: Response) {
        const {
            name,
            cpf,
            rg,
            issuing_body,
            birth_date,
            cep,
            address,
            number,
            neighbourhood,
            city,
            uf,
            complement,
            phone,
            cell_phone,
            observation,
            status,
        } = request.body;
    
        const passenger = {
            name,
            cpf,
            rg,
            issuing_body,
            birth_date,
            cep,
            address,
            number,
            neighbourhood,
            city,
            uf,
            complement,
            phone,
            cell_phone,
            observation,
            status,
        };

        await knex('passengers').insert(passenger)
    
        return response.json(passenger);
    }


    async index ( request: Request, response: Response ) {
        const passengers = await knex('passengers').select('*').where('status', true);

        const passengersArray = passengers.map( passenger => {
            return {
                id: passenger.id,
                name: passenger.name,
                cpf: passenger.cpf,
                rg: passenger.rg,
                issuing_body: passenger.issuing_body,
                birth_date: passenger.birth_date,
                cep: passenger.cep,
                address: passenger.address,
                number: passenger.number,
                neighbourhood: passenger.neighbourhood,
                city: passenger.city,
                uf: passenger.uf,
                complement: passenger.complement,
                phone: passenger.phone,
                cell_phone: passenger.cell_phone,
                observation: passenger.observation,
                status: passenger.status, 
            }
        });

        return response.json(passengersArray);
    }

    async listIDs ( request: Request, response: Response ) {
        const passengers = await knex('passengers').select('*').where('status', true);

        const passengersArray = passengers.map( passenger => {
            return {
                id: passenger.id,
                name: passenger.name,
            }
        });

        return response.json(passengersArray);
    }

    async show ( request: Request, response: Response ) {
        const { id } = request.params;

        const passengers = await 
            knex('passengers')
            .select('*')
            .where('status', true)
            .andWhere('id', id)
            .first();

        return response.json(passengers);
    }
}

export default PassengersController;